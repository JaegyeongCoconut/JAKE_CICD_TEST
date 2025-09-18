import { useMemo } from "react";

import { useSearchParams } from "react-router-dom";

import type { StringKeyOf } from "@repo/types";
import { getQueryFilterParams } from "@repo/utils/queryFilter";

const useQueryFilterParams = <T>(params: readonly StringKeyOf<T>[]) => {
  const [searchParams] = useSearchParams();

  const queryFilters = useMemo(
    () => getQueryFilterParams({ searchParams, params }),
    [searchParams],
  );

  return { queryFilters };
};

export default useQueryFilterParams;
