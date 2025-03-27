import { create } from "zustand";

interface ModalState {
  isAddStudentModalOpen: boolean;
  openAddStudentModal: () => void;
  closeAddStudentModal: () => void;

  isAddClassModalOpen: boolean;
  openAddClassModal: () => void;
  closeAddClassModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAddStudentModalOpen: false,
  openAddStudentModal: () => set({ isAddStudentModalOpen: true }),
  closeAddStudentModal: () => set({ isAddStudentModalOpen: false }),

  isAddClassModalOpen: false,
  openAddClassModal: () => set({ isAddClassModalOpen: true }),
  closeAddClassModal: () => set({ isAddClassModalOpen: false }),
}));
