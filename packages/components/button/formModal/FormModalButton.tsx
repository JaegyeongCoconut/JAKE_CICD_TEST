import React from "react";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./FormModalButton.styled";

interface FormModalButtonProps {
  className?: string;
  disabled: boolean;
  hasError: boolean;
  label: string;
  placeholder: Languages;
  handleModalOpen: () => void;
}

const FormModalButton = ({
  className,
  hasError,
  label,
  placeholder,
  disabled,
  handleModalOpen,
}: FormModalButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.FormModalButton
      className={className}
      disabled={disabled}
      hasError={hasError}
      type="button"
      onClick={handleModalOpen}
    >
      <S.Content color={label?.trim() ? "black" : "gray"}>
        {label ? label : defaultLanguage(placeholder)}
      </S.Content>
      <DownIcon css={S.chevronRight} />
    </S.FormModalButton>
  );
};

export default FormModalButton;
