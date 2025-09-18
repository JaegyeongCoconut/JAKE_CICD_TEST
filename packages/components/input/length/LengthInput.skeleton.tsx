import React from "react";

import type { Languages } from "@repo/types";

import * as S from "./LengthInput.styled";
import DisabledInput from "../disabled/DisabledInput";

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
      <DisabledInput value="" placeholder={placeholder} />
      <label>{`${valueLength ?? 0}/${maxLength}`}</label>
    </S.Wrapper>
  );
};

export default LengthInputSkeleton;
