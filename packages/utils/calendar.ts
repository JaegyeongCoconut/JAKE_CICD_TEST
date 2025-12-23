import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import type { MonthYear } from "@repo/types";

export interface GetMonthYearReturnType {
  isCurrentMonthYear: boolean;
  value: Dayjs;
  currentMonth: string;
  currentStartDate: Dayjs;
  currentYear: string;
  date: string;
  firstWeekPrevMonthDate: Dayjs;
  frstDayOfMonth: number;
  lastDate: number;
  month: string;
  nextMonthStartDate: Dayjs;
  prevMonthLastDate: number;
  prevMonthStartDate: Dayjs;
  startDate: Dayjs;
  year: string;
}

export const getMonthYear = (initDate: Dayjs): GetMonthYearReturnType => {
  const value = initDate;
  const month = initDate.format("MM");
  const year = initDate.format("YYYY");
  const date = initDate.format("DD");
  const currentMonth = dayjs().format("MM");
  const currentYear = dayjs().format("YYYY");
  const isCurrentMonthYear = month === currentMonth && year === currentYear;
  const startDate = dayjs(`${year}${month}01`);
  const currentStartDate = dayjs(`${currentYear}${currentMonth}`);
  const prevMonthStartDate = startDate.clone().subtract(1, "month");
  const nextMonthStartDate = startDate.clone().add(1, "month");
  const frstDayOfMonth = Number(startDate.format("d"));
  const lastDate = Number(startDate.clone().endOf("month").format("DD"));
  const prevMonthLastDate = Number(
    prevMonthStartDate.endOf("month").format("DD"),
  );
  const firstWeekPrevMonthDate = prevMonthStartDate.set(
    "date",
    prevMonthLastDate - frstDayOfMonth + 1,
  );

  return {
    value,
    month,
    year,
    date,
    currentMonth,
    currentYear,
    isCurrentMonthYear,
    startDate,
    currentStartDate,
    prevMonthStartDate,
    nextMonthStartDate,
    frstDayOfMonth,
    lastDate,
    prevMonthLastDate,
    firstWeekPrevMonthDate,
  };
};

interface GetUpdatedMonthYearProps {
  monthIncrement: number;
  monthYear: MonthYear;
}

const getUpdatedMonthYear = ({
  monthYear,
  monthIncrement,
}: GetUpdatedMonthYearProps): Dayjs => {
  return monthYear.startDate.clone().add(monthIncrement, "month");
};

interface GetNewMonthProps {
  monthIncrement: number;
  prevDate: MonthYear;
}

export const getNewMonth = ({
  prevDate,
  monthIncrement,
}: GetNewMonthProps): GetMonthYearReturnType => {
  const newMonthYear = getUpdatedMonthYear({
    monthYear: prevDate,
    monthIncrement,
  });

  return getMonthYear(newMonthYear);
};

interface GetUpdatedYearProps {
  monthYear: MonthYear;
  yearIncrement: number;
}

const getUpdatedYear = ({
  monthYear,
  yearIncrement,
}: GetUpdatedYearProps): Dayjs => {
  return monthYear.startDate.clone().add(yearIncrement, "year");
};

interface GetNewYearProps {
  prevDate: MonthYear;
  yearIncrement: number;
}

export const getNewYear = ({
  prevDate,
  yearIncrement,
}: GetNewYearProps): GetMonthYearReturnType => {
  const newMonthYear = getUpdatedYear({ monthYear: prevDate, yearIncrement });

  return getMonthYear(newMonthYear);
};

export const resetMonthYear = (date: MonthYear): GetMonthYearReturnType => {
  return getMonthYear(date.currentStartDate);
};

export default getMonthYear;
