import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";
import type { QueryFilterStateUnion } from "@repo/types";

interface UseTypedQueryFilterStateProps<
  ControlType extends QueryFilterStateUnion["type"],
  QueryKeyType extends string,
> {
  queryKey: QueryKeyType;
  type: ControlType;
}

const useTypedQueryFilterState = <
  ControlType extends QueryFilterStateUnion["type"],
  QueryKeyType extends string,
>({
  type,
  queryKey,
}: UseTypedQueryFilterStateProps<ControlType, QueryKeyType>):
  | Extract<QueryFilterStateUnion, { type: ControlType }>
  | undefined => {
  const queryFilters = useQueryFilterStateStore((state) => state.queryFilters);

  if (queryFilters[queryKey]?.type !== type) return undefined;

  return queryFilters[queryKey] as Extract<
    QueryFilterStateUnion,
    { type: ControlType }
  >;
};

export default useTypedQueryFilterState;
