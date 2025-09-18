import type { FocusEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import useKeyTrap from "../modal/useKeyTrap";
import useOnClickOutside from "../useOnClickOutside";

interface UseDropdownProps {
  tagValue: string;
  handleConditionBlur: ((e?: FocusEvent<HTMLInputElement>) => void) | undefined;
  handleConditionFocus:
    | ((e?: FocusEvent<HTMLInputElement>) => void)
    | undefined;
  handleSelect: ((value: string) => void) | undefined; // TODO: Dropdown 컴포넌트의 handleSelct가 optional이라 requried로 변경할 수 없음
}

const useDropdown = ({
  tagValue,
  handleSelect,
  handleConditionFocus,
  handleConditionBlur,
}: UseDropdownProps) => {
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
