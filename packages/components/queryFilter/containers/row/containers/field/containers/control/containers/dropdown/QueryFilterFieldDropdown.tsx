import React, { useRef } from "react";

import { ReactComponent as CheckIcon } from "@repo/assets/icon/ic_check.svg";
import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useOnClickOutside from "@repo/hooks/useOnClickOutside";
import type { QueryFilterSelections } from "@repo/types";

import * as S from "./QueryFilterFieldDropdown.styled";
import useQueryFilterFieldDropdown from "./hooks/useQueryFilterFieldDropdown";

interface QueryFilterFieldDropdownProps<T extends string> {
  disabled: boolean;
  queryKey: T;
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.DROPDOWN;
}

const QueryFilterFieldDropdown = <T extends string>({
  type,
  queryKey,
  disabled,
  selections,
}: QueryFilterFieldDropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const querFilter = useTypedQueryFilterState({ type, queryKey });
  const {
    isOpenDropdown,
    handleDropdownOpen,
    handleDropdownOptionClick,
    handleDropdownClose,
  } = useQueryFilterFieldDropdown({ querFilter });

  const { defaultLanguage } = useDefaultLanguage();

  useOnClickOutside({
    ref: dropdownRef,
    handler: handleDropdownClose,
    exceptEl: undefined,
  });

  if (!querFilter) return null;

  const { tagValue } = querFilter;

  return (
    <S.QueryFilterFieldDropdown ref={dropdownRef}>
      <S.QueryFilterFieldDropdownOpenButton
        disabled={disabled}
        isOpenDropdown={isOpenDropdown}
        type="button"
        onClick={isOpenDropdown ? handleDropdownClose : handleDropdownOpen}
      >
        <S.SelectQueryFilterFieldDropdown isSelected={!!tagValue}>
          {defaultLanguage(
            selections.find(({ key }) => key === tagValue)?.label ??
              querFilter.placeholder,
          )}
        </S.SelectQueryFilterFieldDropdown>
        <DownIcon />
      </S.QueryFilterFieldDropdownOpenButton>
      {isOpenDropdown && (
        <S.QueryFilterFieldDropdownsWrapper>
          {selections.map(({ key, label }, i) => (
            <li key={i}>
              <S.QueryFilterFieldDropdownItem
                isSelected={key === tagValue}
                type="button"
                onClick={handleDropdownOptionClick(queryKey, key)}
              >
                {defaultLanguage(label)}
                {key === tagValue && <CheckIcon css={S.checkeIcon} />}
              </S.QueryFilterFieldDropdownItem>
            </li>
          ))}
        </S.QueryFilterFieldDropdownsWrapper>
      )}
    </S.QueryFilterFieldDropdown>
  );
};

export default QueryFilterFieldDropdown;
