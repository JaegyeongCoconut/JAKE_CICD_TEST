import React, { useContext } from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";
import { formatQueryFilterDate } from "@repo/utils/queryFilter";

import * as S from "./QueryFilterFieldCalendar.styled";
import useQueryFilterFieldCalendar from "./hooks/useQueryFilterFieldCalendar";
import CalendarInput from "../../../../../../../../../input/calendar/CalendarInput";
import { QueryFilterFieldStateContext } from "../../../../context/QueryFilterFieldStateContext";

interface QueryFilterFieldCalendarProps<T extends string> {
  disabled: boolean;
  calendarType: "date" | "free";
  queryKey: T;
  type: typeof QUERY_FILTER_TYPE.CALENDAR;
}

const QueryFilterFieldCalendar = <T extends string>({
  type,
  queryKey,
  disabled,
  calendarType,
}: QueryFilterFieldCalendarProps<T>) => {
  const { handleFocus, handleBlur } = useContext(QueryFilterFieldStateContext);

  const queryFilter = useTypedQueryFilterState({ type, queryKey });
  const { handleDateChange } = useQueryFilterFieldCalendar({
    queryFilter,
  });

  if (!queryFilter) return null;

  const { tagValue, placeholder } = queryFilter;
  const [startDate, endDate] = tagValue;
  const calendarValue = tagValue.length
    ? calendarType === "date"
      ? startDate
      : formatQueryFilterDate([startDate, endDate])
    : "";

  return (
    <S.QueryFilterFieldCalendarWrapper disabled={disabled}>
      {!disabled ? (
        <CalendarInput
          css={S.calendar}
          disabled={false}
          hasError={false}
          value={calendarValue}
          dialogPosition="down"
          placeholder={placeholder}
          selectedDate={tagValue}
          type={calendarType}
          handleConditionBlur={handleBlur}
          handleConditionFocus={handleFocus}
          handleDateChange={handleDateChange(queryKey)}
        />
      ) : (
        <CalendarInput
          css={S.calendar}
          disabled
          value=""
          placeholder={placeholder}
        />
      )}
    </S.QueryFilterFieldCalendarWrapper>
  );
};

export default QueryFilterFieldCalendar;
