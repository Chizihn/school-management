import { create } from "zustand";

import client from "@/lib/client";

import { Class, ClassInput } from "@/types/school";
import { Teacher } from "@/types/user";
import { GET_CLASS, GET_CLASSES } from "@/graphql/queries/queries";
import { errorHandler } from "@/utils/error";
import {
  CREATE_CLASS,
  DELETE_CLASS,
  UPDATE_CLASS,
} from "@/graphql/mutations/school";

interface ClassStore {
  classes: Class[];
  class: Class | null;
  loading: boolean;
  classLoading: boolean;
  updateLoading: boolean;
  initialized: boolean;
  error: string | null;
  setClasses: (classes: Class[]) => void;

  fetchClasses: () => Promise<void>;
  fetchClass: (id: string) => Promise<void>;
  createClass: (formData: ClassInput) => Promise<string | null>;
  updateClass: (id: string, input: Partial<Class>) => Promise<boolean>;
  deleteClass: (id: string) => Promise<boolean>;
  updateClassTeacher: (classId: string, teacherData: Teacher) => void;
}

export const useClassStore = create<ClassStore>((set) => ({
  classes: [],
  class: null,
  loading: false,
  classLoading: false,
  updateLoading: false,
  initialized: false,
  error: null,

  setClasses: (classes) => set({ classes }),

  // Fetch all classes
  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      client.cache.evict({ fieldName: "getClasses" });
      client.cache.gc();
      const response = await client.query({
        query: GET_CLASSES,
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ classes: response.data?.getClasses || [], initialized: true });
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to fetch classes");
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single class
  fetchClass: async (id: string) => {
    set({ classLoading: true, error: null });
    try {
      const response = await client.query({
        query: GET_CLASS,
        variables: { id },
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ class: response.data?.getClass });
    } catch (error) {
      set({
        error: (error as Error).message || "Failed to fetch class",
        class: null,
      });
    } finally {
      set({ classLoading: false });
    }
  },

  // Create a new class
  createClass: async (formData: ClassInput) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CLASS,
        variables: { input: formData },
      });

      client.cache.evict({ fieldName: "getClasses" });
      client.cache.gc();

      return data?.createClass?.id || null;
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to create class");
      set({ error: errorMessage });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Update class information
  updateClass: async (id: string, input: Partial<Class>) => {
    set({ updateLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_CLASS,
        variables: { id, input },
      });

      if (data?.updateClass) {
        set((state) => ({
          classes: state.classes.map((c) =>
            c.id === id ? { ...c, ...data.updateClass } : c
          ),
          class:
            state.class?.id === id
              ? { ...state.class, ...data.updateClass }
              : state.class,
        }));
      }
      client.cache.evict({ fieldName: "getClasses" });
      client.cache.gc();
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to update class" });
      return false;
    } finally {
      set({ updateLoading: false });
    }
  },

  // Delete a class
  deleteClass: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await client.mutate({
        mutation: DELETE_CLASS,
        variables: { id },
      });

      set((state) => ({
        classes: state.classes.filter((c) => c.id !== id),
        class: state.class?.id === id ? null : state.class,
      }));
      client.cache.evict({ fieldName: "getClasses" });
      client.cache.gc();
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to delete class" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
  updateClassTeacher: (classId, teacherData) => {
    set((state) => {
      const updatedClasses = state.classes.map((classItem) =>
        classItem.id === classId
          ? { ...classItem, teachers: [...classItem.teachers, teacherData] }
          : classItem
      );
      return { classes: updatedClasses };
    });
  },
}));
