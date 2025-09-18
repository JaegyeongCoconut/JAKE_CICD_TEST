import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import { ReactComponent as EyeIcon } from "@repo/assets/icon/ic_eye.svg";
import { ReactComponent as EyeOffIcon } from "@repo/assets/icon/ic_eye_off.svg";
import type { Languages } from "@repo/types";

import HeadlessPasswordInput from "./HeadlessPasswordInput";
import * as S from "./PasswordInput.styled";

interface PasswordInputProps {
  hasError: boolean;
  autoComplete: "on" | "off" | "new-password";
  placeholder: Languages;
  register: UseFormRegisterReturn<string>;
}

const PasswordInput = ({
  hasError,
  autoComplete,
  placeholder,
  register,
}: PasswordInputProps) => {
  const renderIcon = (isShow: boolean): React.ReactNode => {
    return isShow ? (
      <EyeIcon css={S.eyeIcon(isShow)} />
    ) : (
      <EyeOffIcon css={S.eyeIcon(isShow)} />
    );
  };

  return (
    <HeadlessPasswordInput css={S.headlessPasswordInput}>
      <HeadlessPasswordInput.Input
        css={S.passwordInput(hasError)}
        autoComplete={autoComplete ?? "on"}
        placeholder={placeholder}
        register={register}
      />
      <HeadlessPasswordInput.Button
        css={S.passwordButton}
        renderIcon={renderIcon}
      />
    </HeadlessPasswordInput>
  );
};

export default PasswordInput;
