import React from "react";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { FormatCalendar, FormatDatePicker, Languages } from "@repo/types";

import * as S from "./CalendarHeader.styled";
import Button from "../../../button/Button";

interface CalendarHeaderProps {
  calendar: FormatCalendar["calendarHeader"];
  datePicker: FormatDatePicker["calendarHeader"];
}

const CalendarHeader = ({ datePicker, calendar }: CalendarHeaderProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Header>
      <S.MonthYear
        aria-label="open month list"
        type="button"
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
            <DownIcon css={S.chevronMonthIcon(!!calendar.isOpenMonthDialog)} />
          </S.OpenMonthWrapper>
          <time>{datePicker.monthYear.value.format("YYYY")}</time>
        </S.MonthYearContent>
      </S.MonthYear>
      <S.MoveButtonWrapper>
        <Button
          css={S.chevronNextButton(90)}
          aria-label="move previous month"
          variant="iconOnly"
          disabled={false}
          Icon={DownIcon}
          type="button"
          handleButtonClick={
            calendar.isOpenMonthDialog
              ? datePicker.handlePrevYearChange
              : datePicker.handlePrevMonthChange
          }
        />
        <Button
          css={S.chevronNextButton(-90)}
          aria-label="move next month"
          variant="iconOnly"
          disabled={false}
          Icon={DownIcon}
          type="button"
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
