import React from "react";

import { WEEKS } from "@repo/constants/date";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type {
  CalendarType,
  FormatCalendar,
  FormatDatePicker,
} from "@repo/types";

import * as S from "./CalendarWeek.styled";
import Dates from "./container/dates/Dates";
import GhostButton from "../../../../../button/ghost/GhostButton";

interface CalendarWeekProps {
  calendar: FormatCalendar["calendarWeek"];
  datePicker: FormatDatePicker["calendarWeek"];
  type: CalendarType;
}

const CalendarWeek = ({ type, datePicker, calendar }: CalendarWeekProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <>
      <S.WeekRow>
        {WEEKS.map((week, i) => (
          <li key={`${week["shortenDay"]}-${i}`}>
            {defaultLanguage(week["shortenDay"])}
          </li>
        ))}
      </S.WeekRow>
      <S.DateRow data-status={type} onMouseLeave={calendar.onResetHoveredDate}>
        <Dates calendar={calendar} datePicker={datePicker} type={type} />
      </S.DateRow>
      <GhostButton
        css={S.todayButton}
        variant="ghost"
        icon={{ component: <S.CircleBox />, position: "left" }}
        label={LANGUAGE_LABEL.TODAY}
        handleButtonClick={calendar.handleMoveToday}
      />
    </>
  );
};

export default CalendarWeek;
