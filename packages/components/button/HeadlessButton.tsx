import type { MouseEvent } from "react";
import React, { useEffect, useRef } from "react";

import type { jsx } from "@emotion/react";

interface HeadlessButtonProps {
  className?: string;
  disabled: boolean;
  isLoading: boolean;
  type?: "button" | "submit";
  handleButtonClick: (e: MouseEvent) => void;
  handleButtonMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: jsx.JSX.Element;
}

const HeadlessButton = ({
  className,
  disabled,
  isLoading = false,
  children,
  type = "button",
  handleButtonClick,
  handleButtonMouseDown,
}: HeadlessButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isLoading && document.activeElement === buttonRef.current) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isLoading]);

  return (
    <button
      className={className}
      ref={buttonRef}
      disabled={disabled}
      tabIndex={isLoading ? -1 : 0}
      type={type}
      onClick={handleButtonClick}
      onMouseDown={handleButtonMouseDown}
    >
      {children}
    </button>
  );
};

export default HeadlessButton;
