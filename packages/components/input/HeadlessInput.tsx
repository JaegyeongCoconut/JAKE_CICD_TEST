import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

interface HeadlessInputProps {
  className?: string;
  disabled: boolean;
  value: string;
  autoComplete: "on" | "off";
  inputMode: "text" | "tel";
  maxLength: number;
  placeholder: Languages;
  type: "text" | "tel";
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const HeadlessInput = ({
  className,
  type,
  inputMode,
  autoComplete,
  disabled,
  maxLength,
  placeholder,
  value,
  handleBlur,
  handleChange,
  handleFocus,
}: HeadlessInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <input
      className={className}
      disabled={disabled}
      value={value}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      placeholder={defaultLanguage({ text: placeholder })}
      type={type}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );
};

export default HeadlessInput;
