import React from "react";

import { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./Textarea.styled";

interface TextareaProps {
  className?: string;
  isEnterKeyBlock?: boolean;
  maxLength: number;
  placeholder: Languages;
  value: string;
  register?: UseFormRegisterReturn<string>;
  disabled?: boolean;
}

const Textarea = ({
  className,
  isEnterKeyBlock = false,
  maxLength,
  placeholder,
  value,
  register,
  disabled,
}: TextareaProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (isEnterKeyBlock && e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <S.TextareaWrapper className={className} disabled={disabled}>
      <S.Textarea
        maxLength={maxLength}
        // NOTE: translation 결과 타입에 'null' 이 잡혀서 에러 발생
        placeholder={defaultLanguage(placeholder)!}
        disabled={disabled}
        {...register}
        onKeyDown={handleKeyDown}
      />
      <S.Length>{`${value?.length ?? 0}/${maxLength}`}</S.Length>
    </S.TextareaWrapper>
  );
};

export default Textarea;
