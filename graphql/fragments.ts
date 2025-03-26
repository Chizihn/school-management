import { gql } from "@apollo/client";

export const USER_DETAIL_FRAGMENT = gql`
  fragment UserDetails on User {
    firstName
    lastName
    email
    phone
    role
    password
    gender
    createdAt
    updatedAt
  }
`;

export const RESULT_DETAIL_FRAGMENT = gql`
  fragment ResultDetails on Result {
    id
    student {
      id
      firstName
      lastName
      regNo
    }
    regNo
    class {
      id
      name
      level
    }
    session {
      id
      year
      isActive
      createdAt
      updatedAt
    }
    term
    numberInClass
    subjectResults {
      subjectId
      subject {
        id
        name
      }
      ca
      exam
      total
      grade
      remark
    }
    totalScoreObtained
    totalScorePossible
    average
    attendance {
      timesSchoolOpened
      timesPresent
    }
    affectiveSkills {
      neatness
      attitudeToWork
      attentiveness
      verbalFluency
    }
    psychomotorSkills {
      handwriting
      gamesAndSport
      art
      handlingOfTools
    }
    classTeacherRemark
    principalComment
    createdAt
    updatedAt
  }
`;

export const CLASS_DETAIL_FRAGMENT = gql`
  fragment ClassDetails on Class {
    id
    name
    teachers {
      id
      firstName
      lastName
      phone
    }
    students {
      id
      firstName
      lastName
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
      results {
        ...ResultDetails
      }
    }
    subjects {
      id
      name
      code
      createdAt
    }
    createdAt
    updatedAt
  }
  ${RESULT_DETAIL_FRAGMENT}
`;
