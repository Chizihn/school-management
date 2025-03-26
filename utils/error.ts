import { ApolloError } from "@apollo/client";

export function errorHandler(error: unknown, message?: string) {
  let errorMessage = message || "An unknown error occurred";

  // Handling ApolloError
  if (error instanceof ApolloError) {
    error.graphQLErrors.forEach((err) => {
      console.error("GraphQL error:", err.message);
      errorMessage = err.message;
    });

    if (error.networkError) {
      console.error("Network error:", error.networkError);
      errorMessage = "Network error";
    }

    errorMessage = error.message; // Use ApolloError message if applicable
  } else if (error instanceof Error) {
    console.error("Error:", error.message);
    errorMessage = error.message;
  }
  return errorMessage;
}

//ui Error
// export const NotEmptyError = (errors: unknown, errorMessage: string) => {
//   if (errors) {
//     if (errors[0].message === "no carelog found for this dependent") {
//       console.warn("No carelog found for dependent:", dependentId);
//       setCareLogs([]);
//       return;
//     }
//     console.error("GraphQL Errors:", errors);
//     throw new Error(errors[0]?.message || "GraphQL error");
//   }
// }
