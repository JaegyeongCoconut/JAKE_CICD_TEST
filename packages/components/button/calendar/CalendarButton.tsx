import React from "react";

import useDialog from "@repo/hooks/modal/useDialog";

import * as S from "./CalendarButton.styled";

interface CalendarButtonProps {
  className?: string;
  disabled: boolean;
  onPopup: (
    ref: React.RefObject<HTMLDialogElement>,
    isOpen: boolean,
    handleDialogClose: () => void,
  ) => void;
  children: React.ReactNode;
}

const CalendarButton = React.forwardRef<HTMLButtonElement, CalendarButtonProps>(
  ({ className, children, disabled, onPopup }, ref) => {
    const { isDialogOpen, dialogRef, handleToggleDialog, handleDialogClose } =
      useDialog({ disabled });

    return (
      <>
        <S.CalendarButton
          className={className}
          ref={ref}
          onClick={handleToggleDialog}
        >
          {children}
        </S.CalendarButton>
        {typeof onPopup === "function" &&
          !disabled &&
          onPopup(dialogRef, isDialogOpen, handleDialogClose)}
      </>
    );
  },
);

CalendarButton.displayName = "CalendarButton";

export default CalendarButton;
