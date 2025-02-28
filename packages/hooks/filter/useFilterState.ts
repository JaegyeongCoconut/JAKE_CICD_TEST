import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";

import type { FilterLabels, FilterSearchLabels } from "@repo/types";

const useFilterState = (
  defaultValue: { [key: string]: string | string[] },
  searchLabels: ReadonlyArray<FilterSearchLabels>,
) => {
  const [searchParams] = useSearchParams();

  const [filterLabels, setFilterLabels] = useImmer<FilterLabels>({});
  const [filterLocalValue, setFilterLocalValue] = useImmer<{
    [key: string]: string | string[];
  }>(defaultValue);

  const handleTotalValueChange = (
    queryKey: string,
    searchResult: string[],
  ): void => {
    setFilterLabels((prev) => ({
      ...prev,
      [queryKey]: {
        ...prev[queryKey],
        searches: searchResult,
      },
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
    setFilterLocalValue(defaultValue);
  };

  const handleTotalValueReset = (): void => {
    const totalFilterLabels = searchLabels.reduce<FilterLabels>(
      (acc, { queryKeyLabel, selections, options }) => {
        const filterLabel = Object.entries(queryKeyLabel).reduce(
          (subFilterLabels, [key, label]) => ({
            ...subFilterLabels,
            [key]: {
              queryKey: { [key]: label },
              searches: [],
              ...(selections && { selections }),
              ...(options && { options }),
            },
          }),
          {} as any, // TODO: Type 수정
        );
        return { ...acc, ...filterLabel };
      },
      {},
    );

    setFilterLabels(totalFilterLabels);
  };

  useEffect(() => {
    const totalFilterLabels = searchLabels.reduce<FilterLabels>(
      (acc, { queryKeyLabel, selections, options }) => {
        const filterLabel = Object.entries(queryKeyLabel).reduce(
          (subFilterLabels, [key, label]) => ({
            ...subFilterLabels,
            [key]: {
              queryKey: { [key]: label },
              searches: searchParams.getAll(key) ?? [],
              ...(selections && { selections }),
              ...(options && { options }),
            },
          }),
          {}, // TODO: Type 수정
        );

        return { ...acc, ...filterLabel };
      },
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

export default useFilterState;
