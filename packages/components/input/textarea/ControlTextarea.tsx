import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./Textarea.styled";

interface TextareaProps {
  className?: string;
  isEnterKeyBlock?: boolean;
  maxLength: number;
  placeholder: Languages;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOnBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const ControlTextarea = ({
  className,
  isEnterKeyBlock = false,
  maxLength,
  placeholder,
  value,
  handleOnChange,
  handleOnBlur,
}: TextareaProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (isEnterKeyBlock && e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <S.TextareaWrapper className={className}>
      <S.Textarea
        maxLength={maxLength}
        // NOTE: translation 결과 타입에 'null' 이 잡혀서 에러 발생
        value={value}
        placeholder={defaultLanguage(placeholder)!}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
      />
      <S.Length>{`${value?.length ?? 0}/${maxLength}`}</S.Length>
    </S.TextareaWrapper>
  );
};

export default ControlTextarea;
