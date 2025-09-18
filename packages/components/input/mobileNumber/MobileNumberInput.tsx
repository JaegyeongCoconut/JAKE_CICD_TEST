import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import type { Languages } from "@repo/types";

import * as S from "./MobileNumberInput.styled";
import DisabledInput from "../disabled/DisabledInput";
import FormInput from "../form/FormInput";

interface BaseMobileNumberInputProps {
  className?: string;
  dial: string;
  placeholder: Languages;
}

interface DisabledMobileNumberInputProps extends BaseMobileNumberInputProps {
  disabled: true;
  hasError?: never;
  maxLength?: never;
  register?: never;
}

interface AbledMobileNumberInputProps extends BaseMobileNumberInputProps {
  disabled: false;
  hasError: boolean;
  maxLength: number;
  register: UseFormRegisterReturn<string>;
}

function MobileNumberInput({
  className,
  disabled,
  hasError,
  dial,
  placeholder,
  maxLength,
  register,
}: DisabledMobileNumberInputProps | AbledMobileNumberInputProps) {
  return (
    <S.MobileNumberInputWrapper className={className}>
      <S.Dial>+{dial}</S.Dial>
      {disabled ? (
        <DisabledInput
          css={S.mobileNumberInput}
          value=""
          placeholder={placeholder}
        />
      ) : (
        <FormInput
          css={S.mobileNumberInput}
          disabled={disabled}
          hasError={hasError}
          maxLength={maxLength}
          placeholder={placeholder}
          register={register}
        />
      )}
    </S.MobileNumberInputWrapper>
  );
}

export default MobileNumberInput;
