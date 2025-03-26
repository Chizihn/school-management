import { create } from "zustand";
import client from "@/lib/client";
import { Subject, SubjectInput } from "@/types/school";
import { GET_SUBJECT, GET_SUBJECTS } from "@/graphql/queries/queries";
import { errorHandler } from "@/utils/error";
import {
  CREATE_SUBJECT,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
} from "@/graphql/mutations/school";
import { Teacher } from "@/types/user";

interface SubjectStore {
  subjects: Subject[];
  subject: Subject | null;
  loading: boolean;
  subjectLoading: boolean;
  updateLoading: boolean;
  initialized: boolean;
  error: string | null;
  setSubjects: (subjects: Subject[]) => void;

  fetchSubjects: () => Promise<void>;
  fetchSubject: (id: string) => Promise<void>;
  createSubject: (formData: SubjectInput) => Promise<string | null>;
  updateSubject: (id: string, input: Partial<Subject>) => Promise<boolean>;
  deleteSubject: (id: string) => Promise<boolean>;
  updateSubjectTeacher: (subjectId: string, teacherData: Teacher) => void;
}

export const useSubjectStore = create<SubjectStore>((set) => ({
  subjects: [],
  subject: null,
  loading: false,
  subjectLoading: false,
  updateLoading: false,
  initialized: false,
  error: null,
  setSubjects: (subjects) => set({ subjects: subjects }),

  // Fetch all subjects
  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await client.query({
        query: GET_SUBJECTS,
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ subjects: response.data?.getSubjects || [], initialized: true });
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to fetch subjects");
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single subject
  fetchSubject: async (id: string) => {
    set({ subjectLoading: true, error: null });
    try {
      const response = await client.query({
        query: GET_SUBJECT,
        variables: { id },
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ subject: response.data?.getSubject });
    } catch (error) {
      set({
        error: (error as Error).message || "Failed to fetch subject",
        subject: null,
      });
    } finally {
      set({ subjectLoading: false });
    }
  },

  // Create a new subject
  createSubject: async (formData: SubjectInput) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_SUBJECT,
        variables: { input: formData },
      });

      return data?.createSubject?.id || null;
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to create subject");
      set({ error: errorMessage });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Update subject information
  updateSubject: async (id: string, input: Partial<Subject>) => {
    set({ updateLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_SUBJECT,
        variables: { id, input },
      });

      if (data?.updateSubject) {
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === id ? { ...s, ...data.updateSubject } : s
          ),
          subject:
            state.subject?.id === id
              ? { ...state.subject, ...data.updateSubject }
              : state.subject,
        }));
      }
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to update subject" });
      return false;
    } finally {
      set({ updateLoading: false });
    }
  },

  // Delete a subject
  deleteSubject: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await client.mutate({
        mutation: DELETE_SUBJECT,
        variables: { id },
      });

      set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id),
        subject: state.subject?.id === id ? null : state.subject,
      }));
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to delete subject" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateSubjectTeacher: (subjectId: string, teacherData: Teacher) => {
    set((state: SubjectStore) => {
      const updatedSubjects = state.subjects.map((subject: Subject) =>
        subject.id === subjectId
          ? { ...subject, teacher: [teacherData] }
          : subject
      );

      return {
        ...state,
        subjects: updatedSubjects,
      };
    });
  },
}));
