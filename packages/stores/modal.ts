import type { ReactNode, MouseEvent } from "react";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  modals: ReactNode[];
  handleModalAdd: (modal: ReactNode) => void;
  handleModalAllClose: () => void;
  handleModalClose: () => void;
  handleModalOpen: (modal: ReactNode) => (e?: MouseEvent<Element>) => void;
}

const useModalStore = create<ModalState>()(
  immer((set, get) => ({
    modals: [],
    handleModalAdd: (modal): void =>
      set((state) => {
        state.modals.push(modal);

        document.body.style.cssText = "overflow: hidden";
      }),
    handleModalOpen:
      (modal: ReactNode) =>
      (e?: MouseEvent<Element>): void => {
        e?.stopPropagation();
        get().handleModalAdd(modal);
      },
    handleModalClose: (): void =>
      set((state) => {
        state.modals.pop();

        if (state.modals.length === 0) {
          document.body.style.cssText = "overflow: auto";
        }
      }),
    handleModalAllClose: (): void =>
      set((state) => {
        state.modals.splice(0);

        document.body.style.cssText = "overflow: auto";
      }),
  })),
);

export { useModalStore };
