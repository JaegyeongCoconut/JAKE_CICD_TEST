import React, { useId } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import * as S from "../Checkbox.styled";

interface RegisterCheckboxProps {
  className?: string;
  disabled?: boolean;
  isChecked?: boolean;
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

  return (
    <S.Wrapper className={className}>
      <S.Label disabled={disabled} hasSubLabel={false}>
        <input
          id={uuid}
          checked={isChecked}
          disabled={disabled}
          readOnly
          type="checkbox"
          {...register}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        <span>{label}</span>
      </S.Label>
    </S.Wrapper>
  );
};

export default RegisterCheckbox;
