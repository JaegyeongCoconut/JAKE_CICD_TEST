import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import useQueryParams from "@repo/hooks/useQueryParams";

const useQuerySearchInput = (
  searchQueryKey: string,
  deletionQueryKeys?: string[],
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [queryInput, setQueryInput] = useState("");

  const { updateQueryParam } = useQueryParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQueryInput(e.target.value);
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!queryInput) {
      setSearchParams("");
      return;
    }

    updateQueryParam({ [searchQueryKey]: queryInput }, deletionQueryKeys);
  };

  const handleInputReset = (): void => {
    setQueryInput("");
    setSearchParams("");
  };

  useEffect(() => {
    setQueryInput(searchParams.get(searchQueryKey) || "");
  }, [searchParams.get(searchQueryKey)]);

  return { queryInput, handleInputChange, handleInputReset, handleSearch };
};

export default useQuerySearchInput;
