import React, { useEffect, useRef, useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import { CURRENCY } from "@repo/constants/currency";
import type { Languages } from "@repo/types";

import * as S from "./UnitInput.styled";
import DisabledInput from "../disabled/DisabledInput";
import FormInput from "../form/FormInput";

interface BaseUintInputProps {
  className?: string;
  placeholder: Languages;
  unit: string;
}

interface UnitInputWithValueProps extends BaseUintInputProps {
  disabled: true;
  hasError?: never;
  value: string;
  maxLength?: never;
  register?: never;
}

interface UnitInputWithoutValueProps extends BaseUintInputProps {
  disabled: boolean;
  hasError: boolean;
  value?: never;
  maxLength: number;
  register: UseFormRegisterReturn<string>;
}

const UnitInput = ({
  className,
  placeholder,
  maxLength,
  hasError,
  value,
  disabled,
  unit,
  register,
}: UnitInputWithValueProps | UnitInputWithoutValueProps) => {
  const unitRef = useRef<HTMLLabelElement | null>(null);

  const [unitOffsetWidth, setUnitOffsetWidth] = useState(0);

  useEffect(() => {
    if (!unitRef?.current) return;

    setUnitOffsetWidth(unitRef.current.offsetWidth);
  }, [unitRef]);

  return (
    <S.InputWrapper
      className={className}
      disabled={disabled}
      hasError={hasError}
      isCurrency={
        unit === CURRENCY.LAK.unit ||
        unit === CURRENCY.THB.unit ||
        unit === CURRENCY.USD.unit ||
        unit === "P"
      }
    >
      <S.Unit ref={unitRef}>{unit}</S.Unit>
      {disabled ? (
        <DisabledInput
          css={S.input(unitOffsetWidth)}
          value={value ?? ""}
          placeholder={placeholder}
        />
      ) : (
        <FormInput
          css={S.input(unitOffsetWidth)}
          disabled={disabled}
          hasError={false}
          maxLength={maxLength}
          placeholder={placeholder}
          register={register}
        />
      )}
    </S.InputWrapper>
  );
};

export default UnitInput;
