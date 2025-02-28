import React from "react";

import type {
  CalendarType,
  FormatCalendar,
  FormatDatePicker,
} from "@repo/types";

import Date from "./date/Date";

interface DatesProps {
  type: CalendarType;
  datePicker: FormatDatePicker["calendarDates"];
  calendar: FormatCalendar["calendarDates"];
}

const Dates = ({ type, datePicker, calendar }: DatesProps) => {
  const { startDate } = datePicker.monthYear;

  const firstDayOfMonthAsNumber = startDate.day();
  const lastDateOfThisMonth = startDate.endOf("month").date();

  const changeMonth = (index: number) => (): void => {
    const isSelectNextMonth = index >= firstDayOfMonthAsNumber;
    const isSelectPrevMonth =
      index < firstDayOfMonthAsNumber + lastDateOfThisMonth;

    isSelectNextMonth && datePicker.handleNextMonthChange();
    isSelectPrevMonth && datePicker.handlePrevMonthChange();
  };

  return (
    <>
      {Array.from({ length: 42 }, (_, i) =>
        startDate.add(i - firstDayOfMonthAsNumber, "d"),
      ).map((date, i) => (
        <Date
          key={i}
          type={type}
          isThisMonth={date.isSame(startDate, "month")}
          date={date}
          calendar={calendar}
          changeMonth={changeMonth(i)}
        />
      ))}
    </>
  );
};

export default Dates;
