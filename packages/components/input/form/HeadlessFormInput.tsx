import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

interface HeadlessFormInputProps {
  className?: string;
  disabled: boolean;
  inputMode: "text" | "numeric";
  maxLength: number;
  placeholder: Languages;
  register: UseFormRegisterReturn<string>;
}

const HeadlessFormInput = ({
  className,
  inputMode,
  disabled,
  maxLength,
  placeholder,
  register,
}: HeadlessFormInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <input
      className={className}
      disabled={disabled}
      autoComplete="off"
      inputMode={inputMode}
      maxLength={maxLength}
      placeholder={defaultLanguage({ text: placeholder })}
      type="text"
      {...register}
    />
  );
};

export default HeadlessFormInput;
