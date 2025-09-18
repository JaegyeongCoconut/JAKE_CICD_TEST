import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateMaped } from "@repo/types";

interface UseFilterFieldRadioProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.RADIO]
    | undefined;
}

const useQueryFilterFieldRadio = <T extends string>({
  queryFilter,
}: UseFilterFieldRadioProps<T>) => {
  const { updateTagValue } = useQueryFilterHooks();

  const handleRadioButtonClick = (selectedKey: string) => (): void => {
    if (!queryFilter) return;

    updateTagValue({ queryKey: queryFilter.queryKey, selectedKey });
  };

  return { handleRadioButtonClick };
};

export default useQueryFilterFieldRadio;
