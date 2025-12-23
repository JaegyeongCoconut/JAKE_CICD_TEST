import type { ReactNode } from "react";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface NavigationBlockingModalState {
  navigationBlockingModal: ReactNode;
  handleNavigationBlockingModalAdd: (modal: ReactNode) => void;
  handleNavigationBlockingModalRemove: () => void;
}

const useNavigationBlockingModalStore = create<NavigationBlockingModalState>()(
  immer((set) => ({
    navigationBlockingModal: null,
    handleNavigationBlockingModalAdd: (modal): void => {
      set((state) => {
        state.navigationBlockingModal = modal;

        document.body.style.cssText = "overflow: hidden";
      });
    },
    handleNavigationBlockingModalRemove: (): void => {
      set((state) => {
        state.navigationBlockingModal = null;

        document.body.style.cssText = "overflow: auto";
      });
    },
  })),
);

export { useNavigationBlockingModalStore };
