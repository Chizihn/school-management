import { gql } from "@apollo/client";

export const ADD_TEACHER = gql`
  mutation AddTeacher($input: TeacherInput!) {
    addTeacher(input: $input) {
      id
      firstName
      lastName
      email
      phone
      role
      gender
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TEACHER = gql`
  mutation UpdateTeacher($id: ID!, $input: UpdateTeacherInput!) {
    updateTeacher(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      phone
      role
      gender
      subjects {
        id
        name
      }
      classes {
        id
        name
        level
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation DeleteTeacher($id: ID!) {
    deleteTeacher(id: $id)
  }
`;
