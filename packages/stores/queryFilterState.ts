import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type {
  DateQueryKeyType,
  QueryFilterConstructorItem,
  QueryFilterOptions,
  QueryFilterStateUnion,
} from "@repo/types";

interface OnSetQueryFiltersProps {
  constructor: QueryFilterConstructorItem;
  searchParams: URLSearchParams;
}

interface OnUpdateInputValueProps {
  inputValue: string;
  queryKey: string;
}

interface OnUpdateQueryKeyProps {
  key: string;
  queryKey: string;
}

interface OnUpdateTagValueProps {
  queryKey: string;
  selectedKey: string | string[];
}

interface QueryFilterStoreProps {
  queryFilters: Record<string, QueryFilterStateUnion>;
  onResetAllValues: () => void;
  onSetQueryFilters: ({
    constructor,
    searchParams,
  }: OnSetQueryFiltersProps) => void;
  onUpdateInputValue: ({
    queryKey,
    inputValue,
  }: OnUpdateInputValueProps) => void;
  onUpdateQueryKey: ({ queryKey, key }: OnUpdateQueryKeyProps) => void;
  onUpdateTagValue: ({ queryKey, selectedKey }: OnUpdateTagValueProps) => void;
}

const useQueryFilterStateStore = create<QueryFilterStoreProps>()(
  immer((set) => ({
    queryFilters: {},
    onSetQueryFilters: ({ constructor, searchParams }) => {
      const newFilters = Object.entries(constructor).reduce<
        Record<string, QueryFilterStateUnion>
      >((acc, [key, value]) => {
        const queryKey = value.queryKey;

        let tagValue: string[] | string = "";

        switch (value.type) {
          case QUERY_FILTER_TYPE.CHECKBOX:
            const rawDateValues = searchParams.getAll(queryKey);
            tagValue = rawDateValues.length > 0 ? rawDateValues : [];

            acc[key] = { ...value, tagValue };

            break;
          case QUERY_FILTER_TYPE.CALENDAR: {
            const handleCalendarQueryFilter = (
              value: QueryFilterOptions<string> & {
                type: typeof QUERY_FILTER_TYPE.CALENDAR;
              },
              searchParams: URLSearchParams,
            ): { queryKey: DateQueryKeyType; tagValue: string[] } => {
              const rawDateValues = searchParams.getAll(value.queryKey);

              let tagValue: string[] = [];

              if (rawDateValues.length > 0) {
                const [start, end] = rawDateValues[0].split(" ~ ");
                tagValue =
                  value.calendarType === "date" ? [start] : [start, end];
              }

              return { tagValue, queryKey: value.queryKey };
            };

            const { tagValue, queryKey } = handleCalendarQueryFilter(
              value,
              searchParams,
            );

            acc[key] = { ...value, queryKey, tagValue };

            break;
          }
          case QUERY_FILTER_TYPE.RADIO:
          case QUERY_FILTER_TYPE.DROPDOWN: {
            const rawDateValues = searchParams.get(queryKey);
            tagValue = rawDateValues ?? "";

            acc[key] = { ...value, tagValue };

            break;
          }

          case QUERY_FILTER_TYPE.INPUT:
          case QUERY_FILTER_TYPE.INPUT_REGEXP:
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            const rawDateValues = searchParams.get(queryKey);
            tagValue = rawDateValues ?? "";

            acc[key] = { ...value, tagValue, inputValue: tagValue };

            break;
          }
        }

        return acc;
      }, {});

      set(() => ({ queryFilters: newFilters }));
    },
    onUpdateQueryKey: ({ queryKey, key }) => {
      set((state) => {
        const filter = state.queryFilters[queryKey];
        if (!filter) return;

        filter.queryKey = key;
      });
    },
    onUpdateInputValue: ({ queryKey, inputValue }) => {
      set((state) => {
        const filter = state.queryFilters[queryKey];
        if (!filter) return;

        if (
          filter.type === QUERY_FILTER_TYPE.INPUT ||
          filter.type === QUERY_FILTER_TYPE.INPUT_REGEXP ||
          filter.type === QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH
        ) {
          filter.inputValue = inputValue;
        }
      });
    },
    onUpdateTagValue: ({ queryKey, selectedKey: tagValue }) => {
      set((state) => {
        const filter = state.queryFilters[queryKey];
        if (!filter) return;

        filter.tagValue = tagValue;
      });
    },
    onResetAllValues: () => {
      set((state) => {
        Object.entries(state.queryFilters).forEach(([key, filter]) => {
          switch (filter.type) {
            case QUERY_FILTER_TYPE.CHECKBOX:
            case QUERY_FILTER_TYPE.CALENDAR:
              state.queryFilters[key].tagValue = [];
              break;
            case QUERY_FILTER_TYPE.RADIO:
            case QUERY_FILTER_TYPE.DROPDOWN:
              state.queryFilters[key].tagValue = "";
              break;
            case QUERY_FILTER_TYPE.INPUT:
            case QUERY_FILTER_TYPE.INPUT_REGEXP:
            case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH:
              if (
                state.queryFilters[key].type === QUERY_FILTER_TYPE.INPUT ||
                state.queryFilters[key].type ===
                  QUERY_FILTER_TYPE.INPUT_REGEXP ||
                state.queryFilters[key].type ===
                  QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH
              ) {
                state.queryFilters[key].inputValue = "";
              }
              state.queryFilters[key].tagValue = "";
              break;
          }
        });
      });
    },
  })),
);

export { useQueryFilterStateStore };
