import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import type { Languages } from "@repo/types";

import * as S from "./LengthInput.styled";
import Input from "../Input";

interface LengthInputProps {
  className?: string;
  hasError?: boolean;
  maxLength: number;
  placeholder: Languages;
  valueLength: number;
  register: UseFormRegisterReturn<string>;
}

const LengthInput = ({
  className,
  hasError,
  maxLength,
  placeholder,
  valueLength,
  register,
}: LengthInputProps) => {
  return (
    <S.Wrapper className={className}>
      <Input
        hasError={hasError}
        maxLength={maxLength}
        placeholder={placeholder}
        register={register}
      />
      <label>{`${valueLength ?? 0}/${maxLength}`}</label>
    </S.Wrapper>
  );
};

export default LengthInput;
