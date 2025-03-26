import { create } from "zustand";
import client from "@/lib/client";
import { Student } from "@/types/user";
import { StudentInput } from "@/types/school";
import { GET_STUDENT, GET_STUDENTS } from "@/graphql/queries/queries";
import { errorHandler } from "@/utils/error";
import {
  DELETE_STUDENT,
  REGISTER_STUDENT,
  UPDATE_STUDENT,
} from "@/graphql/mutations/student";

interface StudentStore {
  students: Student[];
  student: Student | null;
  loading: boolean;
  studentLoading: boolean;
  updateLoading: boolean;
  initialized: boolean;
  error: string | null;
  fetchStudents: (classId: string, sessionId: string) => Promise<void>;
  fetchStudent: (id: string) => Promise<void>;
  registerStudent: (formData: StudentInput) => Promise<string | null>;
  updateStudent: (id: string, input: Partial<Student>) => Promise<boolean>;
  deleteStudent: (id: string) => Promise<boolean>;
}

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [],
  student: null,
  loading: false,
  studentLoading: false,
  updateLoading: false,
  initialized: false,
  error: null,

  // Fetch all students for a specific class and session
  fetchStudents: async (classId: string, sessionId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await client.query({
        query: GET_STUDENTS,
        variables: { classId, sessionId },
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        console.error("GraphQL Errors:", response.errors);
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      const studentsList = response.data?.getStudents || [];

      if (!studentsList) {
        console.warn("No students found for the given class and session.");
        set({ students: [] });
        return;
      }

      set({ students: studentsList, initialized: true });
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to fetch students");
      console.error("Error in fetchStudents:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false, initialized: true });
    }
  },

  // Fetch a single student
  fetchStudent: async (id: string) => {
    set({ studentLoading: true, error: null });
    try {
      const { data } = await client.query({
        query: GET_STUDENT,
        variables: { id },
        fetchPolicy: "network-only",
      });

      const fetchedStudent = data?.getStudent;

      set((state) => ({
        student: fetchedStudent,
        students: state.students.some((s) => s.id === id)
          ? state.students.map((s) => (s.id === id ? fetchedStudent : s))
          : [...state.students, fetchedStudent],
      }));
    } catch (error) {
      console.error("Error in fetchStudent:", error);
      set({
        error: (error as Error).message || "Failed to fetch student",
        student: null,
      });
    } finally {
      set({ studentLoading: false, initialized: true });
    }
  },

  // Register a new student
  registerStudent: async (formData: StudentInput) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: REGISTER_STUDENT,
        variables: { input: formData },
        refetchQueries: ["GetStudents"],
      });

      if (data?.registerStudent) {
        const newStudentId = data.registerStudent.id;

        try {
          await get().fetchStudents(formData.classId, formData.sessionId);
          console.log("Updated students fetched successfully.");
        } catch (fetchError) {
          console.error(
            "Error fetching updated students after registration:",
            fetchError
          );
        }

        return newStudentId;
      } else {
        console.error("No student ID returned from mutation.");
        return null;
      }
    } catch (error) {
      console.error("Error", error);
      set({
        error:
          (error as Error).message ||
          "An error occurred while registering the student.",
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Update student information
  updateStudent: async (id: string, input: Partial<Student>) => {
    set({ updateLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_STUDENT,
        variables: { id, input },
        refetchQueries: ["GetStudent"],
      });

      if (data?.updateStudent) {
        const updatedStudent = data.updateStudent;

        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? { ...student, ...updatedStudent } : student
          ),
          student:
            state.student?.id === id
              ? { ...state.student, ...updatedStudent }
              : state.student,
        }));
      }
      return true;
    } catch (error) {
      console.error("Error in updateStudent:", error);
      set({ error: (error as Error).message || "Failed to update student" });
      return false;
    } finally {
      set({ updateLoading: false });
    }
  },

  // Delete student
  deleteStudent: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await client.mutate({
        mutation: DELETE_STUDENT,
        variables: { id },
        refetchQueries: ["GetStudents"],
      });

      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
        student: state.student?.id === id ? null : state.student,
      }));

      return true;
    } catch (error) {
      console.error("Error in deleteStudent:", error);
      set({
        error: (error as Error).message || "Failed to delete student",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
