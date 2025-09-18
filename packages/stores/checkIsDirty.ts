import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CheckIsDirtyState {
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
}

const useCheckIsDirtyStore = create<CheckIsDirtyState>()(
  immer((set) => ({
    isDirty: false,
    setIsDirty: (isDirty): void =>
      set((state) => {
        state.isDirty = isDirty;
      }),
  })),
);

export { useCheckIsDirtyStore };
