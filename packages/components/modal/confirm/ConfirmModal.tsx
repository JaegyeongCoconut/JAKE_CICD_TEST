import React from "react";

import useModal from "@repo/hooks/modal/useModal";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./ConfirmModal.styled";
import GhostButton from "../../button/ghost/GhostButton";
import BaseModal from "../base/BaseModal";

interface ConfirmModalProps {
  className?: string;
  isLoading: boolean;
  activeButtonName: Languages;
  buttonType?: "active" | "alert";
  closeButtonName?: Languages;
  desc: Languages;
  noCloseButton?: boolean;
  title: Languages;
  handleActiveButtonClick?: () => void;
  handleClose?: () => void;
}

const ConfirmModal = React.forwardRef<HTMLDialogElement, ConfirmModalProps>(
  (
    {
      className,
      isLoading,
      noCloseButton = false,
      buttonType = "active",
      title,
      desc,
      activeButtonName,
      closeButtonName = "Cancel",
      handleActiveButtonClick,
      handleClose,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();
    const { handleModalClose } = useModal();

    return (
      <BaseModal css={S.baseModal} className={className} ref={ref}>
        <S.ConfirmHeader>
          <S.Title>{defaultLanguage(title)}</S.Title>
          <S.Desc>{defaultLanguage(desc)}</S.Desc>
        </S.ConfirmHeader>
        <S.ConfirmFooter>
          {!noCloseButton && (
            <GhostButton
              variant="alert"
              label={closeButtonName}
              handleButtonClick={handleClose ?? handleModalClose}
            />
          )}
          <GhostButton
            variant={buttonType === "active" ? "alert_blue" : "alert_red"}
            isLoading={isLoading}
            label={activeButtonName}
            handleButtonClick={handleActiveButtonClick}
          />
        </S.ConfirmFooter>
      </BaseModal>
    );
  },
);

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
