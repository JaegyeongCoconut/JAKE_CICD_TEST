import React from "react";

import { v4 as uuidv4 } from "uuid";

import { CheckIcon, ChevronDownIcon, ErrorIcon } from "@repo/assets/icon";
import useDropdown from "@repo/hooks/dropdown/useDropdown";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { DropdownOptionType, Languages } from "@repo/types";

import * as S from "./Dropdown.styled";
import DropdownOptionSkeleton from "./containers/optionSkeleton/DropdownOptionSkeleton";

interface DropdownProps {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  options: readonly DropdownOptionType<Languages>[];
  placeholder?: Languages;
  selectedOption: DropdownOptionType<Languages>;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  handleSelect?: (value: string) => void;
  handleConditionFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  handleConditionBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const Dropdown = ({
  className,
  isLoading = false,
  disabled,
  hasError,
  options,
  placeholder,
  selectedOption,
  Icon = ChevronDownIcon,
  handleSelect,
  handleConditionFocus,
  handleConditionBlur,
}: DropdownProps) => {
  const id = uuidv4();
  const { defaultLanguage } = useDefaultLanguage();

  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown(
      selectedOption.key,
      handleSelect,
      handleConditionFocus,
      handleConditionBlur,
    );

  return (
    <S.Dropdown ref={dropdownRef} className={className}>
      <S.DropdownButton
        aria-controls={id}
        aria-expanded={isOpen}
        hasError={hasError}
        disabled={disabled}
        type="button"
        onClick={handleOpener}
      >
        {selectedOption?.label ? (
          <S.SelectedValue>
            {defaultLanguage(selectedOption.label)}
          </S.SelectedValue>
        ) : (
          placeholder && (
            <S.Placeholder>{defaultLanguage(placeholder)}</S.Placeholder>
          )
        )}
        <Icon />
      </S.DropdownButton>
      <S.OptionWrapper ref={optionsRef} id={id} isOpen={isOpen}>
        {isLoading ? (
          [...Array(10)].map((_, i) => (
            <S.Option key={i}>
              <DropdownOptionSkeleton />
            </S.Option>
          ))
        ) : options.length === 0 ? (
          <S.NoOptionData>
            <ErrorIcon css={S.noOptionIcon} />
            <S.noOptionDataMessage>
              {defaultLanguage("No history")}
            </S.noOptionDataMessage>
          </S.NoOptionData>
        ) : (
          options.map(({ key, label }, i) => {
            const isSelected = selectedOption?.key === key;

            return (
              <S.Option key={key + i}>
                <S.OptionButton
                  type="button"
                  onClick={handleOptionClick(key)}
                  isSelected={isSelected}
                >
                  <span>
                    {label === "English" ? label : defaultLanguage(label)}
                  </span>
                  <CheckIcon css={S.singleDropdownCheckIcon(isSelected)} />
                </S.OptionButton>
              </S.Option>
            );
          })
        )}
      </S.OptionWrapper>
    </S.Dropdown>
  );
};

export default Dropdown;
