import { Term } from "./school";

export interface SubjectResultInput {
  subjectId: string;
  ca: number;
  exam: number;
}

export interface AttendanceInput {
  timesSchoolOpened: number;
  timesPresent: number;
}

export interface AffectiveSkillsInput {
  neatness: number;
  attitudeToWork: number;
  attentiveness: number;
  verbalFluency: number;
}

export interface PsychomotorSkillsInput {
  handwriting: number;
  gamesAndSport: number;
  art: number;
  handlingOfTools: number;
}

export interface ResultInput {
  studentId: string;
  classId: string;
  sessionId: string;
  term: Term;
  subjectResults: SubjectResultInput[];
  attendance: AttendanceInput;
  affectiveSkills: AffectiveSkillsInput;
  psychomotorSkills: PsychomotorSkillsInput;
}
