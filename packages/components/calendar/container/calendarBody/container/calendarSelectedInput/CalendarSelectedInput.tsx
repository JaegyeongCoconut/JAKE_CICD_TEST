import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { CalendarType, FormatCalendar } from "@repo/types";

import * as S from "./CalendarSelectedInput.styled";

interface CalendarSelectedInputProps {
  calendar: FormatCalendar["calendarSelectedInput"];
  type: CalendarType;
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
            {startSelectedDate?.format("DD/MM/YYYY") ||
              defaultLanguage({ text: LANGUAGE_LABEL.FROM })}
          </time>
          ~
          <time>
            {endSelectedDate
              ? endSelectedDate.format("DD/MM/YYYY")
              : startSelectedDate?.format("DD/MM/YYYY") ||
                defaultLanguage({ text: LANGUAGE_LABEL.TO })}
          </time>
        </>
      ) : type === "date" ? (
        <time>
          {startSelectedDate?.format("DD/MM/YYYY") ||
            defaultLanguage({ text: LANGUAGE_LABEL.SELECT_THE_DATE })}
        </time>
      ) : null}
    </S.SelectedDates>
  );
};

export default CalendarSelectedInput;
