import type { ReactNode } from "react";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  modals: ReactNode[];
  handleModalAdd: (modal: ReactNode) => void;
  handleModalClear: () => void;
  handleModalRemove: () => void;
}

const useModalStore = create<ModalState>()(
  immer((set) => ({
    modals: [],
    handleModalAdd: (modal) =>
      set((state) => {
        state.modals.push(modal);

        document.body.style.cssText = "overflow: hidden";
      }),
    handleModalRemove: () =>
      set((state) => {
        state.modals.pop();

        if (state.modals.length === 0) {
          document.body.style.cssText = "overflow: auto";
        }
      }),
    handleModalClear: () =>
      set((state) => {
        state.modals.splice(0);

        document.body.style.cssText = "overflow: auto";
      }),
  })),
);

export { useModalStore };
