import React from "react";

import { ChevronDownIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./FormModalButton.styled";

interface ModalButtonProps {
  className?: string;
  hasError: boolean;
  label: string;
  placeholder: Languages;
  disabled?: boolean;
  handleModalOpen: () => void;
}

const FormModalButton = ({
  className,
  hasError,
  label,
  placeholder,
  disabled,
  handleModalOpen,
}: ModalButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.FormModalButton
      className={className}
      type="button"
      hasError={hasError}
      disabled={disabled}
      onClick={handleModalOpen}
    >
      <S.Content color={label?.trim() ? "black" : "gray"}>
        {label ? label : defaultLanguage(placeholder)}
      </S.Content>
      <ChevronDownIcon css={S.chevronRight} />
    </S.FormModalButton>
  );
};

export default FormModalButton;
