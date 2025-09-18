import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DisabledInput.styled";

interface DisabledInputProps {
  className?: string;
  value: string;
  placeholder: Languages;
}

const DisabledInput = ({
  className,
  placeholder,
  value,
}: DisabledInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Input
      className={className}
      disabled
      value={value}
      placeholder={defaultLanguage(placeholder)}
    />
  );
};

export default DisabledInput;
