import { useState, useCallback } from "react";

import dayjs from "dayjs";

import {
  getMonthYear,
  getNewMonth,
  getNewYear,
  resetMonthYear,
} from "@repo/utils/calendar";

const useDatePicker = (
  initDate: string[],
  handleChange: (date: dayjs.Dayjs[] | []) => void,
) => {
  const date =
    initDate.length !== 0 ? dayjs(initDate[0], "DD/MM/YYYY") : dayjs();
  const initMonthYear = getMonthYear(date);
  const [monthYear, setMonthYear] = useState(initMonthYear);

  const handleDateChange = (date: dayjs.Dayjs[] | []) => {
    handleChange(date);
  };

  const handlePrevMonthChange = useCallback(() => {
    setMonthYear((prevDate) => getNewMonth(prevDate, -1));
  }, []);

  const handleNextMonthChange = useCallback(() => {
    const newMonthYear = getNewMonth(monthYear, 1);

    setMonthYear(newMonthYear);
  }, [monthYear]);

  const handlePrevYearChange = useCallback(() => {
    setMonthYear((prevDate) => getNewYear(prevDate, -1));
  }, []);

  const handleNextYearChange = useCallback(() => {
    const newMonthYear = getNewYear(monthYear, 1);

    setMonthYear(newMonthYear);
  }, [monthYear]);

  const changeMonthYear = useCallback((date: dayjs.Dayjs) => {
    const monthYear = getMonthYear(dayjs(date));
    setMonthYear(monthYear);
  }, []);

  const handleMonthChange = useCallback(
    (month: number) => {
      const date = dayjs(monthYear.value).set("month", month - 1);
      changeMonthYear(date);
    },
    [monthYear],
  );

  const handleResetMonthYear = useCallback(() => {
    const monthYear = resetMonthYear(initMonthYear);
    setMonthYear(monthYear);
  }, []);

  return {
    monthYear,
    handleDateChange,
    handleMonthChange,
    handlePrevMonthChange,
    handleNextMonthChange,
    handlePrevYearChange,
    handleNextYearChange,
    handleResetMonthYear,
  };
};

export default useDatePicker;
