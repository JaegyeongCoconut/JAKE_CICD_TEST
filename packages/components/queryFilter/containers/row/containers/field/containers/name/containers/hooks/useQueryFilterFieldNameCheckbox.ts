import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";
import type { QueryFilterStateMaped } from "@repo/types";

interface UseQueryFilterFieldNameCheckboxProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX]
    | undefined;
}

const useQueryFilterFieldNameCheckbox = <T extends string>({
  queryFilter,
}: UseQueryFilterFieldNameCheckboxProps<T>) => {
  const updateTagValue = useQueryFilterStateStore(
    (state) => state.onUpdateTagValue,
  );

  const queryFilterSelections = queryFilter?.selections ?? [];
  const isAllChecked =
    queryFilterSelections.length > 0
      ? queryFilterSelections.every(({ key }) =>
          queryFilter?.tagValue.includes(key),
        )
      : false;

  const handleAllCheckboxClick = (queryKey: T) => (): void => {
    if (!queryFilter) return;

    const queryFilterSelectionAllKeys = queryFilterSelections.map(
      ({ key }) => key,
    );

    const allValues = isAllChecked ? [] : queryFilterSelectionAllKeys;

    updateTagValue({ queryKey, options: "array", selectedKey: allValues });
  };

  return { isAllChecked, handleAllCheckboxClick };
};

export default useQueryFilterFieldNameCheckbox;
