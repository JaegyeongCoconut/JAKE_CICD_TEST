import React from "react";

import type dayjs from "dayjs";

import type { CalendarType } from "@repo/types";

import * as S from "./Calendar.styled";
import CalendarBody from "./container/calendarBody/CalendarBody";
import CalendarButtons from "./container/calendarButtons/CalendarButtons";
import CalendarHeader from "./container/calendarHeader/CalendarHeader";
import useCalendar from "./hooks/useCalendar";

interface CalendarProps {
  className?: string;
  as?: React.ElementType & string;
  isDialogOpen?: boolean;
  dialogPosition: "up" | "down" | "center";
  selectedDate: string[];
  type: CalendarType;
  handleConditionBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleConditionFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleDateChange: (date: dayjs.Dayjs[] | []) => void;
  handleDialogClose?: () => void;
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
        className={className}
        ref={ref}
        as={as}
        aria-modal="true"
        open={isDialogOpen}
        dialogPosition={dialogPosition}
      >
        <CalendarHeader calendar={calendar} datePicker={datePicker} />
        <S.Body>
          <CalendarBody
            calendar={calendar}
            datePicker={datePicker}
            type={type}
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
