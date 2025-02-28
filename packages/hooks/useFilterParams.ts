import { useMemo } from "react";

import { useSearchParams } from "react-router-dom";

import type { StringKeyOf } from "@repo/types";
import { getFilterParams } from "@repo/utils/filter";

const useFilterParams = <T>(
  params: readonly StringKeyOf<T>[],
  init?: Partial<T>,
) => {
  const [searchParams] = useSearchParams();

  const filters = useMemo(
    () => getFilterParams(searchParams, params, init),
    [searchParams],
  );

  return { filters };
};

export default useFilterParams;
