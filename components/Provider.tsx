"use client";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import ApolloProviderWrapper from "./ApolloProvider";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ApolloProviderWrapper>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApolloProviderWrapper>
  );
};

export default Provider;
