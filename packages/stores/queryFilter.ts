import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface QueryFilterState {
  isInitQueryFilter: boolean;
  setIsInitQueryFilter: (isInit: boolean) => void;
}

const useQueryFilterStore = create<QueryFilterState>()(
  immer((set) => ({
    isInitQueryFilter: true,
    setIsInitQueryFilter: (isInit): void =>
      set((state) => {
        state.isInitQueryFilter = isInit;
      }),
  })),
);

export { useQueryFilterStore };
