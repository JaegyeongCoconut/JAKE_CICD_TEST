import { DATE_QUERY_KEYS } from "@repo/assets/static";

import type { Languages } from "./language";

interface FilterLabel {
  searches: string[];
  queryKey: { [key: string]: Languages };
  selections?: readonly { key: string; label: Languages }[];
  options?: { isRequired?: boolean; linkKey?: string };
}

export type FilterLabels = Record<string, FilterLabel>;

export interface FilterSearchLabels {
  queryKeyLabel: FilterLabel["queryKey"];
  selections?: FilterLabel["selections"];
  options?: FilterLabel["options"];
}

interface FilterSearchLabel2Base<T extends string> {
  queryParameterKey: T;
  options?: FilterLabel["options"];
}

type FilterSearchLabel2<T extends string> =
  | ({
      queryParameterKey: T;
      type: "dropdown" | "radio";
      filterLabel: Languages;
      filterDefaultValue: string;
      selections: FilterLabel["selections"];
    } & FilterSearchLabel2Base<T>)
  | ({
      queryParameterKey: T;
      type: "input";
      filterLabel: Languages;
      filterDefaultValue: string;
      selections?: never;
    } & FilterSearchLabel2Base<T>)
  | ({
      queryParameterKey: (typeof DATE_QUERY_KEYS)[number];
      type: "calendar";
      filterLabel: Languages;
      filterDefaultValue: string[];
      selections?: never;
    } & FilterSearchLabel2Base<T>);

export type FilterSearchLabels2<T extends string> = ReadonlyArray<
  FilterSearchLabel2<T>
>;

export type DateQueryKeyType = (typeof DATE_QUERY_KEYS)[number];

//NOTE: 필터 리팩토링 후 통합 예정
interface FilterLabel3<T extends string = string> {
  searches: string[];
  queryKey: T;
  queryLabel: Languages;
  selections?: readonly { key: string; label: Languages }[];
  options?: { isRequired?: boolean; isMultiSelect?: boolean };
}

export type FilterLabels3 = Record<string, FilterLabel3>;

type SearchLabelBase = {
  options?: { isRequired?: boolean; isMultiSelect?: boolean };
};

type SearchLabel<T extends string> =
  | ({
      type: "dropdown" | "radio";
      queryKey: T;
      queryLabel: Languages;
      selections: readonly { key: string; label: Languages }[];
    } & SearchLabelBase)
  | ({
      type: "input";
      queryKey: T;
      queryLabel: Languages;
      selections?: never;
    } & SearchLabelBase)
  | ({
      type: "calendar";
      queryKey: Extract<DateQueryKeyType | DateQueryKeyType[], T>;
      queryLabel: Languages;
      selections?: never;
    } & SearchLabelBase);

export type SearchLabelType<T extends string> = readonly SearchLabel<T>[];
