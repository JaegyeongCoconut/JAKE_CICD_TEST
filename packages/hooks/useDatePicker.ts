import { useState, useCallback } from "react";

import dayjs from "dayjs";

import {
  getMonthYear,
  getNewMonth,
  getNewYear,
  resetMonthYear,
} from "@repo/utils/calendar";

interface UseDatePickerProps {
  initDate: string[];
  handleChange: (date: dayjs.Dayjs[] | []) => void;
}

const useDatePicker = ({ initDate, handleChange }: UseDatePickerProps) => {
  const date =
    initDate.length !== 0 ? dayjs(initDate[0], "DD/MM/YYYY") : dayjs();
  const initMonthYear = getMonthYear(date);
  const [monthYear, setMonthYear] = useState(initMonthYear);

  const handleDateChange = (date: dayjs.Dayjs[] | []): void => {
    handleChange(date);
  };

  const handlePrevMonthChange = useCallback((): void => {
    setMonthYear((prevDate) => getNewMonth({ prevDate, monthIncrement: -1 }));
  }, []);

  const handleNextMonthChange = useCallback((): void => {
    const newMonthYear = getNewMonth({
      prevDate: monthYear,
      monthIncrement: 1,
    });

    setMonthYear(newMonthYear);
  }, [monthYear]);

  const handlePrevYearChange = useCallback((): void => {
    setMonthYear((prevDate) => getNewYear({ prevDate, yearIncrement: -1 }));
  }, []);

  const handleNextYearChange = useCallback((): void => {
    const newMonthYear = getNewYear({ prevDate: monthYear, yearIncrement: 1 });

    setMonthYear(newMonthYear);
  }, [monthYear]);

  const changeMonthYear = useCallback((date: dayjs.Dayjs): void => {
    const monthYear = getMonthYear(dayjs(date));
    setMonthYear(monthYear);
  }, []);

  const handleMonthChange = useCallback(
    (month: number): void => {
      const date = dayjs(monthYear.value).set("month", month - 1);
      changeMonthYear(date);
    },
    [monthYear],
  );

  const handleResetMonthYear = useCallback((): void => {
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
