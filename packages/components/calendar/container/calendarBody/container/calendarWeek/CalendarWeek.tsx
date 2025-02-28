import React from "react";

import { WEEKS } from "@repo/assets/static";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type {
  CalendarType,
  FormatCalendar,
  FormatDatePicker,
  Languages,
} from "@repo/types";

import * as S from "./CalendarWeek.styled";
import Dates from "./container/dates/Dates";
import GhostButton from "../../../../../button/ghost/GhostButton";

interface CalendarWeekProps {
  type: CalendarType;
  datePicker: FormatDatePicker["calendarWeek"];
  calendar: FormatCalendar["calendarWeek"];
}

const CalendarWeek = ({ type, datePicker, calendar }: CalendarWeekProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <>
      <S.WeekRow>
        {WEEKS.map((week, i) => (
          <li key={`${week["shortenDay"]}-${i}`}>
            {defaultLanguage(week["shortenDay"] as Languages)}
          </li>
        ))}
      </S.WeekRow>
      <S.DateRow data-status={type} onMouseLeave={calendar.resetHoveredDate}>
        <Dates type={type} datePicker={datePicker} calendar={calendar} />
      </S.DateRow>
      <GhostButton
        css={S.todayButton}
        variant="ghost"
        label="Today"
        icon={{ component: <S.CircleBox />, position: "left" }}
        handleButtonClick={calendar.handleMoveToday}
      />
    </>
  );
};

export default CalendarWeek;
