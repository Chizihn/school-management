import { create } from "zustand";
import client from "@/lib/client";
import { Session, SessionInput } from "@/types/school";
import { GET_SESSION, GET_SESSIONS } from "@/graphql/queries/queries";
import { errorHandler } from "@/utils/error";
import {
  CREATE_SESSION,
  DELETE_SESSION,
  UPDATE_SESSION,
} from "@/graphql/mutations/school";

interface SessionStore {
  sessions: Session[];
  session: Session | null;
  loading: boolean;
  sessionLoading: boolean;
  updateLoading: boolean;
  initialized: boolean;
  error: string | null;
  fetchSessions: () => Promise<void>;
  fetchSession: (id: string) => Promise<void>;
  createSession: (formData: SessionInput) => Promise<string | null>;
  updateSession: (id: string, input: Partial<Session>) => Promise<boolean>;
  deleteSession: (id: string) => Promise<boolean>;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  session: null,
  loading: false,
  sessionLoading: false,
  updateLoading: false,
  initialized: false,
  error: null,

  // Fetch all sessions
  fetchSessions: async () => {
    set({ loading: true, error: null });
    try {
      client.cache.evict({ fieldName: "getTeachers" });
      client.cache.gc();
      const response = await client.query({
        query: GET_SESSIONS,
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ sessions: response.data?.getSessions || [], initialized: true });
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to fetch sessions");
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single session
  fetchSession: async (id: string) => {
    set({ sessionLoading: true, error: null });
    try {
      const response = await client.query({
        query: GET_SESSION,
        variables: { id },
        fetchPolicy: "network-only",
      });

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "GraphQL error");
      }

      set({ session: response.data?.getSession });
    } catch (error) {
      set({
        error: (error as Error).message || "Failed to fetch session",
        session: null,
      });
    } finally {
      set({ sessionLoading: false });
    }
  },

  // Create a new session
  createSession: async (formData: SessionInput) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_SESSION,
        variables: { input: formData },
      });

      return data?.createSession?.id || null;
    } catch (error) {
      const errorMessage = errorHandler(error || "Failed to create session");
      set({ error: errorMessage });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Update session information
  updateSession: async (id: string, input: Partial<Session>) => {
    set({ updateLoading: true, error: null });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_SESSION,
        variables: { id, input },
      });

      if (data?.updateSession) {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, ...data.updateSession } : s
          ),
          session:
            state.session?.id === id
              ? { ...state.session, ...data.updateSession }
              : state.session,
        }));
      }
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to update session" });
      return false;
    } finally {
      set({ updateLoading: false });
    }
  },

  // Delete a session
  deleteSession: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await client.mutate({
        mutation: DELETE_SESSION,
        variables: { id },
      });

      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id),
        session: state.session?.id === id ? null : state.session,
      }));
      return true;
    } catch (error) {
      set({ error: (error as Error).message || "Failed to delete session" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
