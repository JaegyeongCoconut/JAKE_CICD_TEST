import React, { createContext, useContext, useEffect, useId } from "react";

import { CheckIcon, ChevronDownIcon } from "@repo/assets/icon";
import { DATE_QUERY_KEYS } from "@repo/assets/static";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useFilterStore } from "@repo/stores/filter";
import type { FilterLabels, Languages } from "@repo/types";
import { formatFilterDate } from "@repo/utils/filter";

import * as S from "./Filter.styled";
import useFilterBorderLine from "./hooks/useFilterBorderLine";
import useFilterCalendar from "./hooks/useFilterCalendar";
import useFilterDropdown from "./hooks/useFilterDropdown";
import useFilterInput from "./hooks/useFilterInput";
import useFilterRadio from "./hooks/useFilterRadio";
import useFilterSearchLabel from "./hooks/useFilterSearchLabel";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import Input from "../input/Input";
import CalendarInput from "../input/calendar/CalendarInput";
import SelectedLabel from "../label/selected/SelectedLabel";

interface FilterProps {
  className?: string;
  children: React.ReactNode;
  isLoadingApplyButton: boolean;
  filterLocalValue: { [key: string]: string | string[] };
  filterLabels: FilterLabels;
  filterButtonMarginButton?: number;
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void;
  handleTotalValueChange: (queryKey: string, searchResult: string[]) => void;
  handleLocalValueReset: () => void;
  handleTotalValueReset: () => void;
}

interface FilterContextProps {
  filterLocalValue: { [key: string]: string | string[] };
  filterLabels: FilterLabels;
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void;
  handleSetFilterLabel: (
    queryKey: string,
    searchResult: string | string[],
  ) => void;
}

const FilterContext = createContext({
  filterLocalValue: {},
  filterLabels: {},
  handleLocalValueChange: () => {},
  handleSetFilterLabel: () => {},
} as FilterContextProps);

const Filter = ({
  className,
  children,
  isLoadingApplyButton,
  filterLocalValue,
  filterLabels,
  filterButtonMarginButton,
  handleLocalValueChange,
  handleLocalValueReset,
  handleTotalValueChange,
  handleTotalValueReset,
}: FilterProps) => {
  const { defaultLanguage } = useDefaultLanguage();
  const isInitFilter = useFilterStore((state) => state.isInitFilter);
  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);

  const {
    isApplyButtonDisabled,
    isResetButtonDisabled,
    hasLabel,
    handleSetFilterLabel,
    handleSearchLabelApply,
    handleDeleteSearchLabel,
    handleResetSearchLabel,
  } = useFilterSearchLabel(
    filterLabels,
    handleLocalValueChange,
    handleLocalValueReset,
    handleTotalValueChange,
    handleTotalValueReset,
  );

  // TODO: 추후 useFilterState로 useEffect 구문을 이관할지 논의 필요
  useEffect(() => {
    return () => {
      if (isInitFilter) return;

      setIsInitFilter(true);
    };
  }, [isInitFilter]);

  return (
    <FilterContext.Provider
      value={{
        filterLabels,
        filterLocalValue,
        handleLocalValueChange,
        handleSetFilterLabel,
      }}
    >
      <S.Filter className={className}>
        {children}
        {hasLabel && (
          <S.SearchLabelBoxWrapper>
            <S.SearchLabelWrapper>
              {Object.entries(filterLabels).map(
                ([key, { searches, queryKey, selections }]) =>
                  searches.map((search) => {
                    const selectValue = selections?.find(
                      (item) => item.key === search,
                    );

                    return (
                      <SelectedLabel
                        key={`${queryKey} - ${search}`}
                        handleLabelDelete={handleDeleteSearchLabel(key)}
                      >
                        <S.SearchName>
                          {defaultLanguage(queryKey[key])}:{" "}
                        </S.SearchName>
                        <S.SearchValue>
                          {selections
                            ? selectValue && defaultLanguage(selectValue.label)
                            : search}
                        </S.SearchValue>
                      </SelectedLabel>
                    );
                  }),
              )}
            </S.SearchLabelWrapper>
          </S.SearchLabelBoxWrapper>
        )}
      </S.Filter>
      <S.FilterButtonWrapper marginButton={filterButtonMarginButton}>
        {/* NOTE: Reset 버튼 활성화 조건 
                  - '선택된 필터 표' 항목 중 하나 이상 존재 할 경우 Enabled 
        */}
        <Button
          disabled={isResetButtonDisabled}
          variant="secondary"
          label="Reset"
          isLoading={false}
          handleButtonClick={handleResetSearchLabel}
        />
        {/* 
           NOTE:  Apply 버튼 활성화 조건 
                  - 필수 선택 값 존재 O: 초기 비활성화된 상태이고, '필수 선택 값'이 선택되어야만 활성화 
                  - 필수 선택 값 존재 X: 활성화        
        */}
        <Button
          disabled={isApplyButtonDisabled}
          isLoading={isLoadingApplyButton}
          variant="primary"
          label="Apply"
          handleButtonClick={handleSearchLabelApply}
        />
      </S.FilterButtonWrapper>
    </FilterContext.Provider>
  );
};

