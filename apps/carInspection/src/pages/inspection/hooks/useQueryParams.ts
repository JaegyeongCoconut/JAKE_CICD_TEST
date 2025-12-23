import { useEffect } from "react";

import { isEmpty } from "lodash-es";

import useQueryFilterParams from "@repo/hooks/queryFilter/useQueryFilterParams";
import { useQueryFilterStore } from "@repo/stores/queryFilter";

import { INSPECTION_QUERY_FILTERS } from "~assets";
import type { GetInspectionQueryModel } from "~types";

const useQueryParams = () => {
  const isInitQueryFilter = useQueryFilterStore(
    (state) => state.isInitQueryFilter,
  );
  const setIsInitQueryFilter = useQueryFilterStore(
    (state) => state.setIsInitQueryFilter,
  );

  const { queryFilters } = useQueryFilterParams<
    GetInspectionQueryModel["query"]
  >(INSPECTION_QUERY_FILTERS);

  const req: GetInspectionQueryModel = { query: queryFilters };

  const hasQueryFilters = !isEmpty(req.query.brand);

  useEffect(() => {
    if (!hasQueryFilters || !isInitQueryFilter) return;

    setIsInitQueryFilter(false);
  }, [req]);

  return { isInitQueryFilter, req };
};

export default useQueryParams;
