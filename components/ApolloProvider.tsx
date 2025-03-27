import client from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: React.ReactNode;
}

const ApolloProviderWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 100009 }} // Set a higher z-index than your modal
      />
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
