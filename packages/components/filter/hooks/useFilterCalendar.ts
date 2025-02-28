import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { map } from "lodash-es";
import { useSearchParams } from "react-router-dom";

import type { DropdownOptionType, Languages } from "@repo/types";
import { formatLocalDateTime } from "@repo/utils/date";

const useFilterCalendar = (
  queryKeyLabels: { [key: string]: Languages },
  filterLocalValue: { [key: string]: string | string[] },
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void,
  handleSetFilterLabel: (
    queryKey: string,
    searchResult: string | string[],
  ) => void,
  dropdowns?: readonly { key: string; label: Languages }[],
) => {
  const [searchParams] = useSearchParams();

  const [dateTypeDropdown, setDateTypeDropdown] = useState<
    DropdownOptionType<Languages>
  >({
    key: "",
    // NOTE: ""은 string이라 부득이하게 as Languages 단언
    label: "" as Languages,
  });

  const totalQueryKeys = Object.keys(queryKeyLabels);
  const originDataKey = totalQueryKeys.filter((queryKey) =>
    searchParams.get(queryKey),
  )?.[0];
  const dateQueryKey =
    dateTypeDropdown.key || originDataKey || totalQueryKeys[0];

  const handleDateTypeSelect = (key: string): void => {
    if (!dropdowns) return;

    const selectedItem = dropdowns.filter((item) => item.key === key)[0];

    setDateTypeDropdown(selectedItem);

    if (filterLocalValue[dateQueryKey][0]) {
      const startDate = filterLocalValue[dateQueryKey][0];
      const endDate = filterLocalValue[dateQueryKey][1];

      handleLocalValueChange(selectedItem.key, [
        startDate,
        endDate ?? startDate,
      ]);
      handleSetFilterLabel(selectedItem.key, [startDate, endDate ?? startDate]);
    }

    handleLocalValueChange(dateQueryKey, "");
    handleSetFilterLabel(dateQueryKey, "");
  };

  const handleFilterDateChange = (date: dayjs.Dayjs[]): void => {
    const values =
      date.length === 0
        ? []
        : map(date, (d) => formatLocalDateTime(d, "DD/MM/YYYY"));

    handleLocalValueChange(dateQueryKey, values);
    handleSetFilterLabel(dateQueryKey, values);
  };

  const initDateDropdown = (): void => {
    if (!dropdowns) return;

    if (originDataKey) {
      const selectedItem = dropdowns.filter(
        (item) => item.key === originDataKey,
      )[0];
      setDateTypeDropdown(selectedItem);
    } else {
      setDateTypeDropdown(dropdowns?.[0]);
    }
  };

  const initDateLocalValue = (): void => {
    const date = searchParams.get(dateQueryKey);

    if (!date) return;

    const selectedDates = date.split("~").map((item) => item.trim()) ?? [];

    handleLocalValueChange(dateQueryKey, [
      selectedDates[0],
      selectedDates[1] ?? selectedDates[0],
    ]);
  };

  useEffect(() => {
    initDateDropdown();
    initDateLocalValue();
  }, []);

  return {
    dateTypeDropdown,
    dateQueryKey,
    handleDateTypeSelect,
    handleFilterDateChange,
  };
};

export default useFilterCalendar;
