import React, { useId } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "../Checkbox.styled";

interface RegisterCheckboxProps {
  className?: string;
  isChecked?: boolean;
  disabled?: boolean;
  label: string;
  register: UseFormRegisterReturn<string>;
}

const RegisterCheckbox = ({
  className,
  disabled = false,
  isChecked = false,
  register,
  label,
}: RegisterCheckboxProps) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper className={className}>
      <S.Label disabled={disabled} hasSubLabel={false}>
        <input
          type="checkbox"
          id={uuid}
          disabled={disabled}
          checked={isChecked}
          readOnly
          {...register}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        <span>{label}</span>
      </S.Label>
    </S.Wrapper>
  );
};

export default RegisterCheckbox;