interface RowProps {
  className?: string;
  children: React.ReactNode;
  partition?: number;
}

Filter.Row = function Row({ className, children, partition }: RowProps) {
  return (
    <S.Row className={className} partition={partition}>
      {children}
    </S.Row>
  );
};

interface ConditionContextProps {
  isConditionFocus: boolean;
  isConditionError: boolean;
  handleConditionFocus: () => void;
  handleConditionBlur: () => void;
  handleConditionErrorCreate: () => void;
  handleConditionErrorDelete: () => void;
}

const ConditionContext = createContext({} as ConditionContextProps);

interface ConditionProps {
  conditionName: Languages;
  isRequired?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

Filter.Condition = function Condition({
  conditionName,
  isRequired,
  disabled,
  children,
}: ConditionProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    isConditionFocus,
    isConditionError,
    handleConditionFocus,
    handleConditionBlur,
    handleConditionErrorCreate,
    handleConditionErrorDelete,
  } = useFilterBorderLine();

  return (
    <ConditionContext.Provider
      value={{
        isConditionFocus,
        isConditionError,
        handleConditionFocus,
        handleConditionBlur,
        handleConditionErrorCreate,
        handleConditionErrorDelete,
      }}
    >
      <S.ConditionWrapper disabled={disabled}>
        <S.ConditionName
          isConditionFocus={isConditionFocus}
          isConditionError={isConditionError}
        >
          {defaultLanguage(conditionName)}
          {isRequired && <S.Required>*</S.Required>}
        </S.ConditionName>
        <S.Condition
          isConditionFocus={isConditionFocus}
          isConditionError={isConditionError}
        >
          {children}
        </S.Condition>
      </S.ConditionWrapper>
    </ConditionContext.Provider>
  );
};

interface InputProps {
  maxLength?: number;
  typingValueLength?: number;
  queryKey: string;
  placeholder: Languages;
  typingValueBlockRegExp?: RegExp;
  typingValueReplacement?: {
    regExp: RegExp;
    func: (v: string) => string;
  };
}

Filter.Input = function FilterInput({
  maxLength,
  typingValueLength,
  queryKey,
  placeholder,
  typingValueBlockRegExp,
  typingValueReplacement,
}: InputProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    handleConditionFocus,
    handleConditionBlur,
    handleConditionErrorCreate,
    handleConditionErrorDelete,
  } = useContext(ConditionContext);

  const { filterLocalValue, handleLocalValueChange, handleSetFilterLabel } =
    useContext(FilterContext);

  const {
    inputRef,
    applyButtonRef,
    isVisibleApplyButton,
    inputValue,
    handleFocusInput,
    handleBlurInput,
    handleInputChange,
    handleSearchInput,
  } = useFilterInput(
    queryKey,
    filterLocalValue,
    handleConditionFocus,
    handleConditionBlur,
    handleConditionErrorCreate,
    handleConditionErrorDelete,
    handleLocalValueChange,
    handleSetFilterLabel,
    typingValueBlockRegExp,
    typingValueReplacement,
    typingValueLength,
  );

  return (
    <S.InputWrapper onSubmit={handleSearchInput}>
      <Input
        css={S.input}
        ref={inputRef}
        value={inputValue}
        maxLength={maxLength}
        placeholder={placeholder}
        handleBlur={handleBlurInput}
        handleChange={handleInputChange}
        handleFocus={handleFocusInput}
      />
      {isVisibleApplyButton && (
        <S.InputApplyButton ref={applyButtonRef} onBlur={handleBlurInput}>
          {defaultLanguage("Apply")}
        </S.InputApplyButton>
      )}
    </S.InputWrapper>
  );
};

interface RadioProps {
  disabled?: boolean;
  queryKey: string;
  radios: readonly { key: string; label: Languages }[];
}

