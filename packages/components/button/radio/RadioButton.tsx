import React from "react";

import type { Languages, RadioType } from "@repo/types";

import HeadlessRadioButton from "./HeadlessRadioButton";
import * as S from "./RadioButton.styled";

interface RadioButtonProps<T extends string | number> {
  className?: string;
  radioList: readonly RadioType<T, Languages>[];
  radioState: T | null;
}

interface DisabledRadioButtonProps<T extends string | number>
  extends RadioButtonProps<T> {
  disabled: true;
  handleRadioButtonClick?: never;
}

interface EnabledRadioButtonProps<T extends string | number>
  extends RadioButtonProps<T> {
  disabled: false;
  handleRadioButtonClick: (key: T) => () => void;
}

const RadioButton = <T extends string | number>({
  className,
  disabled,
  radioList,
  radioState,
  handleRadioButtonClick,
}: DisabledRadioButtonProps<T> | EnabledRadioButtonProps<T>) => {
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
          handleRadioButtonClick={handleRadioButtonClick || (() => () => {})}
        />
      )}
    />
  );
};

export default RadioButton;
