import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";

import type { DateQueryKeyType, QueryFilterSelections } from "./base";
import type { Languages } from "../language";

type QueryFilterBase<T extends string> = {
  isRequired?: boolean;
  label: Languages;
  queryKey: T;
};

type QueryFilterCalendarControl<T extends string> = {
  calendarType: "date" | "free";
  queryKey: DateQueryKeyType;
  type: typeof QUERY_FILTER_TYPE.CALENDAR;
} & Omit<QueryFilterBase<T>, "queryKey">;

type QueryFilterCheckboxControl<T extends string> = {
  hasAllCheckButton: boolean;
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.CHECKBOX;
} & QueryFilterBase<T>;

type QueryFilterDropdownControl<T extends string> = {
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.DROPDOWN;
} & QueryFilterBase<T>;

type QueryFilterRadioControl<T extends string> = {
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.RADIO;
} & QueryFilterBase<T>;

type QueryFilterInputControl<T extends string> = {
  type: typeof QUERY_FILTER_TYPE.INPUT;
} & QueryFilterBase<T>;

type QueryFilterInputRegExpControl<T extends string> = {
  type: typeof QUERY_FILTER_TYPE.INPUT_REGEXP;
} & QueryFilterBase<T>;

type QueryFilterinputRegExpFullLengthControl<T extends string> = {
  type: typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH;
} & QueryFilterBase<T>;

export type QueryFilterControlMaped<T extends string> = {
  [QUERY_FILTER_TYPE.CALENDAR]: QueryFilterCalendarControl<T>;
  [QUERY_FILTER_TYPE.CHECKBOX]: QueryFilterCheckboxControl<T>;
  [QUERY_FILTER_TYPE.DROPDOWN]: QueryFilterDropdownControl<T>;
  [QUERY_FILTER_TYPE.INPUT]: QueryFilterInputControl<T>;
  [QUERY_FILTER_TYPE.INPUT_REGEXP]: QueryFilterInputRegExpControl<T>;
  [QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH]: QueryFilterinputRegExpFullLengthControl<T>;
  [QUERY_FILTER_TYPE.RADIO]: QueryFilterRadioControl<T>;
};

export type QueryFilterControlUnion<T extends string = string> =
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.CALENDAR]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.DROPDOWN]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.RADIO]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP]
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH];
