import React from "react";

import type dayjs from "dayjs";

import type { CalendarType, FormatCalendar } from "@repo/types";

import * as S from "./Date.styled";
import useDate from "./hooks/useDate";

interface DateProps {
  className?: string;
  disabled?: boolean;
  isThisMonth: boolean;
  calendar: FormatCalendar["calendarDate"];
  date: dayjs.Dayjs;
  type: CalendarType;
  handleMonthChange: () => void;
}

const Date = ({
  className,
  disabled,
  type,
  isThisMonth,
  date,
  calendar,
  handleMonthChange,
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
  } = useDate({ date, type, calendar, handleMonthChange });

  const { currentDates, hoveredDate } = calendar;
  const isSelectOneDateOfPeriod =
    !Array.isArray(currentDates) && date.isSame(hoveredDate);

  return (
    <S.Root
      className={className}
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
      isSelected={
        Array.isArray(currentDates) ? !!currentDates.length : !!currentDates
      }
      isSelectedDate={isSelectedStartDate || isSelectedEndDate}
      isThisMonth={isThisMonth}
      isToday={isToday}
    >
      <S.Button
        disabled={disabled}
        type="button"
        onClick={handleClick(date)}
        onMouseEnter={handleMouseOver(date)}
      >
        {date.format("D")}
      </S.Button>
    </S.Root>
  );
};

export default Date;
