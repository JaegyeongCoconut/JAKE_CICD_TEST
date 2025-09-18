import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

interface useStateSearchInputProps {
  accessibleInputType: RegExp | undefined;
  handleReset: () => void;
  handleUpdate: (input: string) => void;
}

const useStateSearchInput = ({
  accessibleInputType,
  handleUpdate,
  handleReset,
}: useStateSearchInputProps) => {
  const [stateInput, setStateInput] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    value = accessibleInputType
      ? value.replaceAll(accessibleInputType, "")
      : value;
    setStateInput(value);
  };

  const handleInputReset = (): void => {
    setStateInput("");
    handleUpdate("");
    handleReset && handleReset();
  };

  const handleSearch = (e: FormEvent): void => {
    e.preventDefault();

    handleUpdate(stateInput);
  };

  return { stateInput, handleInputChange, handleInputReset, handleSearch };
};

export default useStateSearchInput;
