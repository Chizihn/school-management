// Enum for gender
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classes: Class[];
  teacher: [Teacher];
  createdAt: string;
  updatedAt: string;
}

// Enum for roles
export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  GUARDIAN = "GUARDIAN",
}

// BaseUser Type
export type BaseUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
};

// Admin Type
export type Admin = BaseUser & {};

// Teacher Interface
export interface Teacher extends BaseUser {
  subjects: Subject[];
  classes: Class[];
}

export interface Result {
  id: string;
}

// Student Type
export type Student = BaseUser & {
  dateOfBirth: string;
  regNo: string;
  guardian: Guardian;
  session: Session;
  results: Result[];
};

export const GuardianRelationship = {
  FATHER: "FATHER",
  MOTHER: "MOTHER",
  UNCLE: "UNCLE",
  AUNT: "AUNT",
  GRANDPARENT: "GRANDPARENT",
  OTHER: "OTHER",
};

export type GuardianRelationshipType = keyof typeof GuardianRelationship;

// Guardian Type
export type Guardian = BaseUser & {
  relationship: string;
  phone: string;
  email: string;
};

// Union for User (Admin | Teacher | Student | Guardian)
export type User = Admin | Teacher | Student | Guardian;

// Example: Session Type
export type Session = {
  id: string;
  year: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Example: Class Type
export type Class = {
  id: string;
  name: string;
  level: string;
  teacherIds: string[];
  studentIds: string[];
  subjectIds: string[];
  createdAt: string;
  updatedAt: string;
};
