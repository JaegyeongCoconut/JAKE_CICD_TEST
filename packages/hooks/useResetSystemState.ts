import type { Dispatch, SetStateAction } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useRecentSearchStore } from "@repo/stores/persist";

import useModal from "./modal/useModal";
import useNavigationBlockingModal from "./modal/useNavigationBlockingModal";

interface UseResetSystemStateLoginUserProps<T> {
  hasClearCountryCode: boolean;
  hasSetUser: true;
  hasTranslation: boolean;
  onSetUser: Dispatch<SetStateAction<T | null>>;
}

interface UseResetSystemStatusNonLoginUserProps {
  hasClearCountryCode: boolean;
  hasSetUser: false;
  hasTranslation: boolean;
  onSetUser: never;
}

const useResetSystemState = <T>({
  hasClearCountryCode,
  hasSetUser,
  onSetUser,
  hasTranslation,
}:
  | UseResetSystemStateLoginUserProps<T>
  | UseResetSystemStatusNonLoginUserProps) => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  const { handleNavigationBlockingModalClose } = useNavigationBlockingModal();
  const { handleModalAllClose } = useModal();
  const clearCountryCodes = useRecentSearchStore(
    (state) => state.onClearCountryCodes,
  );

  const resetSystemState = (): void => {
    queryClient.clear();
    handleModalAllClose();
    handleNavigationBlockingModalClose();
    hasSetUser && onSetUser(null);
    hasClearCountryCode && clearCountryCodes();
    hasTranslation && i18n.changeLanguage("lo");
  };

  return { resetSystemState };
};

export default useResetSystemState;
