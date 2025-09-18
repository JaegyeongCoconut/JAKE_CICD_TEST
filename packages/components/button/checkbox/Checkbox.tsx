import type { ChangeEvent } from "react";
import React, { useId } from "react";

import * as S from "./Checkbox.styled";

interface CheckboxProps {
  className?: string;
  disabled?: boolean;
  isChecked?: boolean;
  label?: string;
  handleCheck?: (e: ChangeEvent<HTMLInputElement>) => void;
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
          id={uuid}
          checked={isChecked}
          disabled={disabled}
          readOnly
          type="checkbox"
          onChange={handleCheck}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        {/* TODO: label이 없을 경우 span 비가시화 처리 조건 필요 */}
        <span>{label}</span>
      </S.Label>
    </S.Wrapper>
  );
};

export default Checkbox;