Filter.Radio = function Radio({ disabled, queryKey, radios }: RadioProps) {
  const { defaultLanguage } = useDefaultLanguage();
  const uuid = useId();

  const { filterLocalValue, handleLocalValueChange, handleSetFilterLabel } =
    useContext(FilterContext);
  const { handleRadioClick } = useFilterRadio(
    queryKey,
    handleLocalValueChange,
    handleSetFilterLabel,
  );

  return (
    <S.RadioWrapper>
      {radios.map((radio, i) => (
        <S.RadioButton key={i} radioKey={radio.key}>
          <input
            id={uuid + i}
            type="radio"
            checked={filterLocalValue[queryKey] === radio.key}
            disabled={disabled}
            name={queryKey}
            value={radio.key}
            onChange={handleRadioClick(queryKey, radio.key)}
          />
          <label htmlFor={uuid + i} tabIndex={0}>
            {defaultLanguage(radio.label as Languages)}
          </label>
        </S.RadioButton>
      ))}
    </S.RadioWrapper>
  );
};

interface CalendarProps {
  className?: string;
  disabled?: boolean;
  calendarType: "date" | "free";
  queryKey: Partial<Record<(typeof DATE_QUERY_KEYS)[number], Languages>>;
  dropdowns?: readonly { key: string; label: Languages }[];
}

Filter.Calendar = function Calendar({
  className,
  disabled,
  calendarType,
  queryKey,
  dropdowns,
}: CalendarProps) {
  const { handleConditionFocus, handleConditionBlur } =
    useContext(ConditionContext);
  const { filterLocalValue, handleLocalValueChange, handleSetFilterLabel } =
    useContext(FilterContext);

  const {
    dateTypeDropdown,
    dateQueryKey,
    handleDateTypeSelect,
    handleFilterDateChange,
  } = useFilterCalendar(
    queryKey,
    filterLocalValue,
    handleLocalValueChange,
    handleSetFilterLabel,
    dropdowns,
  );

  const dateValues = filterLocalValue[dateQueryKey];
  const dataValue = formatFilterDate(dateValues);

  return (
    <S.CalendarWrapper className={className} disabled={disabled}>
      {dropdowns && (
        <Dropdown
          css={S.dropdown}
          options={dropdowns ?? []}
          selectedOption={dateTypeDropdown}
          handleSelect={handleDateTypeSelect}
          handleConditionFocus={handleConditionFocus}
          handleConditionBlur={handleConditionBlur}
        />
      )}
      <CalendarInput
        css={S.calendar}
        disabled={disabled}
        dialogPosition="down"
        type={calendarType}
        selectedDate={
          typeof dateValues === "object" ? dateValues : [dateValues]
        }
        value={dataValue}
        handleDateChange={handleFilterDateChange}
        handleConditionFocus={handleConditionFocus}
        handleConditionBlur={handleConditionBlur}
      />
    </S.CalendarWrapper>
  );
};

interface DropdownProps {
  queryKey: string;
  placeholder?: Languages;
  link?: string;
  disabled?: boolean;
  dropdowns?:
    | { key: string; label: Languages }[]
    | readonly { key: string; label: Languages }[];
}

Filter.Dropdown = function Dropdown({
  queryKey,
  placeholder,
  link,
  disabled,
  dropdowns,
}: DropdownProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const { handleConditionFocus, handleConditionBlur } =
    useContext(ConditionContext);
  const { filterLocalValue, handleLocalValueChange, handleSetFilterLabel } =
    useContext(FilterContext);

  const {
    dropdownRef,
    isOpenDropdown,
    selectDropdown,
    handleOpenDropdown,
    handleCloseDropdown,
    handleDropdownSelect,
  } = useFilterDropdown(
    queryKey,
    dropdowns ?? [],
    handleConditionFocus,
    handleConditionBlur,
    handleLocalValueChange,
    handleSetFilterLabel,
    link,
  );

  return (
    <S.Dropdown ref={dropdownRef}>
      <S.OpenButton
        type="button"
        isOpenDropdown={isOpenDropdown}
        disabled={!dropdowns || disabled}
        onClick={isOpenDropdown ? handleCloseDropdown : handleOpenDropdown}
      >
        <S.SelectDropdown
          isSelected={!!selectDropdown && !!filterLocalValue[queryKey]}
        >
          {filterLocalValue[queryKey]
            ? defaultLanguage(selectDropdown?.label as Languages)
            : defaultLanguage(placeholder as Languages)}
        </S.SelectDropdown>
        <ChevronDownIcon />
      </S.OpenButton>
      {isOpenDropdown && dropdowns && (
        <S.DropdownsWrapper>
          {dropdowns.map((dropdown, i) => (
            <li key={i}>
              <S.DropdownItem
                type="button"
                isSelected={dropdown.key === selectDropdown?.key}
                onClick={handleDropdownSelect(dropdown, queryKey)}
              >
                {defaultLanguage(dropdown.label)}
                {dropdown.key === selectDropdown?.key && (
                  <CheckIcon css={S.checkeIcon} />
                )}
              </S.DropdownItem>
            </li>
          ))}
        </S.DropdownsWrapper>
      )}
    </S.Dropdown>
  );
};

export default Filter;
