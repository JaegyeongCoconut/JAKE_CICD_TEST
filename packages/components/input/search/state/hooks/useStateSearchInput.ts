import React, { useState } from "react";

const useStateSearchInput = (
  updateValue: (input: string) => void,
  resetValue?: () => void,
  accessibleInputType?: RegExp,
) => {
  const [stateInput, setStateInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    value = accessibleInputType
      ? value.replaceAll(accessibleInputType, "")
      : value;
    setStateInput(value);
  };

  const handleInputReset = (): void => {
    setStateInput("");
    updateValue("");
    resetValue && resetValue();
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();

    updateValue(stateInput);
  };

  return { stateInput, handleInputChange, handleInputReset, handleSearch };
};

export default useStateSearchInput;
