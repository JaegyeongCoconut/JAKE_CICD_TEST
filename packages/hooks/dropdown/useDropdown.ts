import React, { useEffect, useRef, useState } from "react";

import useKeyTrap from "../modal/useKeyTrap";
import useOnClickOutside from "../useOnClickOutside";

const useDropdown = (
  selectedValue: string,
  handleSelect?: (value: string) => void,
  handleConditionFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void,
  handleConditionBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void,
) => {
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOptionClick = (key: string) => (): void => {
    if (handleSelect && key !== selectedValue) {
      handleSelect(key);
    }

    handleClose();
  };

  const handleOpener = (): void => {
    isOpen ? handleClose() : handleOpen();
  };

  useOnClickOutside(dropdownRef, handleClose);
  useKeyTrap(optionsRef, handleClose);

  useEffect(() => {
    if (isOpen) {
      handleConditionFocus && handleConditionFocus();
    } else {
      handleConditionBlur && handleConditionBlur();
    }
  }, [isOpen]);

  return {
    dropdownRef,
    optionsRef,
    isOpen,
    handleOpener,
    handleOptionClick,
  };
};

export default useDropdown;
