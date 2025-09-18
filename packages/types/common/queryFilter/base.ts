import type {
  DATE_QUERY_KEYS,
  QUERY_FILTER_TYPE,
} from "@repo/assets/static/queryFilter";

import type { Languages } from "../language";
import type { QueryFilterControlMaped } from "./controls";

export type DateQueryKeyType = (typeof DATE_QUERY_KEYS)[number];

export type QueryFilterSelections = readonly {
  key: string;
  label: Languages;
}[];

export type QueryFilterOptions<T extends string = string> =
  | (QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX] & {
      hasAllCheckButton: boolean;
    })
  | QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.RADIO]
  | (QueryFilterControlMaped<T>[
      | typeof QUERY_FILTER_TYPE.CALENDAR
      | typeof QUERY_FILTER_TYPE.DROPDOWN] & {
      placeholder: Languages;
    })
  | (QueryFilterControlMaped<T>[typeof QUERY_FILTER_TYPE.INPUT] & {
      maxLength: number;
      placeholder: Languages;
    })
  | (QueryFilterControlMaped<T>[
      | typeof QUERY_FILTER_TYPE.INPUT_REGEXP
      | typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH] & {
      maxLength: number;
      placeholder: Languages;
      regExp: RegExp;
    });
