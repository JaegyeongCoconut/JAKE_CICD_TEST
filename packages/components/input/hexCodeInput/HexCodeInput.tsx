import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import Input from "../Input";
import * as S from "./HexCodeInput.styled";
import ErrorMessage from "../../message/ErrorMessage";

interface HexCodeInputProps {
  className?: string;
  value: string;
  hasError: boolean;
  errorMessage?: string;
  register: UseFormRegisterReturn<string>;
}

const HexCodeInput = ({
  className,
  value,
  hasError,
  errorMessage,
  register,
}: HexCodeInputProps) => {
  return (
    <S.HexCodeInputWrapper className={className}>
      <S.BackgroundColorBox color={value} hasColor={value.length === 6} />
      <S.HexCodeInputContent>
        <S.HexCodeUnit>#</S.HexCodeUnit>
        <Input
          css={S.input}
          maxLength={6}
          placeholder="Enter hex color codes (6 characters)"
          value={value}
          hasError={hasError}
          register={register}
        />
        {errorMessage && (
          <ErrorMessage css={S.errorMessage} message={errorMessage} />
        )}
      </S.HexCodeInputContent>
    </S.HexCodeInputWrapper>
  );
};

export default HexCodeInput;
