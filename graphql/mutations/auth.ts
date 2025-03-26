import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token # The token that is returned
      user {
        __typename # This helps identify the actual concrete type of the user (Admin, Teacher, etc.)
        ... on Admin {
          id
          firstName
          lastName
          email
          phone
          role
          createdAt
          updatedAt
        }
        ... on Teacher {
          id
          firstName
          lastName
          email
          phone
          role
          subjectIds
          subjects {
            id
            name
          }
          classIds
          createdAt
          updatedAt
        }
        ... on Student {
          id
          firstName
          lastName
          gender

          role
          regNo
          dateOfBirth
          regNo
          guardian {
            id
            name
          }
          createdAt
          updatedAt
        }
        ... on Guardian {
          id
          name
          email
          phone
          role
          gender
          relationship
          students {
            id
            firstName
            lastName
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
