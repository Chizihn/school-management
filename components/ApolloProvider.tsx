import client from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";
interface Props {
  children: React.ReactNode;
}

const ApolloProviderWrapper: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
