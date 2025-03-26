import { Gender } from "./user";

export interface TeacherInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
}

export interface UpdateTeacherInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
}
