import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";

import type { Languages } from "../language";
import type { QueryFilterOptions } from "./base";
import type { QueryFilterControlMaped } from "./controls";

type QueryFilterCalendarState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.CALENDAR] & {
    placeholder: Languages;
    tagValue: string[];
  };

type QueryFilterCheckboxState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX] & {
    tagValue: string[];
  };

type QueryFilterDropdownState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.DROPDOWN] & {
    placeholder: Languages;
    tagValue: string;
  };

type QueryFilterRadioState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.RADIO] & {
    tagValue: string;
  };

type QueryFilterInputState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT] & {
    inputValue: string;
    maxLength: number;
    placeholder: Languages;
    tagValue: string;
  };

type QueryFilterInputRegExpState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP] & {
    inputValue: string;
    maxLength: number;
    placeholder: Languages;
    regExp: RegExp;
    tagValue: string;
  };

type QueryFilterinputRegExpFullLengthState<T extends string> =
  QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH] & {
    inputValue: string;
    maxLength: number;
    placeholder: Languages;
    regExp: RegExp;
    tagValue: string;
  };

export type QueryFilterStateMaped<T extends string = string> = {
  [QUERY_FILTER_TYPE.CALENDAR]: QueryFilterCalendarState<T>;
  [QUERY_FILTER_TYPE.CHECKBOX]: QueryFilterCheckboxState<T>;
  [QUERY_FILTER_TYPE.DROPDOWN]: QueryFilterDropdownState<T>;
  [QUERY_FILTER_TYPE.INPUT]: QueryFilterInputState<T>;
  [QUERY_FILTER_TYPE.INPUT_REGEXP]: QueryFilterInputRegExpState<T>;
  [QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH]: QueryFilterinputRegExpFullLengthState<T>;
  [QUERY_FILTER_TYPE.RADIO]: QueryFilterRadioState<T>;
};

export type QueryFilterStateUnion<T extends string = string> =
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CALENDAR]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.DROPDOWN]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.RADIO]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.INPUT]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP]
  | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH];

export type QueryFilterStateFromConstructor<
  T extends Record<string, QueryFilterOptions>,
> = {
  [K in keyof T]: {
    queryKey: K;
    type: T[K]["type"];
  } & QueryFilterStateMaped[T[K]["type"]];
};
