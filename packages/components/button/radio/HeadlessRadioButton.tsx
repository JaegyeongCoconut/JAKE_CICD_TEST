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
  disabled?: boolean;
  radio: RadioType<T, Languages>;
  radioState: T | null;
  handleRadioButtonClick?: (radio: T) => () => void;
};

const Content = <T extends string | number>({
  className,
  radioState,
  radio,
  disabled,
  handleRadioButtonClick,
}: ContentProps<T>) => {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <label className={className}>
      <input
        id={radio.key + uuid}
        name={uuid}
        checked={radioState === radio.key}
        disabled={disabled}
        type="radio"
        onChange={handleRadioButtonClick && handleRadioButtonClick(radio.key)}
      />
      <label htmlFor={radio.key + uuid} tabIndex={0} />
      {radio.Icon && <radio.Icon />}
      <span>{defaultLanguage(radio.label)}</span>
    </label>
  );
};

HeadlessRadioButton.Content = Content;

export default HeadlessRadioButton;
