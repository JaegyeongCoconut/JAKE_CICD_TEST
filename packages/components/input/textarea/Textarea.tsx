import type { ChangeEvent, FocusEvent } from "react";
import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./Textarea.styled";

interface BaseTextareaProps {
  className?: string;
  maxLength: number;
  placeholder: Languages;
}

interface DisabledTextareaProps extends BaseTextareaProps {
  disabled: true;
  isEnterKeyBlock?: never;
  value?: string; // NOTE: car admin에서 isApp 상태에 따라 분기하는 코드가 있어 never로 타입 지정 못함
  handleBlur?: never;
  handleChange?: never;
}

interface AbledTextareaProps extends BaseTextareaProps {
  disabled: false;
  isEnterKeyBlock: boolean;
  value: string | undefined;
  handleBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  className,
  isEnterKeyBlock,
  maxLength,
  placeholder,
  value,
  disabled,
  handleChange,
  handleBlur,
}: DisabledTextareaProps | AbledTextareaProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (isEnterKeyBlock && e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <S.TextareaWrapper className={className} disabled={disabled}>
      <S.Textarea
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        // NOTE: translation 결과 타입에 'null' 이 잡혀서 에러 발생
        placeholder={defaultLanguage(placeholder)!}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <S.Length>{`${value?.length ?? 0}/${maxLength}`}</S.Length>
    </S.TextareaWrapper>
  );
};

export default Textarea;
