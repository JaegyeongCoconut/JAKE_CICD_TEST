import React from "react";

import { MONTH } from "@repo/assets/static";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { FormatCalendar, FormatDatePicker, Languages } from "@repo/types";

import * as S from "./CalendarMonth.styled";

interface CalendarMonthProps {
  datePicker: FormatDatePicker["calendarMonth"];
  calendar: FormatCalendar["calendarMonth"];
}

const CalendarMonth = ({ datePicker, calendar }: CalendarMonthProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.MonthWrapper>
      {Object.entries(MONTH).map(([label, value]) => (
        <li key={value}>
          <S.MonthButton
            type="button"
            isCurrent={
              value === +datePicker.monthYear.currentMonth &&
              datePicker.monthYear.year === datePicker.monthYear.currentYear
            }
            isSelected={+datePicker.monthYear.month === value}
            onClick={calendar.handleMonthClick(value)}
          >
            {defaultLanguage(label as Languages)}
          </S.MonthButton>
        </li>
      ))}
    </S.MonthWrapper>
  );
};

export default CalendarMonth;
