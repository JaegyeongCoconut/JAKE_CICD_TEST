import React from "react";

import type { Languages, RadioType } from "@repo/types";

import HeadlessRadioButton from "./HeadlessRadioButton";
import * as S from "./RadioButton.styled";

interface RadioButtonProps<T extends string | number> {
  className?: string;
  disabled?: boolean;
  radioList: readonly RadioType<T, Languages>[];
  radioState: T | null;
  handleRadioButtonClick?: (key: T) => () => void;
}

const RadioButton = <T extends string | number>({
  className,
  disabled,
  radioList,
  radioState,
  handleRadioButtonClick,
}: RadioButtonProps<T>) => {
  return (
    <HeadlessRadioButton
      css={S.radioButton}
      className={className}
      radioList={radioList}
      renderRadioButtonItem={(radio: RadioType<T, Languages>) => (
        <HeadlessRadioButton.Content
          css={S.content(disabled)}
          disabled={disabled}
          radio={radio}
          radioState={radioState}
          handleRadioButtonClick={handleRadioButtonClick}
        />
      )}
    />
  );
};

export default RadioButton;
