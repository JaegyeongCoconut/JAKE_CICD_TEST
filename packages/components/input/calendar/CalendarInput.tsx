import React, { memo } from "react";

import dayjs from "dayjs";
import type { UseFormRegisterReturn } from "react-hook-form";

import { CalendarIcon } from "@repo/assets/icon";
import type { CalendarType, Languages } from "@repo/types";

import * as S from "./CalendarInput.styled";
import CalendarButton from "../../button/calendar/CalendarButton";
import Calendar from "../../calendar/Calendar";
import Input from "../Input";

interface CalendarInputProps {
  className?: string;
  dialogPosition: "up" | "down";
  hasError?: boolean;
  hasTime?: boolean;
  disabled?: boolean;
  placeholder?: Languages;
  selectedDate: string[];
  type: CalendarType;
  value: string;
  register?: UseFormRegisterReturn<string>;
  handleDateChange: (date: dayjs.Dayjs[] | []) => void;
  handleConditionFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleConditionBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const CalendarInput = ({
  className,
  dialogPosition,
  hasError,
  disabled,
  selectedDate,
  placeholder = "Select the date",
  type,
  value,
  register,
  handleDateChange,
  handleConditionFocus,
  handleConditionBlur,
}: CalendarInputProps) => {
  return (
    <S.Root className={className}>
      <Input
        css={S.calendarInput(disabled)}
        placeholder={placeholder}
        value={value}
        disabled
        hasError={hasError}
        register={register}
      />
      <CalendarButton
        css={S.calendarDialogButton(disabled)}
        disabled={disabled}
        popup={(dialogRef, isDialogOpen, handleDialogClose) => (
          <Calendar
            ref={dialogRef}
            dialogPosition={dialogPosition}
            isDialogOpen={isDialogOpen}
            as="dialog"
            type={type}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleDialogClose={handleDialogClose}
            handleConditionFocus={handleConditionFocus}
            handleConditionBlur={handleConditionBlur}
          />
        )}
      >
        <CalendarIcon css={S.calendarIcon} />
      </CalendarButton>
    </S.Root>
  );
};

export default memo(CalendarInput);
