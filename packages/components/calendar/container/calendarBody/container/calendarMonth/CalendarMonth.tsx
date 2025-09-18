import React from "react";

import { MONTH } from "@repo/constants/date";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { FormatCalendar, FormatDatePicker, Languages } from "@repo/types";

import * as S from "./CalendarMonth.styled";

interface CalendarMonthProps {
  calendar: FormatCalendar["calendarMonth"];
  datePicker: FormatDatePicker["calendarMonth"];
}

const CalendarMonth = ({ datePicker, calendar }: CalendarMonthProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.MonthWrapper>
      {Object.entries(MONTH).map(([label, value]) => (
        <li key={value}>
          <S.MonthButton
            isCurrent={
              value === +datePicker.monthYear.currentMonth &&
              datePicker.monthYear.year === datePicker.monthYear.currentYear
            }
            isSelected={+datePicker.monthYear.month === value}
            type="button"
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
