import React from "react";

import type { Languages } from "@repo/types";

import * as S from "./LengthInput.styled";
import Input from "../Input";

interface LengthInputProps {
  className?: string;
  maxLength: number;
  placeholder: Languages;
  valueLength: number;
}

const LengthInputSkeleton = ({
  className,
  maxLength,
  placeholder,
  valueLength,
}: LengthInputProps) => {
  return (
    <S.Wrapper className={className}>
      <Input maxLength={maxLength} placeholder={placeholder} />
      <label>{`${valueLength ?? 0}/${maxLength}`}</label>
    </S.Wrapper>
  );
};

export default LengthInputSkeleton;
