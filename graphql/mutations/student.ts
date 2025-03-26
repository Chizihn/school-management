import { gql } from "@apollo/client";

export const REGISTER_STUDENT = gql`
  mutation RegisterStudent($input: StudentInput!) {
    registerStudent(input: $input) {
      id
      firstName
      lastName
      password
      gender
      dateOfBirth
      role
      regNo
      class {
        id
        name
        level
      }
      guardian {
        id
        name
        email
        phone
        gender
      }
      session {
        id
        year
        isActive
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
    updateStudent(id: $id, input: $input) {
      id
      firstName
      lastName
      password
      gender
      dateOfBirth
      role
      regNo
      class {
        id
        name
        level
      }
      guardian {
        id
        name
        email
        phone
        gender
      }
      session {
        id
        year
        isActive
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;
