import type { QueryFilterOptions } from "./base";
import type {
  QueryFilterQueryKeyMatch,
  QueryFilterQueryKeys,
} from "./queryKey";

export type QueryFilterConstructorItem<T extends string = string> = Record<
  T,
  QueryFilterOptions<T>
>;

export type QueryFilterConstructorType<T extends string> =
  QueryFilterQueryKeyMatch<QueryFilterConstructorItem<QueryFilterQueryKeys<T>>>;
