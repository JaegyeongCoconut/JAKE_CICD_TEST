import React, { useId } from "react";

import * as S from "./Checkbox.styled";

interface CheckboxProps {
  className?: string;
  label?: string;
  disabled?: boolean;
  isChecked?: boolean;
  handleCheck?: () => void;
}

const Checkbox = ({
  className,
  label,
  isChecked = false,
  disabled = false,
  handleCheck,
}: CheckboxProps) => {
  const uuid = useId();

  return (
    <S.Wrapper className={className}>
      <S.Label disabled={disabled} hasSubLabel={false}>
        <input
          type="checkbox"
          id={uuid}
          disabled={disabled}
          checked={isChecked}
          readOnly
          onChange={handleCheck}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        <span>{label}</span>
      </S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
