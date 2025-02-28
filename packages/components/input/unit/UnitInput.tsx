import React, { useEffect, useRef, useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import { CURRENCY } from "@repo/constants/currency";
import type { Languages } from "@repo/types";

import * as S from "./UnitInput.styled";
import Input from "../Input";

interface UnitInputProps {
  className?: string;
  hasError?: boolean;
  maxLength?: number;
  value: string;
  placeholder?: Languages;
  disabled?: boolean;
  unit: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn<string>;
}

const UnitInput = ({
  className,
  placeholder,
  maxLength,
  hasError,
  value,
  disabled,
  unit,
  handleChange,
  register,
}: UnitInputProps) => {
  const unitRef = useRef<HTMLLabelElement | null>(null);

  const [unitOffsetWidth, setUnitOffsetWidth] = useState(0);

  useEffect(() => {
    if (!unitRef?.current) return;

    setUnitOffsetWidth(unitRef.current.offsetWidth);
  }, [unitRef]);

  return (
    <S.InputWrapper
      className={className}
      isCurrency={
        unit === CURRENCY.LAK.unit ||
        unit === CURRENCY.THB.unit ||
        unit === CURRENCY.USD.unit ||
        unit === "P"
      }
      hasError={hasError}
      disabled={disabled}
    >
      <S.Unit ref={unitRef}>{unit}</S.Unit>
      <Input
        css={S.input(unitOffsetWidth)}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        handleChange={handleChange}
        register={register}
      />
    </S.InputWrapper>
  );
};

export default UnitInput;
