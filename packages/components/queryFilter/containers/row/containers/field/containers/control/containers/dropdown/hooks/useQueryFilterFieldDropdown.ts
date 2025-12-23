import { useContext, useState } from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";
import type { QueryFilterStateMaped } from "@repo/types";

import { QueryFilterFieldStateContext } from "../../../../../context/QueryFilterFieldStateContext";

interface UseQueryFilterFieldDropdownProps<T extends string> {
  queryFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.DROPDOWN]
    | undefined;
}

const useQueryFilterFieldDropdown = <T extends string>({
  queryFilter,
}: UseQueryFilterFieldDropdownProps<T>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { handleBlur, handleFocus } = useContext(QueryFilterFieldStateContext);

  const updateTagValue = useQueryFilterStateStore(
    (state) => state.onUpdateTagValue,
  );

  const handleDropdownClose = (): void => {
    handleBlur();
    setIsOpenDropdown(false);
  };
  const handleDropdownOpen = (): void => {
    handleFocus();
    setIsOpenDropdown(true);
  };
  const handleDropdownOptionClick = (queryKey: T, key: string) => (): void => {
    if (!queryFilter) return;

    updateTagValue({ queryKey, options: "single", selectedKey: key });
    handleDropdownClose();
  };

  return {
    isOpenDropdown,
    handleDropdownOpen,
    handleDropdownOptionClick,
    handleDropdownClose,
  };
};

export default useQueryFilterFieldDropdown;
