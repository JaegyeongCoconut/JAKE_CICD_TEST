import type { Dayjs } from "dayjs";

export interface MonthYear {
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

export type CalendarModalSelectDate = (Dayjs | null)[];

export type CalendarType = "date" | "free";

export type CurrentDatesType = [Dayjs, Dayjs] | Dayjs | null;

export interface DatePicker {
  monthYear: MonthYear;
  handleNextMonthChange: () => void;
  handleNextYearChange: () => void;
  handlePrevMonthChange: () => void;
  handlePrevYearChange: () => void;
}

export interface Calendar {
  isDisabledApplyButton: boolean;
  isOpenMonthDialog: boolean;
  currentDates: CurrentDatesType;
  hoveredDate: Dayjs | null;
  handleApply: () => void;
  handleDateClick: (date: Dayjs[]) => () => void;
  handleMonthClick: (month: number) => () => void;
  handleMonthDialog: () => void;
  handleMoveToday: () => void;
  handleReset: () => void;
  onChangeHoveredDate: (date: Dayjs) => void;
  onResetHoveredDate: () => void;
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
    | "onChangeHoveredDate"
    | "onResetHoveredDate"
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
    | "onChangeHoveredDate"
    | "onResetHoveredDate"
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
