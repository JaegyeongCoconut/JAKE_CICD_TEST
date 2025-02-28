import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { CalendarType, FormatCalendar } from "@repo/types";

import * as S from "./CalendarSelectedInput.styled";

interface CalendarSelectedInputProps {
  type: CalendarType;
  calendar: FormatCalendar["calendarSelectedInput"];
}

const CalendarSelectedInput = ({
  type,
  calendar,
}: CalendarSelectedInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { currentDates } = calendar;

  const startSelectedDate = Array.isArray(currentDates)
    ? currentDates[0]
    : currentDates;
  const endSelectedDate = Array.isArray(currentDates)
    ? currentDates[1]
    : currentDates;

  return (
    <S.SelectedDates isSelected={!!startSelectedDate}>
      {type === "free" ? (
        <>
          <time>
            {startSelectedDate?.format("DD/MM/YYYY") || defaultLanguage("From")}
          </time>
          ~
          <time>
            {endSelectedDate
              ? endSelectedDate.format("DD/MM/YYYY")
              : startSelectedDate?.format("DD/MM/YYYY") ||
                defaultLanguage("To")}
          </time>
        </>
      ) : type === "date" ? (
        <time>
          {startSelectedDate?.format("DD/MM/YYYY") ||
            defaultLanguage("Select the date")}
        </time>
      ) : null}
    </S.SelectedDates>
  );
};

export default CalendarSelectedInput;
