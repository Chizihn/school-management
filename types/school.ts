import { Gender, Student, Teacher } from "./user";

// =====================================Register Student=====================================

export interface StudentInput {
  firstName: string;
  lastName: string;
  password: string;
  gender: Gender;
  dateOfBirth: string;
  classId: string;
  sessionId: string;
}

// =====================================Session=====================================

//For create session mutation
export interface SessionInput {
  year: string;
  isActive: boolean;
}

//For create session mutation
export interface UpdateSessionInput {
  year: string;
  isActive: boolean;
}

export interface Session {
  id: string;
  year: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// =====================================Subject=====================================

//For create subject mutation
export interface SubjectInput {
  name: string;
  code: string;
}

//For update subject mutation
export interface UpdateSubjectInput {
  name: string;
  code: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classes: Class[];
  teacher: Teacher[];
  createdAt: string;
  updatedAt: string;
}

// =====================================Class=====================================

//For add class mutation
export interface ClassInput {
  name: string;
  level: ClassLevel;
}

//For update class mutation
export interface UpdateClassInput {
  name: string;
  level: ClassLevel;
}

export enum ClassLevel {
  NUSERY = "NUSERY",
  PRIMARY = "PRIMARY",
  JUNIOR_SECONDARY = "JUNIOR_SECONDARY",
  SENIOR_SECONDARY = "SENIOR_SECONDARY",
}

export interface Class {
  id: string;
  name: string;
  level: ClassLevel;
  teachers: Teacher[];
  students: Student[];
  subjects: Subject[];
  createdAat: string;
  updatedAt: string;
}

// =====================================Term=====================================

export enum Term {
  FIRST_TERM = "FIRST_TERM",
  SECOND_TERM = "SECOND_TERM",
  THIRD_TERM = "THIRD_TERM",
}

// =====================================Grade=====================================
export enum Grade {
  A1 = "A1",
  B2 = "B2",
  B3 = "B3",
  C4 = "C4",
  C5 = "C5",
  C6 = "C6",
  D7 = "D7",
  E8 = "E8",
  F9 = "F9",
}

// =====================================Remark=====================================
export enum Remark {
  EXCELLENT = "EXCELLENT",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
}

// =====================================Subject Result=====================================
export interface SubjectResult {
  subjectId: string;
  subject: Subject;
  ca: number;
  exam: number;
  total: number;
  grade: Grade;
  remark: Remark;
}

// =====================================Attendance=====================================
export interface Attendance {
  timesSchoolOpened: number;
  timesPresent: number;
}

// =====================================AffectiveSkills=====================================
export interface AffectiveSkills {
  neatness: number;
  attitudeToWork: number;
  attentiveness: number;
  verbalFluency: number;
}

// =====================================PsychomotorSkills=====================================

export interface PsychomotorSkills {
  handwriting: number;
  gamesAndSport: number;
  art: number;
  handlingOfTools: number;
}

// =====================================Result=====================================

export interface Result {
  id: string;
  student: Student;
  regNo: string;
  class: Class;
  session: Session;
  term: Term;
  numberInClass: number;
  subjectResults: SubjectResult[];
  totalScoreObtained: number;
  totalScorePossible: number;
  average: number;
  attendance: Attendance;
  affectiveSkills: AffectiveSkills;
  psychomotorSkills: PsychomotorSkills;
  classTeacherRemark: string;
  principalComment: string;
  createdAt: string;
  updatedAt: string;
}

// ===================================== Class Broadsheet =====================================

export interface ClassBroadsheet {
  id: string;
  class: Class;
  session: Session;
  term: Term;
  studentResults: Result[];
  createdAt: string;
  updatedAt: string;
}
