import type { Dispatch, SetStateAction } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useFilterStore } from "@repo/stores/filter";
import { useRecentSearchStore } from "@repo/stores/persist";

interface UseResetSystemStateLoginUserProps<T> {
  hasSetUser: true;
  hasClearCountryCode: boolean;
  hasTranslation: boolean;
  setUser: Dispatch<SetStateAction<T | null>>;
}

interface UseResetSystemStatusNonLoginUserProps {
  hasSetUser: false;
  setUser: never;
  hasClearCountryCode: boolean;
  hasTranslation: boolean;
}

const useResetSystemState = <T>({
  hasClearCountryCode,
  hasSetUser,
  setUser,
  hasTranslation,
}:
  | UseResetSystemStateLoginUserProps<T>
  | UseResetSystemStatusNonLoginUserProps) => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);
  const clearCountryCodes = useRecentSearchStore(
    (state) => state.clearCountryCodes,
  );

  const resetSystemState = (): void => {
    queryClient.clear();
    setIsInitFilter(true);
    hasSetUser && setUser(null);
    hasClearCountryCode && clearCountryCodes();
    hasTranslation && i18n.changeLanguage("lo");
  };

  return { resetSystemState };
};

export default useResetSystemState;
