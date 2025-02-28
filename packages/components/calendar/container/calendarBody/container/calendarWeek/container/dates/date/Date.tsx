import React from "react";

import dayjs from "dayjs";

import type { CalendarType, FormatCalendar } from "@repo/types";

import * as S from "./Date.styled";
import useDate from "./hooks/useDate";

interface DateProps {
  className?: string;
  disabled?: boolean;
  type: CalendarType;
  isThisMonth: boolean;
  date: dayjs.Dayjs;
  calendar: FormatCalendar["calendarDate"];
  changeMonth: () => void;
}

const Date = ({
  className,
  disabled,
  type,
  isThisMonth,
  date,
  calendar,
  changeMonth,
}: DateProps) => {
  const {
    isToday,
    isSelectedFreeDates,
    isHoveredBeforeSelectedDate,
    isHoveredAfterSelectedDate,
    isSelectedStartDate,
    isSelectedEndDate,
    isHoveredIncluded,
    weekIdx,
    handleMouseOver,
    handleClick,
  } = useDate({ date, type, calendar, changeMonth });

  const { currentDates, hoveredDate } = calendar;
  const isSelectOneDateOfPeriod =
    !Array.isArray(currentDates) && date.isSame(hoveredDate);

  return (
    <S.Root
      className={className}
      isSelected={
        Array.isArray(currentDates) ? !!currentDates.length : !!currentDates
      }
      isToday={isToday}
      isThisMonth={isThisMonth}
      isSelectedDate={isSelectedStartDate || isSelectedEndDate}
      isHoverLength={
        type === "free" && (isSelectedFreeDates || isHoveredIncluded)
      }
      isLeftCircleCases={
        weekIdx === 0 ||
        (isSelectedStartDate && !!isHoveredAfterSelectedDate) ||
        (Array.isArray(currentDates) && isSelectedStartDate) ||
        (isSelectOneDateOfPeriod && !!isHoveredBeforeSelectedDate)
      }
      isRightCircleCases={
        weekIdx === 6 ||
        (isSelectedEndDate && !!isHoveredBeforeSelectedDate) ||
        (Array.isArray(currentDates) && isSelectedEndDate) ||
        (isSelectOneDateOfPeriod && !!isHoveredAfterSelectedDate)
      }
    >
      <S.Button
        type="button"
        disabled={disabled}
        onMouseEnter={handleMouseOver(date)}
        onClick={handleClick(date)}
      >
        {date.format("D")}
      </S.Button>
    </S.Root>
  );
};

export default Date;
