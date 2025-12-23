import { useCallback, useRef, useState } from "react";

import useKeyTrap from "../modal/useKeyTrap";
import useOnClickOutside from "../useOnClickOutside";

interface UseDropdownProps {
  tagValue: string;
  handleSelect: ((value: string) => void) | undefined;
}

const useDropdown = ({ tagValue, handleSelect }: UseDropdownProps) => {
  const dropdownRef = useRef(null);

  const [optionsElement, setOptionsElement] = useState<HTMLElement | null>(
    null,
  );

  const optionsRef = useCallback((element: HTMLElement | null) => {
    setOptionsElement(element);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOptionClick = (key: string) => (): void => {
    if (handleSelect && key !== tagValue) {
      handleSelect(key);
    }

    handleClose();
  };

  const handleOpener = (): void => {
    isOpen ? handleClose() : handleOpen();
  };

  useOnClickOutside({
    ref: dropdownRef,
    handler: handleClose,
    exceptEl: undefined,
  });

  useKeyTrap(optionsElement, handleClose);

  return {
    dropdownRef,
    optionsRef,
    isOpen,
    handleOpener,
    handleOptionClick,
  };
};

export default useDropdown;
