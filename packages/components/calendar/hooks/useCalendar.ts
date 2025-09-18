import type { FocusEvent } from "react";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { isNil } from "lodash-es";

import useDatePicker from "@repo/hooks/useDatePicker";
import type { CalendarType, CurrentDatesType } from "@repo/types";

const useCalendar = (
  isDialogOpen: boolean,
  type: CalendarType,
  selectedDate: string[],
  handleChange: (date: dayjs.Dayjs[]) => void,
  handleDialogClose?: () => void,
  handleConditionFocus?: (e?: FocusEvent<HTMLInputElement>) => void,
  handleConditionBlur?: (e?: FocusEvent<HTMLInputElement>) => void,
) => {
  const {
    monthYear,
    handleDateChange,
    handleMonthChange,
    handlePrevMonthChange,
    handleNextMonthChange,
    handlePrevYearChange,
    handleNextYearChange,
    handleResetMonthYear,
  } = useDatePicker({ initDate: selectedDate, handleChange });

  const initSelectedDate: CurrentDatesType =
    selectedDate.length === 2
      ? [
          dayjs(selectedDate[0], "DD/MM/YYYY"),
          dayjs(selectedDate[1], "DD/MM/YYYY"),
        ]
      : selectedDate.length === 1
        ? selectedDate[0]
          ? dayjs(selectedDate[0], "DD/MM/YYYY")
          : null
        : null;

  const [isOpenMonthDialog, setIsOpenMonthDialog] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);
  const [currentDates, setCurrentDates] =
    useState<CurrentDatesType>(initSelectedDate);

  const isDisabledApplyButton = isNil(currentDates);

  const handleMonthDialog = (): void => {
    setIsOpenMonthDialog(!isOpenMonthDialog);
  };

  const onChangeHoveredDate = (date: dayjs.Dayjs): void => {
    setHoveredDate(date);
  };

  const onResetHoveredDate = (): void => {
    hoveredDate && setHoveredDate(null);
  };

  const handleMonthClick = (month: number) => (): void => {
    handleMonthChange(month);
    setIsOpenMonthDialog(false);
  };

  const handleDateClick = (date: dayjs.Dayjs[]) => (): void => {
    if (type === "free") {
      date.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
    }

    setCurrentDates(date.length === 2 ? [date[0], date[1]] : date[0]);
  };

  const handleReset = (): void => {
    setCurrentDates(null);
  };

  const handleMoveToday = (): void => {
    handleResetMonthYear();
  };

  const handleApply = (): void => {
    if (!currentDates) return;

    const selectedCurrentDates = Array.isArray(currentDates)
      ? currentDates
      : [currentDates];

    handleDateChange(selectedCurrentDates);
    typeof handleDialogClose === "function" && handleDialogClose();
  };

  useEffect(() => {
    if (isDialogOpen) {
      setCurrentDates(initSelectedDate);
      handleConditionFocus && handleConditionFocus();
    } else {
      handleConditionBlur && handleConditionBlur();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    //NOTE: filter에서 캘린더 라벨 삭제한 경우 초기화
    setCurrentDates(initSelectedDate);
  }, [selectedDate]);

  return {
    calendar: {
      isDisabledApplyButton,
      isOpenMonthDialog,
      currentDates,
      hoveredDate,
      handleApply,
      handleDateClick,
      handleMonthClick,
      handleMonthDialog,
      handleMoveToday,
      handleReset,
      onResetHoveredDate,
      onChangeHoveredDate,
    },
    datePicker: {
      monthYear,
      handlePrevYearChange,
      handleNextYearChange,
      handlePrevMonthChange,
      handleNextMonthChange,
    },
  };
};

export default useCalendar;
