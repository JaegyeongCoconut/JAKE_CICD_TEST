import React from "react";

import { ChevronDownIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { FormatCalendar, FormatDatePicker, Languages } from "@repo/types";

import * as S from "./CalendarHeader.styled";
import Button from "../../../button/Button";

interface CalendarHeaderProps {
  datePicker: FormatDatePicker["calendarHeader"];
  calendar: FormatCalendar["calendarHeader"];
}

const CalendarHeader = ({ datePicker, calendar }: CalendarHeaderProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Header>
      <S.MonthYear
        type="button"
        aria-label="open month list"
        onClick={calendar.handleMonthDialog}
      >
        <S.MonthYearContent>
          <S.OpenMonthWrapper>
            <time>
              {defaultLanguage(
                datePicker.monthYear.value
                  .format("MMM")
                  .toUpperCase() as Languages,
              )}
            </time>
            <ChevronDownIcon
              css={S.chevronMonthIcon(!!calendar.isOpenMonthDialog)}
            />
          </S.OpenMonthWrapper>
          <time>{datePicker.monthYear.value.format("YYYY")}</time>
        </S.MonthYearContent>
      </S.MonthYear>
      <S.MoveButtonWrapper>
        <Button
          css={S.chevronNextButton(90)}
          type="button"
          aria-label="move previous month"
          variant="iconOnly"
          disabled={false}
          Icon={ChevronDownIcon}
          handleButtonClick={
            calendar.isOpenMonthDialog
              ? datePicker.handlePrevYearChange
              : datePicker.handlePrevMonthChange
          }
        />
        <Button
          css={S.chevronNextButton(-90)}
          type="button"
          aria-label="move next month"
          variant="iconOnly"
          disabled={false}
          Icon={ChevronDownIcon}
          handleButtonClick={
            calendar.isOpenMonthDialog
              ? datePicker.handleNextYearChange
              : datePicker.handleNextMonthChange
          }
        />
      </S.MoveButtonWrapper>
    </S.Header>
  );
};

export default CalendarHeader;
