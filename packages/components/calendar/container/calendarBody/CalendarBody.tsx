import React from "react";

import type {
  CalendarType,
  FormatCalendar,
  FormatDatePicker,
} from "@repo/types";

import CalendarMonth from "./container/calendarMonth/CalendarMonth";
import CalendarSelectedInput from "./container/calendarSelectedInput/CalendarSelectedInput";
import CalendarWeek from "./container/calendarWeek/CalendarWeek";

interface CalendarBodyProps {
  type: CalendarType;
  datePicker: FormatDatePicker["calendarBody"];
  calendar: FormatCalendar["calendarBody"];
}

const CalendarBody = ({ type, calendar, datePicker }: CalendarBodyProps) => {
  return (
    <>
      {calendar.isOpenMonthDialog ? (
        <CalendarMonth calendar={calendar} datePicker={datePicker} />
      ) : (
        <>
          <CalendarWeek
            type={type}
            calendar={calendar}
            datePicker={datePicker}
          />
          <CalendarSelectedInput type={type} calendar={calendar} />
        </>
      )}
    </>
  );
};

export default CalendarBody;
