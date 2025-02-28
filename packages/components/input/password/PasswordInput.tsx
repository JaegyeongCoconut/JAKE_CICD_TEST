import React, { useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import { EyeAbledIcon, EyeDisabledIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./PasswordInput.styled";

interface PasswordInputProps {
  hasError?: boolean;
  placeholder: Languages;
  register: UseFormRegisterReturn<string>;
}

const PasswordInput = ({
  hasError,
  placeholder,
  register,
}: PasswordInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const [isShow, setIsShow] = useState(false);

  const handleClick = (): void => {
    setIsShow(!isShow);
  };

  return (
    <>
      <S.PasswordInput
        // NOTE: translation 결과 타입에 'null' 이 잡혀서 에러 발생
        placeholder={defaultLanguage(placeholder)!}
        maxLength={20}
        type={isShow ? "text" : "password"}
        hasError={hasError}
        {...register}
      />
      <S.PasswordShowButton type="button" onClick={handleClick}>
        {isShow ? (
          <EyeAbledIcon css={S.eyeIcon(isShow)} />
        ) : (
          <EyeDisabledIcon css={S.eyeIcon(isShow)} />
        )}
      </S.PasswordShowButton>
    </>
  );
};

export default PasswordInput;
