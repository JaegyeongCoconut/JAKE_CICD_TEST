import { useContext, useState } from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateMaped } from "@repo/types";

import { QueryFilterFieldStateContext } from "../../../../../context/QueryFilterFieldStateContext";

interface UseQueryFilterFieldDropdownProps<T extends string> {
  querFilter:
    | QueryFilterStateMaped<T>[typeof QUERY_FILTER_TYPE.DROPDOWN]
    | undefined;
}

const useQueryFilterFieldDropdown = <T extends string>({
  querFilter,
}: UseQueryFilterFieldDropdownProps<T>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { handleBlur, handleFocus } = useContext(QueryFilterFieldStateContext);

  const { updateTagValue } = useQueryFilterHooks();

  const handleDropdownClose = (): void => {
    handleBlur();
    setIsOpenDropdown(false);
  };
  const handleDropdownOpen = (): void => {
    handleFocus();
    setIsOpenDropdown(true);
  };
  const handleDropdownOptionClick = (queryKey: T, key: string) => (): void => {
    if (!querFilter) return;

    updateTagValue({ queryKey, selectedKey: key });
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
