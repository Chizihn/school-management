import { API_URL } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { cookieStorage, isTokenExpired } from "@/utils/session";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const cookieToken = cookieStorage.getItem("token") as string;
  const storeToken = useAuthStore.getState().token as string;
  const token = cookieToken || storeToken || "";

  if (token && isTokenExpired(token)) {
    useAuthStore.getState().logout();
    return forward(operation);
  }

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response?.headers?.get("authorization");

    // If we get a new token in the response, update it
    if (authHeader) {
      const newToken = authHeader.split(" ")[1];
      if (newToken) {
        cookieStorage.setItem("token", newToken);
        useAuthStore.getState().setAuth({
          token: newToken,
          isAuthenticated: true,
        });
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: API_URL as string })),
  credentials: "include",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

export default client;
