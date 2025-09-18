import React from "react";

import { useTranslation } from "react-i18next";

import useDropdown from "@repo/hooks/dropdown/useDropdown";

import {
  DownIcon,
  INSPECTION_STATUS_OBJECT_ARRAY,
  STATUS_ICONS,
  STATUS_ICON_COLOR,
} from "~assets";
import type { ChecklistType } from "~types";

import * as S from "./StatusDropdown.styled";
import useStatusDropdown from "./hooks/useStatusDropdown";

interface StatusDropdownProps {
  listId: string;
  type: ChecklistType;
}

const StatusDropdown = ({ listId, type }: StatusDropdownProps) => {
  const { t } = useTranslation();

  const { selectedOption, handleSelect } = useStatusDropdown({ type, listId });
  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown({
      tagValue: selectedOption.key,
      handleSelect,
      handleConditionBlur: undefined,
      handleConditionFocus: undefined,
    });

  const SelectedIcon = selectedOption.key
    ? STATUS_ICONS[selectedOption.key as keyof typeof STATUS_ICONS]
    : null;

  return (
    <S.StatusDropdown ref={dropdownRef}>
      <S.OpenDropdownOptionButton type="button" onClick={handleOpener}>
        <S.PlaceHolder hasKey={!!selectedOption.key}>
          {SelectedIcon && (
            <SelectedIcon
              css={S.resultIcon(
                STATUS_ICON_COLOR[
                  selectedOption.key as keyof typeof STATUS_ICONS
                ],
              )}
            />
          )}
          {selectedOption.label ? t(selectedOption.label) : null}
        </S.PlaceHolder>
        <DownIcon css={S.chevronDownIcon(isOpen)} />
      </S.OpenDropdownOptionButton>
      <S.DropdownOptionWrapper ref={optionsRef} isOpen={isOpen}>
        {INSPECTION_STATUS_OBJECT_ARRAY.map(({ key, label }, i) => {
          const SelectedIcon = STATUS_ICONS[key];

          return (
            <S.OptionButton
              key={i}
              type="button"
              onClick={handleOptionClick(key)}
            >
              <SelectedIcon css={S.resultIcon(STATUS_ICON_COLOR[key])} />
              {t(label)}
            </S.OptionButton>
          );
        })}
      </S.DropdownOptionWrapper>
    </S.StatusDropdown>
  );
};

export default StatusDropdown;
