import { LOGIN } from "@/graphql/mutations/auth";
import client from "@/lib/client";
import { LoginSchema } from "@/types/auth";
import { User } from "@/types/user";
import { errorHandler } from "@/utils/error";
import { cookieStorage } from "@/utils/session";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersistedAuthState {
  user?: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
  error?: string | null;
}

export interface AuthState extends PersistedAuthState {
  login: (loginData: LoginSchema) => Promise<boolean>;
  logout: () => void;
  setAuth: (auth: PersistedAuthState) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      identifier: null,
      checkoutUser: null,

      setAuth: (auth: PersistedAuthState) => {
        set({
          user: auth.user,
          token: auth.token,
          isAuthenticated: auth.isAuthenticated,
        });
      },

      login: async (loginData) => {
        set({ loading: true, error: null });
        try {
          const response = await client.mutate({
            mutation: LOGIN,
            variables: loginData,
          });

          if (response.data?.login?.token && response.data.login?.user) {
            const { token, user } = response.data.login;
            console.log("user", response.data.login);

            cookieStorage.setItem("token", token);

            set({
              user,
              token,
              isAuthenticated: true,
              error: null,
            });
            return true;
          } else {
            throw new Error("Invalid login data");
          }
        } catch (error) {
          const errorMessage = errorHandler(error);

          set({
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        cookieStorage.removeItem("token");
        window.location.reload();

        // Reset the state
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
