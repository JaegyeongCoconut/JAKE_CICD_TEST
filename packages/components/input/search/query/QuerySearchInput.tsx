import React from "react";

import type { Languages } from "@repo/types";

import SearchInput from "../SearchInput";
import useQuerySearchInput from "./hooks/useQuerySearchInput";

interface QuerySearchInputProps {
  className?: string;
  inputAsidePadding: number;
  iconAsidePadding: number;
  placeholder: Languages;
  searchQueryKey: string;
  deletionQueryKeys?: string[];
}

const QuerySearchInput = ({
  className,
  inputAsidePadding,
  iconAsidePadding,
  placeholder,
  searchQueryKey,
  deletionQueryKeys,
}: QuerySearchInputProps) => {
  const { queryInput, handleInputChange, handleSearch, handleInputReset } =
    useQuerySearchInput(searchQueryKey, deletionQueryKeys);

  return (
    <SearchInput
      className={className}
      inputAsidePadding={inputAsidePadding}
      iconAsidePadding={iconAsidePadding}
      value={queryInput}
      placeholder={placeholder}
      handleInputChange={handleInputChange}
      handleInputReset={handleInputReset}
      handleSearch={handleSearch}
    />
  );
};

export default QuerySearchInput;
