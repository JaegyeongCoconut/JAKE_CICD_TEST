import React, { useState } from "react";

import { Control, Controller, Path, UseFormTrigger } from "react-hook-form";

import { EyeAbledIcon, EyeDisabledIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { GetVerifyCodeQueryModel } from "@repo/types";
import type {
  CreateNewPasswordFormType,
  Languages,
  LoginFormType,
  VerificationType,
} from "@repo/types";
import { numericOnly } from "@repo/utils/formatter/number";

import * as S from "./AccountInput.styled";

type AccountInputFormType =
  | LoginFormType
  | GetVerifyCodeQueryModel
  | VerificationType
  | CreateNewPasswordFormType;

interface AccountInputProps<T extends AccountInputFormType> {
  className?: string;
  id: string;
  control: Control<T>;
  name: Path<T>;
  label: Languages;
  type: "text" | "password";
  hasError: boolean;
  trigger: UseFormTrigger<T>;
  hasTrim: boolean;
  disabled?: boolean;
  maxLength?: number;
}

const AccountInput = <T extends AccountInputFormType>({
  className,
  id,
  label,
  hasError,
  type,
  control,
  name,
  disabled,
  hasTrim,
  maxLength = 100,
  trigger,
}: AccountInputProps<T>) => {
  const [focusedId, setFocusedId] = useState("");
  const [isShow, setIsShow] = useState(false);

  const { defaultLanguage } = useDefaultLanguage();

  const inputType =
    type === "password" ? (isShow ? "text" : "password") : "text";

  const handleSetFocuseId = (id: string) => (): void => setFocusedId(id);
  const handleClick = (): void => setIsShow(!isShow);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleOnChange = (
          e: React.ChangeEvent<HTMLInputElement>,
        ): void => {
          onChange(e.target.value);
          trigger(name);
        };

        const handleOnBlur = (): void => {
          setFocusedId("");
          trigger(name);
        };

        return (
          <S.AccountInputWrapper className={className}>
            <S.AccountInputLabel
              htmlFor={id}
              isLabelTop={focusedId === id || !!value}
            >
              {defaultLanguage(label)}
            </S.AccountInputLabel>
            <S.AccountInput
              id={id}
              type={inputType}
              value={
                name === "verificationCode"
                  ? numericOnly(value)
                  : hasTrim
                    ? value.trim()
                    : value
              }
              disabled={disabled}
              maxLength={maxLength}
              autoComplete={type === "text" ? "true" : "false"}
              hasError={hasError}
              onFocus={handleSetFocuseId(id)}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            {type === "password" && (
              <S.PasswordShowButton type="button" onClick={handleClick}>
                {isShow ? (
                  <EyeAbledIcon css={S.eyeIcon(isShow)} />
                ) : (
                  <EyeDisabledIcon css={S.eyeIcon(isShow)} />
                )}
              </S.PasswordShowButton>
            )}
          </S.AccountInputWrapper>
        );
      }}
    />
  );
};

export default AccountInput;
