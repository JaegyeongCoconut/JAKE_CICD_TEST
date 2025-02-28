import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";

import type { FilterLabels, FilterSearchLabels2 } from "@repo/types";

const useFilterState2 = <T extends string>(
  searchLabels: FilterSearchLabels2<T>,
) => {
  const [searchParams] = useSearchParams();

  const defaultValues = searchLabels.reduce(
    (acc, { filterDefaultValue, queryParameterKey: queryKey }) => ({
      ...acc,
      [queryKey]: filterDefaultValue,
    }),
    {} as { [key: string]: string | string[] },
  );

  const [filterLabels, setFilterLabels] = useImmer<FilterLabels>({});
  const [filterLocalValue, setFilterLocalValue] = useImmer<{
    [key: string]: string | string[];
  }>(defaultValues);

  const handleTotalValueChange = (
    queryKey: string,
    searchResult: string[],
  ): void => {
    setFilterLabels((prev) => ({
      ...prev,
      [queryKey]: { ...prev[queryKey], searches: searchResult },
    }));
  };

  const handleLocalValueChange = (
    queryKey: string,
    value: string | string[],
  ): void => {
    setFilterLocalValue((draft) => {
      draft[queryKey] = value;
    });
  };

  const handleLocalValueReset = (): void => {
    setFilterLocalValue(defaultValues);
  };

  const handleTotalValueReset = (): void => {
    const totalFilterLabels = searchLabels.reduce<FilterLabels>(
      (acc, { queryParameterKey, filterLabel, selections, options }) => ({
        ...acc,
        [queryParameterKey]: {
          queryKey: { [queryParameterKey]: filterLabel },
          searches: [],
          ...(selections && { selections }),
          ...(options && { options }),
        },
      }),
      {},
    );

    setFilterLabels(totalFilterLabels);
  };

  useEffect(() => {
    const totalFilterLabels = searchLabels.reduce<FilterLabels>(
      (acc, { queryParameterKey, filterLabel, selections, options }) => ({
        ...acc,
        [queryParameterKey]: {
          queryKey: { [queryParameterKey]: filterLabel },
          searches: searchParams.getAll(queryParameterKey) ?? [],
          ...(selections && { selections }),
          ...(options && { options }),
        },
      }),
      {},
    );
    setFilterLabels(totalFilterLabels);
  }, []);

  return {
    filterLocalValue,
    filterLabels,
    handleLocalValueChange,
    handleLocalValueReset,
    handleTotalValueChange,
    handleTotalValueReset,
  };
};

export default useFilterState2;
