import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import type { Languages } from "@repo/types";

import * as S from "./MobileNumberInput.styled";
import Input from "../Input";

export interface MobileNumberInputProps {
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  dial: string;
  placeholder: Languages;
  maxLength?: number;
  // TODO: 추후 모두 필수로 변경할 것
  value?: string;
  register: UseFormRegisterReturn<string>;
}

function MobileNumberInput({
  className,
  disabled,
  hasError,
  dial,
  placeholder,
  value,
  maxLength = 15,
  register,
}: MobileNumberInputProps) {
  return (
    <S.MobileNumberInputWrapper className={className}>
      <S.Dial>+{dial}</S.Dial>
      <Input
        css={S.mobileNumberInput}
        value={value}
        hasError={hasError}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        register={register}
      />
    </S.MobileNumberInputWrapper>
  );
}

export default MobileNumberInput;
