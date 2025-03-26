import { gql } from "@apollo/client";
import { RESULT_DETAIL_FRAGMENT } from "../fragments";

// =====================================Session=====================================

export const CREATE_SESSION = gql`
  mutation CreateSession($input: SessionInput!) {
    createSession(input: $input) {
      id
      year
      isActive
      createdAt
    }
  }
`;

export const UPDATE_SESSION = gql`
  mutation UpdateSession($id: ID!, $input: UpdateSessionInput!) {
    updateSession(id: $id, input: $input) {
      id
      year
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation DeleteSession($id: ID!) {
    deleteSession(id: $id)
  }
`;

// =====================================Class=====================================
export const CREATE_CLASS = gql`
  mutation CreateClass($input: ClassInput!) {
    createClass(input: $input) {
      id
      name
      level
      createdAt
    }
  }
`;

export const UPDATE_CLASS = gql`
  mutation UpdateClass($id: ID!, $input: UpdateClassInput!) {
    updateClass(id: $id, input: $input) {
      id
      name
      level
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation DeleteClass($id: ID!) {
    deleteClass(id: $id)
  }
`;

// =====================================Subject=====================================

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($input: SubjectInput!) {
    createSubject(input: $input) {
      id
      name
      code
      createdAt
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: ID!, $input: UpdateSubjectInput!) {
    updateSubject(id: $id, input: $input) {
      id
      name
      code
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: ID!) {
    deleteSubject(id: $id)
  }
`;

// =====================================Subject - Teacher =====================================

export const ASSIGN_SUBJECT_TO_TEACHER = gql`
  mutation AssignSubjectToTeacher($teacherId: ID!, $subjectId: ID!) {
    assignSubjectToTeacher(teacherId: $teacherId, subjectId: $subjectId) {
      id
      firstName
      lastName
      email
      phone
      subjects {
        id
        name
        code
      }
      classes {
        id
        name
        level
      }
    }
  }
`;

export const REMOVE_SUBJECT_FROM_TEACHER = gql`
  mutation RemoveSubjectFromTeacher($teacherId: ID!, $subjectId: ID!) {
    removeSubjectFromTeacher(teacherId: $teacherId, subjectId: $subjectId) {
      id
      firstName
      lastName
      email
      phone
      subjects {
        id
        name
        code
      }
      classes {
        id
        name
        level
      }
    }
  }
`;

// =====================================Teacher - class =====================================
export const ASSIGN_TEACHER_TO_CLASS = gql`
  mutation AssignTeacherToClass($classId: ID!, $teacherId: ID!) {
    assignTeacherToClass(classId: $classId, teacherId: $teacherId) {
      id
      name
      level
    }
  }
`;

export const REMOVE_TEACHER_FROM_CLASS = gql`
  mutation RemoveTeacherFromClass($classId: ID!, $teacherId: ID!) {
    removeTeacherFromClass(classId: $classId, teacherId: $teacherId) {
      id
      name
      level
    }
  }
`;

// ===================================== Class Subject =====================================

export const ASSIGN_SUBJECT_TO_CLASS = gql`
  mutation AssignSubjectToClass($classId: ID!, $subjectId: ID!) {
    assignSubjectToClass(classId: $classId, subjectId: $subjectId) {
      id
      name
      level
    }
  }
`;

export const REMOVE_SUBJECT_FROM_CLASS = gql`
  mutation RemoveSubjectToClass($classId: ID!, $subjectId: ID!) {
    removeSubjectFromClass(classId: $classId, subjectId: $subjectId) {
      id
      name
      level
    }
  }
`;

// ===================================== Result =====================================

export const RECORD_ASSESSMENT = gql`
  mutation RecordAssessment($input: ResultInput!) {
    recordAssessment(input: $input) {
      ...ResultDetails
    }
  }
  ${RESULT_DETAIL_FRAGMENT}
`;

export const UPDATE_RESULT = gql`
  mutation UpdateResult($id: ID!, $input: UpdateResultInput!) {
    updateResult(id: $id, input: $input) {
      ...ResultDetails
    }
  }
  ${RESULT_DETAIL_FRAGMENT}
`;

export const GENERATE_CLASS_BROADSHEET  = gql`
mutation GenerateClassBroadsheet ($classId: ID!, $sessionId: ID!, $term: Term!) {
  generateClassBroadsheet (classId: $classId, sessionId: $sessionId, term: $term) {
    id
    class {
      id
      name
      level
      teachers {
        id
        firstName
        lastName
      }
      students{
        id
        firstName
        lastName
        regNo
      }
      subjects {
        id
        name
        code
        createdAt
      }
    }
    session {
      id
      year
      createdAt
    }
    term
    studentResults {
       ...ResultDetails
    }
    createdAt
  }
}
${RESULT_DETAIL_FRAGMENT}

`

// export const   = gql`

// `

// export const   = gql`

// `
// export const   = gql`

// `

// export const   = gql`

// `
