import React, { useId } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, RadioType } from "@repo/types";

import * as S from "./FormRadioButton.styled";

interface RadioButtonProps<T extends string | number> {
  className?: string;
  disabled: boolean;
  radioList: readonly RadioType<T, Languages>[];
  register: UseFormRegisterReturn<string>;
}

const FormRadioButton = <T extends string | number>({
  className,
  disabled,
  radioList,
  register,
}: RadioButtonProps<T>) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.RadioWrapper className={className}>
      {radioList.map((item) => (
        <S.Label key={item.key} disabled={disabled}>
          <input
            id={item.key + uuid}
            disabled={disabled}
            value={item.key}
            type="radio"
            {...register}
          />
          <S.RadioButton htmlFor={item.key + uuid} tabIndex={0} />
          <span>{defaultLanguage({ text: item.label })}</span>
        </S.Label>
      ))}
    </S.RadioWrapper>
  );
};

export default FormRadioButton;
