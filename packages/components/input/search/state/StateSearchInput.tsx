import React from "react";

import type { Languages } from "@repo/types";

import SearchInput from "../SearchInput";
import useStateSearchInput from "./hooks/useStateSearchInput";

interface StateSearchInputProps {
  className?: string;
  inputAsidePadding: number;
  iconAsidePadding: number;
  placeholder: Languages;
  maxLength?: number;
  accessibleInputType?: RegExp;
  updateValue: (input: string) => void;
  resetValue?: () => void;
}
const StateSearchInput = ({
  className,
  inputAsidePadding,
  iconAsidePadding,
  placeholder,
  maxLength,
  accessibleInputType,
  updateValue,
  resetValue,
}: StateSearchInputProps) => {
  const { stateInput, handleInputChange, handleInputReset, handleSearch } =
    useStateSearchInput(updateValue, resetValue, accessibleInputType);

  return (
    <SearchInput
      className={className}
      inputAsidePadding={inputAsidePadding}
      iconAsidePadding={iconAsidePadding}
      value={stateInput}
      placeholder={placeholder}
      maxLength={maxLength}
      handleInputChange={handleInputChange}
      handleInputReset={handleInputReset}
      handleSearch={handleSearch}
    />
  );
};

export default StateSearchInput;
