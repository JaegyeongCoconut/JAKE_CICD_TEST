import { useQueryFilterStore } from "@repo/stores/queryFilter";

const useQueryInitFilterHooks = () => {
  const isInitQueryFilter = useQueryFilterStore(
    (state) => state.isInitQueryFilter,
  );
  const setIsInitQueryFilter = useQueryFilterStore(
    (state) => state.setIsInitQueryFilter,
  );

  return { isInitQueryFilter, setIsInitQueryFilter };
};

export default useQueryInitFilterHooks;
