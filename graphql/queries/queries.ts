import { gql } from "@apollo/client";
import { RESULT_DETAIL_FRAGMENT } from "../fragments";

// ===================================== Students =====================================

//Query for getting students of a class
export const GET_STUDENTS = gql`
  query GetStudents($classId: ID!, $sessionId: ID!) {
    getStudents(classId: $classId, sessionId: $sessionId) {
      id
      firstName
      lastName
      gender
      regNo
      guardian {
        id
        name
        email
        phone
      }
    }
  }
`;

//Query for getting single student
export const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      firstName
      lastName
      gender
      regNo
      guardian {
        id
        name
        email
        phone
      }
    }
  }
`;

// ===================================== Teachers =====================================

//Query for getting teachers
export const GET_TEACHERS = gql`
  query GetTeachers {
    getTeachers {
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
        subjects {
          id
          name
          code
        }
      }
      createdAt
    }
  }
`;

//Query for getting a teacher
export const GET_TEACHER = gql`
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
        subjects {
          id
          name
          code
        }
      }
      createdAt
    }
  }
`;

// ===================================== Classes =====================================
//Query for getting classes
export const GET_CLASSES = gql`
  query GetClasses {
    getClasses {
      id
      name
      level
      teachers {
        id
        firstName
        lastName
      }
      students {
        id
        firstName
        lastName
      }
      subjects {
        id
        name
        code
      }
      createdAt
      updatedAt
    }
  }
`;

//Query for getting a class
export const GET_CLASS = gql`
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      name
      level
      teachers {
        id
        firstName
        lastName
      }
      students {
        id
        firstName
        lastName
      }
      subjects {
        id
        name
        code
      }
      createdAt
      updatedAt
    }
  }
`;

// ===================================== Subjects =====================================
//Query for getting Subjects
export const GET_SUBJECTS = gql`
  query GetSubjects {
    getSubjects {
      id
      name
      code
      classes {
        id
        name
        level
      }
      teacher {
        id
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

//Query for getting a subject
export const GET_SUBJECT = gql`
  query GetSubject($id: ID!) {
    getSubject(id: $id) {
      id
      name
      code
      classes {
        id
        name
        level
      }
      teacher {
        id
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

// ===================================== Session =====================================

//Query for getting Sessions
export const GET_SESSIONS = gql`
  query GetSessions {
    getSessions {
      id
      year
      isActive
      createdAt
    }
  }
`;

//Query for getting a session
export const GET_SESSION = gql`
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      year
      isActive
      createdAt
    }
  }
`;

// ===================================== Result =====================================

// Getresults of a student
export const GET_RESULTS = gql`
  query GetResults($studentId: ID!, $sessionId: ID!, $term: Term!) {
    getResults(studentId: $studentId, sessionId: $sessionId, term: $term) {
      ...ResultDetails
    }
  }
  ${RESULT_DETAIL_FRAGMENT}
`;

//Get broasdsheet for whole class
export const GET_CLASS_BROADSHEET = gql`
  query GetClassBroadsheet($classId: ID!, $sessionId: ID!, $term: Term!) {
    getClassBroadsheet(classId: $classId, sessionId: $sessionId, term: $term) {
      id
      class {
        id
        name
        level
      }
      session {
        id
        year
      }
      term
      studentResults {
        ...ResultDetails
      }
      createdAt
      updatedAt
    }
  }
  ${RESULT_DETAIL_FRAGMENT}
`;

// export const   = gql`

// `

// export const   = gql`

// `
// export const   = gql`

// `

// export const   = gql`

// `
