import React from "react";

import type { Languages } from "@repo/types";

import SearchInput from "../SearchInput";
import useStateSearchInput from "./hooks/useStateSearchInput";

interface StateSearchInputProps {
  className?: string;
  accessibleInputType: RegExp | undefined;
  maxLength: number;
  placeholder: Languages;
  handleReset: () => void;
  handleUpdate: (input: string) => void;
}

const StateSearchInput = ({
  className,
  placeholder,
  maxLength,
  accessibleInputType,
  handleUpdate,
  handleReset,
}: StateSearchInputProps) => {
  const { stateInput, handleInputChange, handleInputReset, handleSearch } =
    useStateSearchInput({ accessibleInputType, handleUpdate, handleReset });

  return (
    <SearchInput
      className={className}
      disabled={false}
      value={stateInput}
      maxLength={maxLength}
      placeholder={placeholder}
      handleInputChange={handleInputChange}
      handleInputReset={handleInputReset}
      handleSearch={handleSearch}
    />
  );
};

export default StateSearchInput;
