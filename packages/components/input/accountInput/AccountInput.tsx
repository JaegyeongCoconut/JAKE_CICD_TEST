import React, { useState } from "react";

import type { jsx } from "@emotion/react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { ReactComponent as EyeIcon } from "@repo/assets/icon/ic_eye.svg";
import { ReactComponent as EyeOffIcon } from "@repo/assets/icon/ic_eye_off.svg";
import type { Languages } from "@repo/types";

import * as S from "./AccountInput.styled";
import HeadlessAccountInput from "./HeadlessAccountInput";

interface AccountInputProps {
  className?: string;
  id: string;
  disabled: boolean;
  hasError: boolean;
  isDirty: boolean;
  label: Languages;
  maxLength: number;
  type: "text" | "email" | "password";
  register: UseFormRegisterReturn<string>;
}

const AccountInput = ({
  className,
  id,
  type,
  label,
  maxLength,
  disabled,
  isDirty,
  hasError,
  register,
}: AccountInputProps) => {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const renderIcon = (isShow: boolean): jsx.JSX.Element => {
    return isShow ? (
      <EyeIcon css={S.eyeIcon(isShow)} />
    ) : (
      <EyeOffIcon css={S.eyeIcon(isShow)} />
    );
  };
  const handleSetFocuseId = (id: string) => (): void => setFocusedId(id);

  return (
    <HeadlessAccountInput css={S.headlessAccountInput} className={className}>
      <HeadlessAccountInput.Label
        css={S.label(focusedId === id || isDirty)}
        id={id}
        label={label}
      />
      <HeadlessAccountInput.Input
        css={S.input(hasError)}
        disabled={disabled}
        maxLength={maxLength}
        type={type}
        register={register}
        handleFocus={handleSetFocuseId(id)}
      />
      {type === "password" && (
        <HeadlessAccountInput.Button css={S.button} renderIcon={renderIcon} />
      )}
    </HeadlessAccountInput>
  );
};

export default AccountInput;
