import type { Dayjs } from "dayjs";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
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
  const { updateTagValue } = useQueryFilterHooks();

  const handleDateChange =
    (queryKey: T) =>
    (date: Dayjs[]): void => {
      if (!queryFilter) return;

      const values =
        date.length === 0
          ? []
          : date.map((date) => formatLocalDateTime({ date }));

      updateTagValue({ queryKey, selectedKey: values });
    };

  return { handleDateChange };
};

export default useQueryFilterFieldCalendar;
