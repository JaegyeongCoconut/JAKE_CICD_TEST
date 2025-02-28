import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PromptState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const usePromptStore = create<PromptState>()(
  immer((set) => ({
    isOpen: false,
    setIsOpen: (isOpen): void =>
      set((state) => {
        state.isOpen = isOpen;
      }),
  })),
);

export { usePromptStore };
