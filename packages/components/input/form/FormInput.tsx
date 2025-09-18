import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import type { Languages } from "@repo/types";

import * as S from "./FormInput.styled";
import HeadlessFormInput from "./HeadlessFormInput";

interface FormInputProps {
  className?: string;
  disabled: boolean;
  hasError: boolean;
  maxLength: number;
  placeholder: Languages;
  register: UseFormRegisterReturn<string>;
}

const FormInput = ({
  className,
  disabled,
  hasError,
  maxLength,
  placeholder,
  register,
}: FormInputProps) => {
  return (
    <HeadlessFormInput
      css={S.input(hasError)}
      className={className}
      disabled={disabled}
      inputMode="text"
      maxLength={maxLength}
      placeholder={placeholder}
      register={register}
    />
  );
};

export default FormInput;
