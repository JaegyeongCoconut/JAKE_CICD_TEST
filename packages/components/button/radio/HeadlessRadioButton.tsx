import type { ReactElement } from "react";
import React, { useId } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, RadioType } from "@repo/types";

interface HeadlessRadioButtonProps<T extends string | number> {
  className?: string;
  radioList: readonly RadioType<T, Languages>[];
  renderRadioButtonItem: (
    radio: RadioType<T, Languages>,
  ) => ReactElement<typeof Content>;
}

const HeadlessRadioButton = <T extends string | number>({
  className,
  radioList,
  renderRadioButtonItem,
}: HeadlessRadioButtonProps<T>) => {
  return (
    <ul className={className}>
      {radioList.map((radio) => (
        <li key={radio.key}>{renderRadioButtonItem(radio)}</li>
      ))}
    </ul>
  );
};

type ContentProps<T extends string | number> = {
  className?: string;
  disabled: boolean;
  radio: RadioType<T, Languages>;
  radioState: T | null;
  handleRadioButtonClick: (radio: T) => () => void;
};

const Content = <T extends string | number>({
  className,
  disabled,
  radio,
  radioState,
  handleRadioButtonClick,
}: ContentProps<T>) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  const handleChange = (): void => {
    if (!handleRadioButtonClick) return;

    handleRadioButtonClick(radio.key)();
  };

  return (
    <label className={className}>
      <input
        id={radio.key + uuid}
        name={uuid}
        checked={radioState === radio.key}
        disabled={disabled}
        type="radio"
        onChange={handleChange}
      />
      <label htmlFor={radio.key + uuid} tabIndex={0} />
      {radio.Icon && <radio.Icon />}
      <span>{defaultLanguage({ text: radio.label })}</span>
    </label>
  );
};

HeadlessRadioButton.Content = Content;

export default HeadlessRadioButton;
