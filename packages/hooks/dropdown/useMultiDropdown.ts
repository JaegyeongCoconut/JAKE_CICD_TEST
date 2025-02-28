import { useRef, useState } from "react";

import useKeyTrap from "../modal/useKeyTrap";
import useOnClickOutside from "../useOnClickOutside";

const useMultiDropdown = (handleSelect: (value: string) => void) => {
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOptionClick = (selectedKey: string) => (): void => {
    handleSelect(selectedKey);
  };

  const handleOpener = (): void => {
    isOpen ? handleClose() : handleOpen();
  };

  useOnClickOutside(dropdownRef, handleClose);
  useKeyTrap(optionsRef, handleClose);

  return { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick };
};

export default useMultiDropdown;
