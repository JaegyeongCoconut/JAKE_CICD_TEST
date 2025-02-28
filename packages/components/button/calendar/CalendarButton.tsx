import React, { useEffect } from "react";

import useDialog from "@repo/hooks/modal/useDialog";

import * as S from "./CalendarButton.styled";

interface CalendarButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  handleOpen?: (state: boolean) => void;
  popup: (
    ref: React.RefObject<HTMLDialogElement>,
    isOpen: boolean,
    handleDialogClose: () => void,
  ) => void;
}

const CalendarButton = React.forwardRef<HTMLButtonElement, CalendarButtonProps>(
  ({ className, children, disabled, handleOpen, popup }, ref) => {
    const { isDialogOpen, dialogRef, handleToggleDialog, handleDialogClose } =
      useDialog();

    useEffect(() => {
      typeof handleOpen === "function" && handleOpen(isDialogOpen);
    }, [isDialogOpen]);

    return (
      <>
        <S.CalendarButton
          ref={ref}
          className={className}
          onClick={handleToggleDialog}
        >
          {children}
        </S.CalendarButton>
        {typeof popup === "function" &&
          !disabled &&
          popup(dialogRef, isDialogOpen, handleDialogClose)}
      </>
    );
  },
);

CalendarButton.displayName = "CalendarButton";

export default CalendarButton;
