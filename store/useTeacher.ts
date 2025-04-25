import { create } from "zustand";
import client from "@/lib/client";
import { Teacher } from "@/types/user";
import { TeacherInput } from "@/types/teacher";
import { GET_TEACHER, GET_TEACHERS } from "@/graphql/queries/queries";
import { errorHandler } from "@/utils/error";
import {
  ADD_TEACHER,
  DELETE_TEACHER,
  UPDATE_TEACHER,
} from "@/graphql/mutations/teacher";
import { toast } from "react-toastify";

interface TeacherStore {
  teachers: Teacher[];
  teacher: Teacher | null;
  loading: boolean;
  teacherLoading: boolean;
  addTeacherLoading: boolean;
  deleteTeacherLoading: boolean;
  updateTeacherLoading: boolean;
  initialized: boolean;
  error: string | null;
  setTeacher: (teacher: Teacher) => void;
  fetchTeachers: () => Promise<void>;
  fetchTeacher: (id: string) => Promise<void>;
  addTeacher: (formData: TeacherInput) => Promise<string | null>;
  updateTeacher: (id: string, input: Partial<Teacher>) => Promise<boolean>;
  deleteTeacher: (id: string) => Promise<boolean>;
}

export const useTeacherStore = create<TeacherStore>((set, get) => ({
  teachers: [],
  teacher: null,
  loading: false,
  teacherLoading: false,
  addTeacherLoading: false,
  deleteTeacherLoading: false,
  updateTeacherLoading: false,
  initialized: false,
  error: null,

  setTeacher: (teacher: Teacher) => {
    set({ teacher });
  },

  fetchTeachers: async () => {
    set({ loading: true, error: null });
    try {
      client.cache.evict({ fieldName: "getTeachers" });
      client.cache.gc();

      const response = await client.query({
        query: GET_TEACHERS,
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        console.error("GraphQL Errors:", response.errors);
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      const teachersList = response.data?.getTeachers || [];

      if (!teachersList) {
        console.warn("No teachers found.");
        set({ teachers: [] });
        return;
      }

      set({ teachers: teachersList, initialized: true });
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to fetch teachers");
      console.error("Error in fetchTeachers:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false, initialized: true });
    }
  },

  fetchTeacher: async (id: string) => {
    set({ teacherLoading: true, error: null });
    try {
      const { data } = await client.query({
        query: GET_TEACHER,
        variables: { id },
        fetchPolicy: "network-only",
      });

      const fetchedTeacher = data?.getTeacher;

      set((state) => ({
        teacher: fetchedTeacher,
        teachers: state.teachers.some((t) => t.id === id)
          ? state.teachers.map((t) => (t.id === id ? fetchedTeacher : t))
          : [...state.teachers, fetchedTeacher],
      }));
      client.cache.evict({ fieldName: "getTeachers" });
      client.cache.gc();
    } catch (error) {
      console.error("Error in fetchTeacher:", error);
      set({
        error: (error as Error).message || "Failed to fetch teacher",
        teacher: null,
      });
    } finally {
      set({ teacherLoading: false, initialized: true });
    }
  },

  updateTeacher: async (id: string, input: Partial<Teacher>) => {
    set({ updateTeacherLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_TEACHER,
        variables: { id, input },
        refetchQueries: ["GetTeacher"],
      });

      if (data?.updateTeacher) {
        const updatedTeacher = data.updateTeacher;

        set((state) => ({
          teachers: state.teachers.map((teacher) =>
            teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
          ),
          teacher:
            state.teacher?.id === id
              ? { ...state.teacher, ...updatedTeacher }
              : state.teacher,
        }));
      }
      client.cache.evict({ fieldName: "getTeachers" });
      client.cache.gc();
      return true;
    } catch (error) {
      console.error("Error in updateTeacher:", error);
      set({ error: (error as Error).message || "Failed to update teacher" });
      return false;
    } finally {
      set({ updateTeacherLoading: false });
    }
  },

  addTeacher: async (formData: TeacherInput) => {
    set({ addTeacherLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: ADD_TEACHER,
        variables: { input: formData },
        refetchQueries: [{ query: GET_TEACHERS }],
      });

      if (data?.addTeacher) {
        const newTeacherId = data.addTeacher.id;

        try {
          await get().fetchTeachers();
          console.log("Updated teachers fetched successfully.");
        } catch (fetchError) {
          console.error(
            "Error fetching updated teachers after adding:",
            fetchError
          );
        }
        toast.success("Teacher added successfully!");

        client.cache.evict({ fieldName: "getTeachers" });
        client.cache.gc();

        return newTeacherId;
      } else {
        toast.error("Failed to add teacher!");
        console.error("No teacher ID returned from mutation.");
        return null;
      }
    } catch (error) {
      console.error("Error", error);
      set({
        error:
          (error as Error).message ||
          "An error occurred while adding the teacher.",
      });
      return null;
    } finally {
      set({ addTeacherLoading: false });
    }
  },

  deleteTeacher: async (id: string) => {
    set({ deleteTeacherLoading: true, error: null });
    try {
      await client.mutate({
        mutation: DELETE_TEACHER,
        variables: { id },
        refetchQueries: ["GetTeachers"],
      });

      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.id !== id),
        teacher: state.teacher?.id === id ? null : state.teacher,
      }));

      client.cache.evict({ fieldName: "getTeachers" });
      client.cache.gc();

      return true;
    } catch (error) {
      console.error("Error in deleteTeacher:", error);
      set({
        error: (error as Error).message || "Failed to delete teacher",
      });
      return false;
    } finally {
      set({ deleteTeacherLoading: false });
    }
  },
}));
