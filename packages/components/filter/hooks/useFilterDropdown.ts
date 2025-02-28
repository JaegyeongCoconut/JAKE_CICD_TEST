import { useState, useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import useOnClickOutside from "@repo/hooks/useOnClickOutside";
import type { DropdownOptionType, Languages } from "@repo/types";

const useFilterDropdown = (
  queryKey: string,
  dropdowns:
    | DropdownOptionType<Languages>[]
    | readonly DropdownOptionType<Languages>[],
  handleFocusCondition: () => void,
  handleBlurCondition: () => void,
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void,
  handleSetFilterLabel: (
    queryKey: string,
    searchResult: string | string[],
  ) => void,
  link?: string,
) => {
  const [searchParams] = useSearchParams();

  const selectedDropdown = dropdowns.filter(
    (dropdown) => dropdown.key === searchParams.get(queryKey),
  )[0];

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectDropdown, setSelectDropdown] =
    useState<DropdownOptionType<Languages> | null>(selectedDropdown ?? null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleOpenDropdown = (): void => {
    setIsOpenDropdown(true);
    handleFocusCondition();
  };
  const handleCloseDropdown = (): void => {
    setIsOpenDropdown(false);
    handleBlurCondition();
  };

  const handleDropdownSelect =
    (dropdown: DropdownOptionType<Languages>, queryKey: string) => (): void => {
      setSelectDropdown(dropdown);

      handleSetFilterLabel(queryKey, dropdown.key);
      handleLocalValueChange(queryKey, dropdown.key);

      handleCloseDropdown();
    };

  useOnClickOutside(dropdownRef, handleCloseDropdown);

  useEffect(() => {
    setSelectDropdown(selectedDropdown);
  }, [searchParams, selectedDropdown]);

  useEffect(() => {
    handleLocalValueChange(queryKey, searchParams.get(queryKey) ?? "");
  }, []);

  return {
    dropdownRef,
    isOpenDropdown,
    selectDropdown,
    handleOpenDropdown,
    handleCloseDropdown,
    handleDropdownSelect,
  };
};

export default useFilterDropdown;
