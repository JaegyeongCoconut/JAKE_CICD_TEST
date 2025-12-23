import type { Dayjs } from "dayjs";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";
import type { QueryFilterStateMaped } from "@repo/types";
import { formatLocalDateTime } from "@repo/utils/date";

interface UseQueryFilterFieldCalendarProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CALENDAR]
    | undefined;
}

const useQueryFilterFieldCalendar = <T extends string>({
  queryFilter,
}: UseQueryFilterFieldCalendarProps<T>) => {
  const updateTagValue = useQueryFilterStateStore(
    (state) => state.onUpdateTagValue,
  );

  const handleDateChange =
    (queryKey: T) =>
    (date: Dayjs[]): void => {
      if (!queryFilter) return;

      const values =
        date.length === 0
          ? []
          : date.map((date) => formatLocalDateTime({ date }));

      updateTagValue({ queryKey, options: "array", selectedKey: values });
    };

  return { handleDateChange };
};

export default useQueryFilterFieldCalendar;
