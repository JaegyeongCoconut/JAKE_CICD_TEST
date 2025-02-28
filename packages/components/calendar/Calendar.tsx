import React from "react";

import dayjs from "dayjs";

import type { CalendarType } from "@repo/types";

import * as S from "./Calendar.styled";
import CalendarBody from "./container/calendarBody/CalendarBody";
import CalendarButtons from "./container/calendarButtons/CalendarButtons";
import CalendarHeader from "./container/calendarHeader/CalendarHeader";
import useCalendar from "./hooks/useCalendar";

interface CalendarProps {
  className?: string;
  isDialogOpen?: boolean;
  dialogPosition: "up" | "down";
  type: CalendarType;
  as?: React.ElementType & string;
  selectedDate: string[];
  handleDateChange: (date: dayjs.Dayjs[] | []) => void;
  handleDialogClose?: () => void;
  handleConditionFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleConditionBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const Calendar = React.forwardRef<HTMLDialogElement, CalendarProps>(
  (
    {
      className,
      isDialogOpen = false,
      dialogPosition,
      as = "div",
      type = "date",
      selectedDate,
      handleDateChange,
      handleDialogClose,
      handleConditionFocus,
      handleConditionBlur,
    },
    ref,
  ) => {
    const { calendar, datePicker } = useCalendar(
      isDialogOpen,
      type,
      selectedDate,
      handleDateChange,
      handleDialogClose,
      handleConditionFocus,
      handleConditionBlur,
    );

    return (
      <S.Root
        ref={ref}
        className={className}
        aria-modal="true"
        open={isDialogOpen}
        as={as}
        dialogPosition={dialogPosition}
      >
        <CalendarHeader calendar={calendar} datePicker={datePicker} />
        <S.Body>
          <CalendarBody
            type={type}
            calendar={calendar}
            datePicker={datePicker}
          />
          {!calendar.isOpenMonthDialog && (
            <CalendarButtons calendar={calendar} />
          )}
        </S.Body>
      </S.Root>
    );
  },
);

Calendar.displayName = "Calendar";

export default Calendar;
