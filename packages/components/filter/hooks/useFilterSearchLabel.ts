import { isEmpty } from "lodash-es";
import { useSearchParams } from "react-router-dom";

import { DATE_QUERY_KEYS } from "@repo/assets/static";
import { useFilterStore } from "@repo/stores/filter";
import type { FilterLabels } from "@repo/types";

const useFilterSearchLabel = (
  filterLabels: FilterLabels,
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void,
  handleLocalValueReset: () => void,
  handleTotalValueChange: (queryKey: string, searchResult: string[]) => void,
  handleTotalValueReset: () => void,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isInitFilter = useFilterStore((state) => state.isInitFilter);
  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);

  const hasLabel = Object.values(filterLabels).some(
    ({ searches }) => searches?.length !== 0,
  );

  const isResetButtonDisabled =
    isEmpty(filterLabels) ||
    Object.entries(filterLabels).every(
      ([key, { searches }]) => searches?.length === 0 && !searchParams.get(key),
    );

  const isApplyButtonDisabled =
    isEmpty(filterLabels) ||
    Object.values(filterLabels).some(
      ({ searches, options }) => options?.isRequired && searches?.length === 0,
    );

  const handleDeleteSearchLabel = (queryKey: string) => (): void => {
    handleLocalValueChange(queryKey, "");
    handleTotalValueChange(queryKey, []);
  };

  const handleResetSearchLabel = (): void => {
    handleLocalValueReset();
    handleTotalValueReset();
  };

  const handleSearchLabelApply = (): void => {
    const searchFilter = Object.entries(filterLabels).reduce(
      (acc, [key, { searches }]) => {
        if (!searches.length) return acc;

        return { ...acc, [key]: searches[0] };
      },
      {},
    );

    setSearchParams(
      {
        ...(searchParams.get("tab") && { tab: searchParams.get("tab")! }),
        ...(searchParams.get("subTab") && {
          subTab: searchParams.get("subTab")!,
        }),
        ...searchFilter,
        page: "1",
      },
      { replace: true },
    );

    isInitFilter && setIsInitFilter(false);
  };

  const getSearchValues = (
    queryKey: string,
    searchResult: string | string[],
  ): string | string[] => {
    const hasDateQueryKey = (
      key: string,
    ): key is (typeof DATE_QUERY_KEYS)[number] =>
      DATE_QUERY_KEYS.includes(key as (typeof DATE_QUERY_KEYS)[number]);

    if (hasDateQueryKey(queryKey) && typeof searchResult === "object") {
      return `${searchResult[0]} ~ ${searchResult[1] ?? searchResult[0]}`;
    }

    return searchResult;
  };

  const handleSetFilterLabel = (
    queryKey: string,
    searchResult: string | string[],
  ): void => {
    const searches = getSearchValues(queryKey, searchResult);

    handleTotalValueChange(
      queryKey,
      searches ? (typeof searches === "object" ? searches : [searches]) : [],
    );
  };

  return {
    isResetButtonDisabled,
    isApplyButtonDisabled,
    hasLabel,
    handleSetFilterLabel,
    handleSearchLabelApply,
    handleDeleteSearchLabel,
    handleResetSearchLabel,
  };
};

export default useFilterSearchLabel;
