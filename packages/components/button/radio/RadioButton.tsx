import React, { useId } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, RadioType } from "@repo/types";

import * as S from "./RadioButton.styled";

interface CommonRadioButton<T extends string | number> {
  className?: string;
  disabled?: boolean;
  radioList: readonly RadioType<T, Languages>[];
  radioState: T | null;
  desc?: Languages;
  checkDisabledStatus?: (key: T) => boolean;
  handleRadioButtonClick?: (key: T) => () => void;
}

interface DisabledRadioButton<T extends string | number>
  extends CommonRadioButton<T> {
  disabled?: boolean;
  checkDisabledStatus?: never;
}

interface CheckDisabledRadioButton<T extends string | number>
  extends CommonRadioButton<T> {
  disabled?: never;
  checkDisabledStatus?: (key: T) => boolean;
}

type RadioButtonProps<T extends string | number> =
  | DisabledRadioButton<T>
  | CheckDisabledRadioButton<T>;

const RadioButton = <T extends string | number>({
  className,
  disabled,
  radioList,
  radioState,
  desc,
  checkDisabledStatus,
  handleRadioButtonClick,
}: RadioButtonProps<T>) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <>
      <S.RadioWrapper className={className}>
        {radioList.map((item) => (
          <S.Label
            key={item.key}
            disabled={
              checkDisabledStatus ? checkDisabledStatus(item.key) : disabled
            }
          >
            <input
              type="radio"
              disabled={
                checkDisabledStatus ? checkDisabledStatus(item.key) : disabled
              }
              checked={radioState === item.key}
              name={uuid}
              id={item.key + uuid}
              onChange={
                handleRadioButtonClick && handleRadioButtonClick(item.key)
              }
            />
            <S.RadioButton htmlFor={item.key + uuid} tabIndex={0} />
            <span>{defaultLanguage(item.label)}</span>
          </S.Label>
        ))}
      </S.RadioWrapper>
      {desc && <S.Desc> {defaultLanguage(desc)}</S.Desc>}
    </>
  );
};

export default RadioButton;
