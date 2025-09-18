import React from "react";

import type { Languages } from "@repo/types";

import HeadlessInput from "./HeadlessInput";
import * as S from "./Input.styled";

interface InputProps {
  className?: string;
  disabled: boolean;
  hasError: boolean;
  value: string;
  maxLength: number;
  placeholder: Languages;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  className,
  disabled,
  hasError,
  maxLength,
  placeholder,
  value,
  handleBlur,
  handleChange,
  handleFocus,
}: InputProps) => {
  return (
    <HeadlessInput
      css={S.input(hasError)}
      className={className}
      disabled={disabled}
      value={value}
      autoComplete="off"
      inputMode="text"
      maxLength={maxLength}
      placeholder={placeholder}
      type="text"
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleFocus={handleFocus || (() => {})}
    />
  );
};

export default Input;
