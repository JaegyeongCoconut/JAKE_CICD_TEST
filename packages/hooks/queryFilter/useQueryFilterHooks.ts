import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";

const useQueryFilterHooks = () => {
  const queryFilters = useQueryFilterStateStore((state) => state.queryFilters);
  const setQueryFilters = useQueryFilterStateStore(
    (state) => state.onSetQueryFilters,
  );
  const resetAllValues = useQueryFilterStateStore(
    (state) => state.onResetAllValues,
  );
  const updateInputValue = useQueryFilterStateStore(
    (state) => state.onUpdateInputValue,
  );
  const updateQueryKey = useQueryFilterStateStore(
    (state) => state.onUpdateQueryKey,
  );
  const updateTagValue = useQueryFilterStateStore(
    (state) => state.onUpdateTagValue,
  );

  return {
    queryFilters,
    setQueryFilters,
    resetAllValues,
    updateInputValue,
    updateQueryKey,
    updateTagValue,
  };
};

export default useQueryFilterHooks;
