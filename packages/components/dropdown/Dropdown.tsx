import React from "react";

import { v4 as uuidv4 } from "uuid";

import { ReactComponent as CheckIcon } from "@repo/assets/icon/ic_check.svg";
import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDropdown from "@repo/hooks/dropdown/useDropdown";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { DropdownOptionType, Languages } from "@repo/types";

import * as S from "./Dropdown.styled";
import DropdownOptionSkeleton from "./containers/optionSkeleton/DropdownOptionSkeleton";

interface BaseDropdownProps {
  className?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>; // NOTE: 공용 Header 언어 변경 Dropdown에서만 사용하기 때문에 옵셔널 설정
  placeholder: Languages;
}

interface DisabledDropdownProps extends BaseDropdownProps {
  disabled: true;
  hasError?: never;
  isLoading?: never;
  options?: never;
  selectedOption?: never;
  handleSelect?: never;
}

interface EnabledDropdownProps extends BaseDropdownProps {
  disabled: boolean;
  hasError: boolean;
  isLoading: boolean;
  options: readonly DropdownOptionType<Languages>[];
  selectedOption: DropdownOptionType<Languages>;
  handleSelect: (value: string) => void;
}

type DropdownProps = EnabledDropdownProps | DisabledDropdownProps;

const Dropdown = ({
  className,
  isLoading,
  disabled,
  hasError,
  options,
  placeholder,
  selectedOption,
  Icon = DownIcon,
  handleSelect,
}: DropdownProps) => {
  const id = uuidv4();
  const { defaultLanguage } = useDefaultLanguage();

  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown({
      tagValue: selectedOption?.key ?? "",
      handleSelect,
    });

  return (
    <S.Dropdown className={className} ref={dropdownRef}>
      <S.DropdownButton
        aria-controls={id}
        aria-expanded={isOpen}
        disabled={disabled}
        hasError={hasError}
        type="button"
        onClick={handleOpener}
      >
        {selectedOption?.label ? (
          <S.SelectedValue>
            {defaultLanguage({ text: selectedOption.label })}
          </S.SelectedValue>
        ) : (
          placeholder && (
            <S.Placeholder>
              {defaultLanguage({ text: placeholder })}
            </S.Placeholder>
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
        ) : options?.length === 0 ? (
          <S.NoOptionData>
            <WarningIcon css={S.noOptionIcon} />
            <S.noOptionDataMessage>
              {defaultLanguage({ text: LANGUAGE_LABEL.NO_HISTORY })}
            </S.noOptionDataMessage>
          </S.NoOptionData>
        ) : (
          options?.map(({ key, label }, i) => {
            const isSelected = selectedOption?.key === key;

            return (
              <S.Option key={key + i}>
                <S.OptionButton
                  isSelected={isSelected}
                  type="button"
                  onClick={handleOptionClick(key)}
                >
                  <span>
                    {label === "English"
                      ? label
                      : defaultLanguage({ text: label })}
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
