import type { ChangeEvent } from "react";
import React, { useId } from "react";

import * as S from "./Checkbox.styled";

interface BaseCheckboxProps {
  className?: string;
  label?: string;
}

interface DisabledCheckboxProps extends BaseCheckboxProps {
  disabled: true;
  isChecked?: never;
  handleCheck?: never;
}

interface EnabledCheckboxProps extends BaseCheckboxProps {
  disabled: boolean;
  isChecked: boolean;
  handleCheck: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  className,
  label,
  isChecked,
  disabled,
  handleCheck,
}: DisabledCheckboxProps | EnabledCheckboxProps) => {
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
          onChange={handleCheck}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        {label && <span>{label}</span>}
      </S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
