import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface RecentSearchState {
  countryCodes: string[];
  addCountryCode: (code: string) => void;
  initializeCountryCodes: (countryCode: string) => void;
  clearCountryCodes: () => void;
}

const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    immer((set) => ({
      countryCodes: [],
      addCountryCode: (code): void =>
        set((state) => {
          const newCodes = [code, ...state.countryCodes];
          state.countryCodes = [...new Set(newCodes)];
        }),
      initializeCountryCodes: (countryCode): void =>
        set((state) => {
          if (!state.countryCodes.includes(countryCode)) {
            state.countryCodes = [countryCode, ...state.countryCodes];
          }
        }),
      clearCountryCodes: (): void => {
        set((state) => {
          state.countryCodes = [];
        });
        useRecentSearchStore.persist.clearStorage();
      },
    })),
    {
      name: "recentSearchCountryCode",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useRecentSearchStore };
