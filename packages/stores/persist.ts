import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface RecentSearchState {
  countryCodes: string[];
  onAddCountryCode: (code: string) => void;
  onClearCountryCodes: () => void;
  onInitializeCountryCodes: (countryCode: string) => void;
}

const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    immer((set) => ({
      countryCodes: [],
      onAddCountryCode: (code): void =>
        set((state) => {
          const newCodes = [code, ...state.countryCodes];
          state.countryCodes = [...new Set(newCodes)];
        }),
      onInitializeCountryCodes: (countryCode): void =>
        set((state) => {
          if (!state.countryCodes.includes(countryCode)) {
            state.countryCodes = [countryCode, ...state.countryCodes];
          }
        }),
      onClearCountryCodes: (): void => {
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
