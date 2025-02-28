import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./Input.styled";

interface InputProps {
  className?: string;
  // NOTE: 추후 on / off 될 수 있다 판단하여 props로 작성
  autoComplete?: "on" | "off";
  disabled?: boolean;
  hasError?: boolean;
  maxLength?: number;
  placeholder?: Languages;
  type?: "text" | "password";
  value?: string;
  register?: UseFormRegisterReturn<string>;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      className,
      disabled,
      autoComplete = "off",
      hasError = false,
      maxLength,
      placeholder,
      type = "text",
      value,
      register,
      handleBlur,
      handleChange,
      handleFocus,
      handleKeyDown,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();

    return (
      <S.Input
        className={className}
        ref={ref}
        aria-invalid={hasError}
        autoComplete={autoComplete}
        hasError={hasError}
        disabled={disabled}
        type={type}
        placeholder={placeholder && defaultLanguage(placeholder)}
        maxLength={maxLength}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...register}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
