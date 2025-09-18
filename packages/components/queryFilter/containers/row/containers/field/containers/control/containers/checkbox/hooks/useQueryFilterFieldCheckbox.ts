import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateMaped } from "@repo/types";

interface UseQueryFilterFieldCheckboxProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.CHECKBOX]
    | undefined;
}

const useQueryFilterFieldCheckbox = <T extends string>({
  queryFilter,
}: UseQueryFilterFieldCheckboxProps<T>) => {
  const { updateTagValue } = useQueryFilterHooks();

  const handleCheckboxClick = (queryKey: T, key: string) => (): void => {
    if (!queryFilter) return;

    const tagValue = queryFilter.tagValue;

    const updatedValues = tagValue
      .filter((value) => value !== key)
      .concat(tagValue.includes(key) ? [] : key);

    updateTagValue({ queryKey, selectedKey: updatedValues });
  };

  return { handleCheckboxClick };
};

export default useQueryFilterFieldCheckbox;
