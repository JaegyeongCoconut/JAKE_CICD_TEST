import React from "react";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  modals: React.ReactNode[];
  addModal: (modal: React.ReactNode) => void;
  removeModal: () => void;
  clearModals: () => void;
}

const useModalStore = create<ModalState>()(
  immer((set) => ({
    modals: [],
    addModal: (modal) =>
      set((state) => {
        state.modals.push(modal);
      }),
    removeModal: () =>
      set((state) => {
        state.modals.pop();
      }),
    clearModals: () =>
      set((state) => {
        state.modals = [];
      }),
  })),
);

export { useModalStore };
