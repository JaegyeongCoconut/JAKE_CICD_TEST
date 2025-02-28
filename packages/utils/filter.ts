import dayjs from "dayjs";
import { includes } from "lodash-es";

import { SUFFIX_DATE_QUERY_KEYS } from "@repo/assets/static";
import type { StringKeyOf } from "@repo/types";

import { formatPeriodToUTC } from "./date";

export const getFilterParams = <T>(
  searchParams: URL["searchParams"],
  params: readonly StringKeyOf<T>[],
  init?: Partial<T>,
) => {
  return Object.keys(Object.fromEntries(searchParams)).reduce(
    (acc, query) => {
      if (!includes(params, query)) return acc;

      const queryValue = searchParams.getAll(query);
      const value = queryValue.join(",");

      return {
        ...acc,
        [query]: value,
      };
    },
    getDefaultQuery(init) as unknown as T,
  );
};

const getDefaultQuery = <T>(init?: T) => ({
  page: "1",
  pageSize: "20",
  ...(init ?? {}),
});

export const getAllQuery = (searchParams: URL["searchParams"]) => {
  return Object.keys(Object.fromEntries(searchParams)).reduce<{
    [key: string]: string[];
  }>(
    (acc, query) => ({
      ...acc,
      [query]: searchParams.getAll(query),
    }),
    {},
  );
};

export const selectFilterName = (
  filterKeyValues: { searchLabel: { key: string; name: string }[] }[],
  selectLabel: string,
) =>
  filterKeyValues
    .map(
      (filterKeyValue) =>
        filterKeyValue.searchLabel.filter(
          (item) => item.key === selectLabel,
        )[0],
    )
    .filter((item) => !!item)[0].name;

export const deleteQueryKeys = <T extends object, K extends keyof T>(
  req: { query: T },
  keys: K[],
): { query: Omit<T, K> } => {
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
type DateFilter<T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"]> =
  T extends "startDate"
    ? { startDate: string; endDate: string }
    : T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"]
      ? { [K in (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"]]: string } & {
          [K in (typeof SUFFIX_DATE_QUERY_KEYS)[number]["end"]]: string;
        }
      : never;

export const formatDateTimeFilter = <
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
>(
  value: string,
  key: T,
  isLocalTime?: boolean,
): DateFilter<T> => {
  const [startDate, endDate] = value.split("~").map((item) => item.trim());

  return {
    [key]: formatPeriodToUTC("startDate", startDate, isLocalTime),
    [key === "startDate" ? "endDate" : `${key.replace("Start", "")}End`]:
      formatPeriodToUTC("endDate", endDate, isLocalTime),
  } as DateFilter<T>;
};

export const formatDateFilter = <
  T extends (typeof SUFFIX_DATE_QUERY_KEYS)[number]["start"],
>(
  value: string,
  key: T,
): DateFilter<T> => {
  const [startDate, endDate] = value.split("~").map((item) => item.trim());

  return {
    [key]: dayjs(startDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
    [key === "startDate" ? "endDate" : `${key.replace("Start", "")}End`]: dayjs(
      endDate,
      "DD/MM/YYYY",
    ).format("YYYY-MM-DD"),
  } as DateFilter<T>;
};

export const formatFilterDate = (dates: string | string[]): string => {
  if (!dates) return "";
  if (!dates[0]) return "";
  if (typeof dates === "string") return dates;

  return `${dates[0]} ~ ${dates[1] || dates[0]}`;
};
