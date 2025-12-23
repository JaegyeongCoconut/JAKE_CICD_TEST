import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useNavigationBlockingModal from "@repo/hooks/modal/useNavigationBlockingModal";
import { useCheckIsDirtyStore } from "@repo/stores/checkIsDirty";

import ConfirmModal from "../confirm/ConfirmModal";

interface NavigationBlockingModalProps {
  callbackFn: () => void;
}
const NavigationBlockingModal = ({
  callbackFn,
}: NavigationBlockingModalProps) => {
  const setIsDirty = useCheckIsDirtyStore((state) => state.setIsDirty);

  const { navigationBlockingModalRef, handleNavigationBlockingModalClose } =
    useNavigationBlockingModal();

  const handleActiveButtonClick = (): void => {
    callbackFn();
    setIsDirty(false);
    handleNavigationBlockingModalClose();
  };

  return (
    <ConfirmModal
      ref={navigationBlockingModalRef}
      isLoading={false}
      activeButtonName={LANGUAGE_LABEL.LEAVE}
      buttonType="alert"
      closeButtonName={LANGUAGE_LABEL.CLOSE}
      description={LANGUAGE_LABEL.CHANGES_YOU_MADE_MAY_NOT_BE_SAVED}
      title={LANGUAGE_LABEL.LEAVE_THIS_PAGE}
      handleActiveButtonClick={handleActiveButtonClick}
      handleClose={handleNavigationBlockingModalClose}
    />
  );
};

export default NavigationBlockingModal;
