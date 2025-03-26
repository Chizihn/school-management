import {
  ASSIGN_SUBJECT_TO_CLASS,
  ASSIGN_SUBJECT_TO_TEACHER,
  ASSIGN_TEACHER_TO_CLASS,
  REMOVE_SUBJECT_FROM_CLASS,
  REMOVE_SUBJECT_FROM_TEACHER,
  REMOVE_TEACHER_FROM_CLASS,
} from "@/graphql/mutations/school";
import client from "@/lib/client";
import { create } from "zustand";
import { useClassStore } from "./useClass";
import { useSubjectStore } from "./useSubject";

interface AssignRemoveStore {
  assignTeacherToClass: (classId: string, teacherId: string) => Promise<void>;
  removeTeacherFromClass: (classId: string, teacherId: string) => Promise<void>;
  assignSubjectToClass: (classId: string, subjectId: string) => Promise<void>;
  removeSubjectFromClass: (classId: string, subjectId: string) => Promise<void>;
  assignSubjectToTeacher: (
    teacherId: string,
    subjectId: string
  ) => Promise<void>;
  removeSubjectFromTeacher: (
    teacherId: string,
    subjectId: string
  ) => Promise<void>;
}

export const useAssignRemoveStore = create<AssignRemoveStore>(() => ({
  assignTeacherToClass: async (classId, teacherId) => {
    try {
      const { data } = await client.mutate({
        mutation: ASSIGN_TEACHER_TO_CLASS,
        variables: { classId, teacherId },
      });

      const teacherData = data?.assignTeacherToClass;
      if (teacherData) {
        const { updateClassTeacher } = useClassStore.getState();
        updateClassTeacher(classId, teacherData);
      }
    } catch (error) {
      console.error("Failed to assign teacher to class", error);
    }
  },

  removeTeacherFromClass: async (classId, teacherId) => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_TEACHER_FROM_CLASS,
        variables: { classId, teacherId },
      });

      const teacherData = data?.removeTeacherFromClass;

      if (teacherData) {
        const { updateClassTeacher } = useClassStore.getState();
        updateClassTeacher(classId, teacherData);
      }
    } catch (error) {
      console.error("Failed to remove teacher from class", error);
    }
  },

  assignSubjectToClass: async (classId, subjectId) => {
    try {
      const { data } = await client.mutate({
        mutation: ASSIGN_SUBJECT_TO_CLASS,
        variables: { classId, subjectId },
      });

      const subjectData = data?.assignSubjectToClass;
      if (subjectData) {
        const { subjects, setSubjects } = useSubjectStore.getState();

        const updatedSubjects = [...subjects, ...subjectData];
        setSubjects(updatedSubjects);
      }
    } catch (error) {
      console.error("Failed to assign subject to class", error);
    }
  },

  removeSubjectFromClass: async (classId, subjectId) => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_SUBJECT_FROM_CLASS,
        variables: { classId, subjectId },
      });

      const subjectData = data?.removeSubjectFromClass;

      if (subjectData) {
        const { subjects, setSubjects } = useSubjectStore.getState();

        const filteredSubjects = subjects.filter(
          (subject) => subject.id !== subjectId
        );
        setSubjects(filteredSubjects);
      }
    } catch (error) {
      console.error("Failed to remove subject from class", error);
    }
  },

  assignSubjectToTeacher: async (teacherId, subjectId) => {
    try {
      const { data } = await client.mutate({
        mutation: ASSIGN_SUBJECT_TO_TEACHER,
        variables: { teacherId, subjectId },
      });

      const subjectData = data?.assignSubjectToTeacher; // Assuming mutation returns subject data
      if (subjectData) {
        const { updateSubjectTeacher } = useSubjectStore.getState();
        updateSubjectTeacher(subjectId, subjectData); // Update state directly
      }
    } catch (error) {
      console.error("Failed to assign subject to teacher", error);
    }
  },

  removeSubjectFromTeacher: async (teacherId, subjectId) => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_SUBJECT_FROM_TEACHER,
        variables: { teacherId, subjectId },
      });

      const subjectData = data?.removeSubjectFromTeacher; // Assuming mutation returns subject data
      if (subjectData) {
        const { updateSubjectTeacher } = useSubjectStore.getState();
        updateSubjectTeacher(subjectId, subjectData); // Update state directly
      }
    } catch (error) {
      console.error("Failed to remove subject from teacher", error);
    }
  },
}));
