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
  calendar: FormatCalendar["calendarBody"];
  datePicker: FormatDatePicker["calendarBody"];
  type: CalendarType;
}

const CalendarBody = ({ type, calendar, datePicker }: CalendarBodyProps) => {
  return (
    <>
      {calendar.isOpenMonthDialog ? (
        <CalendarMonth calendar={calendar} datePicker={datePicker} />
      ) : (
        <>
          <CalendarWeek
            calendar={calendar}
            datePicker={datePicker}
            type={type}
          />
          <CalendarSelectedInput calendar={calendar} type={type} />
        </>
      )}
    </>
  );
};

export default CalendarBody;
