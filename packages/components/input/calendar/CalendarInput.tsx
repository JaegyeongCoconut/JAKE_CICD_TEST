import React, { memo } from "react";

import type { Dayjs } from "dayjs";

import { ReactComponent as CalendarIcon } from "@repo/assets/icon/ic_calendar.svg";
import type { CalendarType, Languages } from "@repo/types";

import * as S from "./CalendarInput.styled";
import CalendarButton from "../../button/calendar/CalendarButton";
import Calendar from "../../calendar/Calendar";
import DisabledInput from "../disabled/DisabledInput";

interface BaseCalendarInputProps {
  className?: string;
  placeholder: Languages;
}

interface DisabledCalendarInputProps extends BaseCalendarInputProps {
  disabled: true;
  hasError?: never;
  value: "";
  dialogPosition?: never;
  selectedDate?: never;
  type?: never;
  handleConditionBlur?: never;
  handleConditionFocus?: never;
  handleDateChange?: never;
}

interface AbledCalendarInputProps extends BaseCalendarInputProps {
  disabled: false;
  hasError: boolean;
  value: string;
  dialogPosition: "up" | "down" | "center";
  selectedDate: string[];
  type: CalendarType;
  handleConditionBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleConditionFocus: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Dayjs[] | []) => void;
}

const CalendarInput = ({
  className,
  dialogPosition,
  hasError,
  disabled,
  selectedDate,
  placeholder,
  type,
  value,
  handleDateChange,
  handleConditionFocus,
  handleConditionBlur,
}: AbledCalendarInputProps | DisabledCalendarInputProps) => {
  return (
    <S.Root className={className}>
      <DisabledInput
        css={S.calendarInput({ disabled, hasError: !!hasError })}
        value={value}
        placeholder={placeholder}
      />
      <CalendarButton
        css={S.calendarDialogButton(disabled)}
        disabled={disabled}
        onPopup={
          !disabled
            ? (dialogRef, isDialogOpen, handleDialogClose) => (
                <Calendar
                  ref={dialogRef}
                  as="dialog"
                  isDialogOpen={isDialogOpen}
                  dialogPosition={dialogPosition}
                  selectedDate={selectedDate}
                  type={type}
                  handleConditionBlur={handleConditionBlur}
                  handleConditionFocus={handleConditionFocus}
                  handleDateChange={handleDateChange}
                  handleDialogClose={handleDialogClose}
                />
              )
            : () => {}
        }
      >
        <CalendarIcon css={S.calendarIcon} />
      </CalendarButton>
    </S.Root>
  );
};

export default memo(CalendarInput);
