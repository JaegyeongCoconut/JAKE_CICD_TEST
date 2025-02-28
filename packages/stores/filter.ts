import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FilterState {
  isInitFilter: boolean;
  setIsInitFilter: (isInit: boolean) => void;
}

const useFilterStore = create<FilterState>()(
  immer((set) => ({
    isInitFilter: true,
    setIsInitFilter: (isInit): void =>
      set((state) => {
        state.isInitFilter = isInit;
      }),
  })),
);

export { useFilterStore };
