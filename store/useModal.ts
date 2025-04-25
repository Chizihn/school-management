import { create } from "zustand";

interface ModalState {
  isAddStudentModalOpen: boolean;
  openAddStudentModal: () => void;
  closeAddStudentModal: () => void;

  isEditStudentModalOpen: boolean;
  openEditStudentModal: () => void;
  closeEditStudentModal: () => void;

  isAddTeacherModalOpen: boolean;
  openAddTeacherModal: () => void;
  closeAddTeacherModal: () => void;

  isAddClassModalOpen: boolean;
  openAddClassModal: () => void;
  closeAddClassModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAddTeacherModalOpen: false,
  openAddTeacherModal: () => set({ isAddTeacherModalOpen: true }),
  closeAddTeacherModal: () => set({ isAddTeacherModalOpen: false }),

  isAddStudentModalOpen: false,
  openAddStudentModal: () => set({ isAddStudentModalOpen: true }),
  closeAddStudentModal: () => set({ isAddStudentModalOpen: false }),

  isEditStudentModalOpen: false,
  openEditStudentModal: () => set({ isEditStudentModalOpen: true }),
  closeEditStudentModal: () => set({ isEditStudentModalOpen: false }),

  isAddClassModalOpen: false,
  openAddClassModal: () => set({ isAddClassModalOpen: true }),
  closeAddClassModal: () => set({ isAddClassModalOpen: false }),
}));
