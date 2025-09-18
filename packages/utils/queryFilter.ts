import dayjs from "dayjs";
import { includes } from "lodash-es";

import type { SUFFIX_DATE_QUERY_KEYS } from "@repo/assets/static/queryFilter";
import type {
  QueryFilterOptions,
  QueryFilterStateFromConstructor,
  QueryFilterStateUnion,
  StringKeyOf,
} from "@repo/types";

import { formatPeriodToUTC } from "./date";

interface GetQueryFilterParamsProps<T> {
  params: readonly StringKeyOf<T>[];
  searchParams: URL["searchParams"];
}

export const getQueryFilterParams = <T>({
  searchParams,
  params,
}: GetQueryFilterParamsProps<T>): T => {
  return Object.keys(Object.fromEntries(searchParams)).reduce(
    (acc, query) => {
      if (!includes(params, query)) return acc;

      const entries = [...searchParams.entries()];
      const keyLength = entries.filter(([key]) => key === query).length;

      const value =
        keyLength > 1 ? searchParams.getAll(query) : searchParams.get(query);

      return { ...acc, [query]: value };
    },
    { page: "1", pageSize: "20" } as unknown as T,
  );
};

export const getAllQuery = (
  searchParams: URL["searchParams"],
): { [key: string]: string[] } => {
  return Object.keys(Object.fromEntries(searchParams)).reduce<{
    [key: string]: string[];
  }>((acc, query) => ({ ...acc, [query]: searchParams.getAll(query) }), {});
};

interface DeleteQueryKeysProps<T extends object, K extends keyof T> {
  keys: K[];
  req: { query: T };
}

export const deleteQueryKeys = <T extends object, K extends keyof T>({
  req,
  keys,
}: DeleteQueryKeysProps<T, K>): { query: Omit<T, K> } => {
  const newQuery = { ...req.query };

  keys.forEach((key) => {
    delete newQuery[key];
  });

  return { query: newQuery };
};

// NOTE: 김재경 선임님의 의견
// TODO: 1. 키 값을 하나로 사용해도 무방할 듯
// TODO: 2. API 요청 전 해당하는 key값으로 변환해서 사용
// TODO: 3. 다만 한 곳에서 여러개의 Date key 값이 필요하면 대응 못함

//TODO: 코드 리팩토링 한번 더 필요함 -> start의 위치가 어두/어미 중 어느곳이더라도 동작할 수 있도록
type DateQueryFilter<
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
> = T extends "startDate"
  ? { endDate: string; startDate: string }
  : T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"]
    ? { [K in (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"]]: string } & {
        [K in (typeof SUFFIX_DATE_QUERY_KEYS)[number]["end"]]: string;
      }
    : never;

interface FormatDateTimeQueryFilterProps<T> {
  key: T;
  isLocalTime: boolean;
  value: string;
}

export const formatDateTimeQueryFilter = <
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
>({
  value,
  key,
  isLocalTime,
}: FormatDateTimeQueryFilterProps<T>): DateQueryFilter<T> => {
  const [startDate, endDate] = value.split("~").map((item) => item.trim());

  return {
    [key]: formatPeriodToUTC({
      type: "startDate",
      localDate: startDate,
      isLocalTime,
    }),
    [key === "startDate" ? "endDate" : `${key.replace("Start", "")}End`]:
      formatPeriodToUTC({ type: "endDate", localDate: endDate, isLocalTime }),
  } as DateQueryFilter<T>;
};

interface FormatDateQueryFilterProps<
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
> {
  key: T;
  value: string;
}

export const formatDateQueryFilter = <
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
>({
  value,
  key,
}: FormatDateQueryFilterProps<T>): DateQueryFilter<T> => {
  const [startDate, endDate] = value.split("~").map((item) => item.trim());

  return {
    [key]: dayjs(startDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
    [key === "startDate" ? "endDate" : `${key.replace("Start", "")}End`]: dayjs(
      endDate,
      "DD/MM/YYYY",
    ).format("YYYY-MM-DD"),
  } as DateQueryFilter<T>;
};

export const formatQueryFilterDate = (dates: string | string[]): string => {
  if (!dates) return "";
  if (!dates[0]) return "";
  if (typeof dates === "string") return dates;

  return `${dates[0]} ~ ${dates[1] || dates[0]}`;
};

export const createTypedQueryFilters = <
  T extends Record<string, QueryFilterOptions>,
>(
  queryFilters: Record<string, QueryFilterStateUnion>,
): Partial<QueryFilterStateFromConstructor<T>> => {
  return queryFilters as Partial<QueryFilterStateFromConstructor<T>>;
};
