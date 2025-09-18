import type { ChangeEvent, FocusEvent } from "react";
import React from "react";

import type { Languages } from "@repo/types";

import * as S from "./LengthInput.styled";
import Input from "../Input";

interface LengthInputProps {
  className?: string;
  hasError: boolean;
  value: string | undefined;
  maxLength: number;
  placeholder: Languages;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LengthInput = ({
  className,
  hasError,
  maxLength,
  placeholder,
  value,
  handleChange,
  handleBlur,
}: LengthInputProps) => {
  return (
    <S.Wrapper className={className}>
      <Input
        disabled={false}
        hasError={hasError}
        value={value ?? ""}
        maxLength={maxLength}
        placeholder={placeholder}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <label>{`${value?.length ?? 0}/${maxLength}`}</label>
    </S.Wrapper>
  );
};

export default LengthInput;
