import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateMaped } from "@repo/types";

interface UseQueryFilterFieldNameCheckboxProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX]
    | undefined;
}

const useQueryFilterFieldNameCheckbox = <T extends string>({
  queryFilter,
}: UseQueryFilterFieldNameCheckboxProps<T>) => {
  const { updateTagValue } = useQueryFilterHooks();

  const queryFilterSelections = queryFilter?.selections ?? [];
  const isAllChecked = queryFilterSelections?.every(({ key }) =>
    queryFilter?.tagValue.includes(key),
  );

  const handleAllCheckboxClick = (queryKey: T) => (): void => {
    if (!queryFilter) return;

    const queryFilterSelectionAllKeys = queryFilterSelections.map(
      ({ key }) => key,
    );

    const allValues = isAllChecked ? [] : queryFilterSelectionAllKeys;

    updateTagValue({ queryKey, selectedKey: allValues });
  };

  return { isAllChecked, handleAllCheckboxClick };
};

export default useQueryFilterFieldNameCheckbox;
