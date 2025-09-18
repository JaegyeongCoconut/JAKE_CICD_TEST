import React from "react";

import type {
  CalendarType,
  FormatCalendar,
  FormatDatePicker,
} from "@repo/types";

import Date from "./date/Date";

interface DatesProps {
  calendar: FormatCalendar["calendarDates"];
  datePicker: FormatDatePicker["calendarDates"];
  type: CalendarType;
}

const Dates = ({ type, datePicker, calendar }: DatesProps) => {
  const { startDate } = datePicker.monthYear;

  const firstDayOfMonthAsNumber = startDate.day();
  const lastDateOfThisMonth = startDate.endOf("month").date();

  const handleMonthChange = (index: number) => (): void => {
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
          isThisMonth={date.isSame(startDate, "month")}
          calendar={calendar}
          date={date}
          type={type}
          handleMonthChange={handleMonthChange(i)}
        />
      ))}
    </>
  );
};

export default Dates;
