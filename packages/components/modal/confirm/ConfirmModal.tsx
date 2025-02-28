import React from "react";

import useModal from "@repo/hooks/modal/useModal";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./ConfirmModal.styled";
import GhostButton from "../../button/ghost/GhostButton";
import BaseModal from "../base/BaseModal";

interface ConfirmModalProps {
  className?: string;
  children?: React.ReactNode;
  isLoading: boolean;
  noCloseButton?: boolean;
  buttonType?: "active" | "alert";
  title: Languages;
  desc: Languages;
  activeButtonName: Languages;
  closeButtonName?: Languages;
  activeFn?: () => void;
  closeFn?: () => void;
}

const ConfirmModal = React.forwardRef<HTMLDialogElement, ConfirmModalProps>(
  (
    {
      className,
      children,
      isLoading,
      noCloseButton = false,
      buttonType = "active",
      title,
      desc,
      activeButtonName,
      closeButtonName = "Cancel",
      activeFn,
      closeFn,
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
        {children && children}
        <S.ConfirmFooter>
          {!noCloseButton && (
            <GhostButton
              variant="alert"
              label={closeButtonName}
              handleButtonClick={closeFn ?? handleModalClose}
            />
          )}
          <GhostButton
            isLoading={isLoading}
            variant={buttonType === "active" ? "alert_blue" : "alert_red"}
            label={activeButtonName}
            handleButtonClick={activeFn}
          />
        </S.ConfirmFooter>
      </BaseModal>
    );
  },
);

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
