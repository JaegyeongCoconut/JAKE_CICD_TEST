import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useModalStore } from "@repo/stores/modal";
import { useRecentSearchStore } from "@repo/stores/persist";

import useNavigationBlockingModal from "./modal/useNavigationBlockingModal";

interface UseResetSystemStateProps {
  hasClearCountryCode: boolean;
  hasTranslation: boolean;
}

const useResetSystemState = ({
  hasClearCountryCode,
  hasTranslation,
}: UseResetSystemStateProps) => {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  const handleModalAllClose = useModalStore(
    (state) => state.handleModalAllClose,
  );

  const { handleNavigationBlockingModalClose } = useNavigationBlockingModal();
  const clearCountryCodes = useRecentSearchStore(
    (state) => state.onClearCountryCodes,
  );

  const resetSystemState = (): void => {
    queryClient.clear();
    handleModalAllClose();
    handleNavigationBlockingModalClose();
    hasClearCountryCode && clearCountryCodes();
    hasTranslation && i18n.changeLanguage("lo");
  };

  return { resetSystemState };
};

export default useResetSystemState;
