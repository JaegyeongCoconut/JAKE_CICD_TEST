import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./ConfirmModal.styled";
import GhostButton from "../../button/ghost/GhostButton";
import BaseModal from "../base/BaseModal";

interface ConfirmModalProps {
  className?: string;
  isLoading: boolean;
  activeButtonName: Languages;
  buttonType: "active" | "alert";
  closeButtonName: Languages;
  description: Languages;
  title: Languages;
  handleActiveButtonClick: () => void;
  handleClose: () => void;
}

const ConfirmModal = React.forwardRef<HTMLDialogElement, ConfirmModalProps>(
  (
    {
      className,
      isLoading,
      buttonType,
      title,
      description,
      activeButtonName,
      closeButtonName,
      handleActiveButtonClick,
      handleClose,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();

    return (
      <BaseModal css={S.baseModal} className={className} ref={ref}>
        <S.ConfirmHeader>
          <S.Title>{defaultLanguage({ text: title })}</S.Title>
          <S.Description>
            {defaultLanguage({ text: description })}
          </S.Description>
        </S.ConfirmHeader>
        <S.ConfirmFooter>
          <GhostButton
            variant="alert"
            disabled={false}
            isLoading={false}
            label={closeButtonName}
            handleButtonClick={handleClose}
          />
          <GhostButton
            variant={buttonType === "active" ? "alert_blue" : "alert_red"}
            disabled={false}
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
