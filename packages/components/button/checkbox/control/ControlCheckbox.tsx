import React, { useId } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { Languages } from "@repo/types";

import * as S from "../Checkbox.styled";

interface ControlCheckboxProps {
  className?: string;
  isChecked?: boolean;
  disabled?: boolean;
  label: Languages;
  subLabel?: string; // NOTE: 브랜치 code의 string을 받기 위해 Languages 타입이 아닌 string 지정
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlCheckbox = ({
  className,
  isChecked,
  disabled,
  label,
  subLabel,
  onBlur,
  onChange,
}: ControlCheckboxProps) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper className={className}>
      <S.Label disabled={disabled} hasSubLabel={!!subLabel}>
        <input
          type="checkbox"
          id={uuid}
          disabled={disabled}
          checked={isChecked}
          readOnly
          onChange={onChange}
          onBlur={onBlur}
        />
        <S.Checkbox htmlFor={uuid} tabIndex={0} />
        <S.CheckboxLabelWrapper>
          {subLabel && <S.SubLabel>{subLabel}</S.SubLabel>}
          <span>{defaultLanguage(label)}</span>
        </S.CheckboxLabelWrapper>
      </S.Label>
    </S.Wrapper>
  );
};

export default ControlCheckbox;
