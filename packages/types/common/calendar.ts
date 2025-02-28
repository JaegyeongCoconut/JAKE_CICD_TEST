import type { Dayjs } from "dayjs";

export interface MonthYear {
  value: Dayjs;
  month: string;
  year: string;
  date: string;
  currentMonth: string;
  currentYear: string;
  isCurrentMonthYear: boolean;
  startDate: Dayjs;
  currentStartDate: Dayjs;
  prevMonthStartDate: Dayjs;
  nextMonthStartDate: Dayjs;
  firstDOW: number;
  lastDate: number;
  prevMonthLastDate: number;
  firstWeekPrevMonthDate: Dayjs;
}

export type CalendarModalSelectDate = (Dayjs | null)[];

export type CalendarType = "date" | "free";

export type CurrentDatesType = [Dayjs, Dayjs] | Dayjs | null;

export interface DatePicker {
  monthYear: MonthYear;
  handlePrevYearChange: () => void;
  handleNextYearChange: () => void;
  handlePrevMonthChange: () => void;
  handleNextMonthChange: () => void;
}

export interface Calendar {
  currentDates: CurrentDatesType;
  hoveredDate: Dayjs | null;
  isDisabledApplyButton: boolean;
  isOpenMonthDialog: boolean;
  handleApply: () => void;
  handleMonthDialog: () => void;
  handleMoveToday: () => void;
  handleReset: () => void;
  resetHoveredDate: () => void;
  changeHoveredDate: (date: Dayjs) => void;
  handleDateClick: (date: Dayjs[]) => () => void;
  handleMonthClick: (month: number) => () => void;
}

export interface FormatCalendar {
  calendarBody: Calendar;
  calendarButtons: Pick<
    Calendar,
    "isDisabledApplyButton" | "handleReset" | "handleApply"
  >;
  calendarDate: Pick<
    Calendar,
    | "currentDates"
    | "hoveredDate"
    | "changeHoveredDate"
    | "resetHoveredDate"
    | "handleDateClick"
    | "handleMoveToday"
  >;
  calendarDates: Calendar;
  calendarHeader: Pick<Calendar, "isOpenMonthDialog" | "handleMonthDialog">;
  calendarMonth: Pick<Calendar, "handleMonthClick">;
  calendarSelectedInput: Pick<Calendar, "currentDates">;
  calendarWeek: Calendar;
  useDate: Pick<
    Calendar,
    | "currentDates"
    | "hoveredDate"
    | "changeHoveredDate"
    | "resetHoveredDate"
    | "handleDateClick"
  >;
}

export interface FormatDatePicker {
  calendarBody: DatePicker;
  calendarDates: Pick<
    DatePicker,
    "monthYear" | "handlePrevMonthChange" | "handleNextMonthChange"
  >;
  calendarHeader: Pick<
    DatePicker,
    | "monthYear"
    | "handlePrevYearChange"
    | "handleNextYearChange"
    | "handlePrevMonthChange"
    | "handleNextMonthChange"
  >;
  calendarMonth: Pick<DatePicker, "monthYear">;
  calendarWeek: Pick<
    DatePicker,
    "monthYear" | "handlePrevMonthChange" | "handleNextMonthChange"
  >;
}
