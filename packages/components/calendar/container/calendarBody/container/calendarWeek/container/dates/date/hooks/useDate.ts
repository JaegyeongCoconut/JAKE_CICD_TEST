import dayjs from "dayjs";

import "@repo/settings/dayjsSetup";
import type { CalendarType, FormatCalendar } from "@repo/types";

interface useDateProps {
  calendar: FormatCalendar["useDate"];
  date: dayjs.Dayjs;
  type: CalendarType;
  handleMonthChange: () => void;
}

const useDate = ({
  date,
  type,
  calendar: {
    currentDates,
    hoveredDate,
    onChangeHoveredDate,
    onResetHoveredDate,
    handleDateClick,
  },
  handleMonthChange,
}: useDateProps) => {
  const isArrayCurrentDates = Array.isArray(currentDates);

  const isToday = dayjs().isSame(date, "d");
  const isSelectedStartDate =
    !!currentDates &&
    (isArrayCurrentDates
      ? currentDates[0].isSame(date, "d")
      : currentDates.isSame(date, "d"));
  const isSelectedEndDate =
    !!currentDates &&
    (isArrayCurrentDates
      ? currentDates[1].isSame(date, "d")
      : currentDates.isSame(date, "d"));
  const isSelectedFreeDates =
    isArrayCurrentDates &&
    date.isSameOrAfter(currentDates[0]) &&
    date.isSameOrBefore(currentDates[1]);

  //NOTE: hover시 날짜 스타일링 위해 추가
  const isHoveredBeforeSelectedDate =
    date.isSameOrBefore(isArrayCurrentDates ? currentDates[0] : currentDates) &&
    date.isSameOrAfter(hoveredDate);
  const isHoveredAfterSelectedDate =
    date.isSameOrAfter(isArrayCurrentDates ? currentDates[0] : currentDates) &&
    date.isSameOrBefore(hoveredDate);
  const isHoveredIncluded =
    !!isHoveredBeforeSelectedDate || !!isHoveredAfterSelectedDate;

  const weekIdx = date.get("d");

  const handleFreeClick = (date: dayjs.Dayjs): void => {
    const filteredDates = isArrayCurrentDates
      ? currentDates.filter((item) => !item.isSame(date))
      : currentDates;

    const isAlreadySelectedDates =
      date.isSame(isArrayCurrentDates ? currentDates[0] : currentDates) ||
      date.isSame(isArrayCurrentDates ? currentDates[1] : currentDates);
    const isSelectedSameSingleDate =
      !isArrayCurrentDates && currentDates?.isSame(date);
    const isSelectedSameFreeDate =
      (Array.isArray(filteredDates) && filteredDates.length) !==
      (Array.isArray(currentDates) && currentDates?.length);

    if (isSelectedSameSingleDate) {
      handleDateClick([])();
      onResetHoveredDate();
    } else if (isSelectedSameFreeDate) {
      if (!filteredDates) return;

      handleDateClick(
        Array.isArray(filteredDates) ? filteredDates : [filteredDates],
      )();
      onChangeHoveredDate(date);
    } else if (!isArrayCurrentDates && !!currentDates) {
      handleDateClick([currentDates, date])();
      onChangeHoveredDate(isArrayCurrentDates ? currentDates[0] : currentDates);
    } else if (!isAlreadySelectedDates || !currentDates) {
      handleDateClick([date])();
      onChangeHoveredDate(date);
    }
  };

  const handleClick = (date: dayjs.Dayjs) => (): void => {
    if (type === "free") {
      handleFreeClick(date);
    } else if (type === "date") {
      handleDateClick([date])();
    }

    handleMonthChange();
  };

  const handleMouseOver = (date: dayjs.Dayjs) => (): void => {
    !isArrayCurrentDates && !!currentDates
      ? onChangeHoveredDate(date)
      : onResetHoveredDate();
  };

  return {
    isToday,
    isSelectedFreeDates,
    isSelectedStartDate,
    isSelectedEndDate,
    isHoveredIncluded,
    isHoveredBeforeSelectedDate,
    isHoveredAfterSelectedDate,
    weekIdx,
    handleMouseOver,
    handleClick,
  };
};

export default useDate;
