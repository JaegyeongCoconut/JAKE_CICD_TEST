import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Filter = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin: 40px 0 12px;
    border: 1px solid ${theme.color.gray_20};
    border-bottom: 0;
  `}
`;

export const SearchLabelBoxWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid ${theme.color.gray_20};
    background-color: ${theme.color.white};
  `}
`;

export const SearchLabelWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 8px;
  row-gap: 12px;
  max-width: fit-content;
`;

export const ResetButton = styled.button`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 73px;
    height: 32px;
    margin-right: 33px;
    padding: 5px 8px;
    color: ${theme.color.gray_60};

    ::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -8px;
      width: 1px;
      height: 20px;
      border-right: 1px solid ${theme.color.gray_20};
      transform: translateY(-50%);
    }
  `}
`;

export const SearchName = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    margin-right: 4px;
    color: ${theme.color.black};
  `}
`;

export const SearchValue = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.black};
  `}
`;

interface RowProps {
  partition?: number;
}

export const Row = styled.div<RowProps>`
  ${({ theme, partition }) => css`
    display: grid;
    grid-template-columns: repeat(${partition}, 1fr);
    border-bottom: 1px solid ${theme.color.gray_20};
    background-color: ${theme.color.white};
  `}
`;

interface ConditionWrapperProps {
  disabled?: boolean;
}

export const ConditionWrapper = styled.div<ConditionWrapperProps>`
  ${({ theme, disabled }) => css`
    display: grid;
    grid-template-columns: 210px 1fr;

    ${disabled &&
    css`
      background-color: ${theme.color.gray_20};

      & > div:nth-of-type(1) {
        background-color: ${theme.color.gray_30};
      }

      & > div:nth-of-type(2) > ul > li > label {
        background-color: ${theme.color.gray_20};
        color: ${theme.color.gray_50};

        &:hover {
          cursor: not-allowed;
        }
      }

      &:hover {
        cursor: not-allowed;
      }
    `}
  `}
`;

interface ConditionNameProps {
  isConditionFocus: boolean;
  isConditionError: boolean;
}

export const ConditionName = styled.div<ConditionNameProps>`
  ${({ theme, isConditionFocus, isConditionError }) => css`
    ${theme.font.medium_14};
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: ${isConditionError
      ? `1px solid ${theme.color.red_20}`
      : isConditionFocus && `1px solid ${theme.color.blue_10}`};
    padding: 13px 20px;
    color: ${isConditionError
      ? theme.color.red_20
      : isConditionFocus
        ? theme.color.blue_10
        : theme.color.gray_60};
    background-color: ${isConditionError
      ? theme.color.red_10_10
      : isConditionFocus
        ? theme.color.blue_10_10
        : theme.color.gray_10};
  `}
`;

interface ConditionProps {
  isConditionFocus: boolean;
  isConditionError: boolean;
}

export const Condition = styled.div<ConditionProps>`
  ${({ theme, isConditionFocus, isConditionError }) => css`
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: ${isConditionError
      ? `1px solid ${theme.color.red_20}`
      : isConditionFocus && `1px solid ${theme.color.blue_10}`};
  `}
`;

export const Required = styled.span`
  ${({ theme }) => css`
    margin-left: 4px;
    color: ${theme.color.red_30};
  `}
`;

export const InputWrapper = styled.form`
  position: relative;
  width: 100%;
  padding: 13px 20px;
`;

export const input = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0 60px 0 0;

  :focus {
    border: 0;
  }

  ::placeholder {
    color: ${theme.color.gray_40};
  }
`;

export const InputApplyButton = styled.button`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    position: absolute;
    top: 50%;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 28px;
    border-radius: 4px;
    color: ${theme.color.blue_10};
    background-color: ${theme.color.gray_10};
    transform: translateY(-50%);
  `}
`;

export const RadioWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 24px;
  max-width: fit-content;
  padding: 7px 20px;
`;

interface RadioButtonProps {
  radioKey: string;
  disabled?: boolean;
}

export const RadioButton = styled.li<RadioButtonProps>`
  ${({ theme, radioKey }) => css`
    ${theme.font.regular_14};

    label {
      display: inline-block;
      height: 100%;
      border-radius: 2px;
      padding: 6px 12px;
      color: ${theme.color.gray_50};

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      :hover {
        background-color: ${theme.color.gray_10};
        cursor: pointer;
      }
    }

    input {
      display: none;
    }

    input:checked + label {
      color: ${radioKey === "all" ? theme.color.black : theme.color.white};
      background-color: ${radioKey === "all"
        ? theme.color.gray_10
        : theme.color.blue_10};
    }
  `}
`;

export const CalendarWrapper = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 4px 0;

    & > div > button {
      background-color: ${disabled && "transparent"};
    }
  `}
`;

export const dropdown = (theme: Theme) => css`
  position: relative;
  min-width: 150px;
  padding: 0 20px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 18px;
    background-color: ${theme.color.gray_30};
    transform: translateY(-50%);
  }

  && > button {
    ${theme.font.regular_13}
    border: 0;
    padding: 0;
  }

  & > ul {
    left: 10px;
    width: calc(100% - 20px);

    & > li > button {
      ${theme.font.regular_13};
    }
  }

  & + div {
    width: 100%;
  }
`;

export const calendar = css`
  width: 100%;
  height: 100%;

  & > input {
    border: 0;
    padding-left: 20px;
  }
`;

export const FilterButtonWrapper = styled.div<{ marginButton?: number }>`
  ${({ marginButton }) => css`
    display: flex;
    column-gap: 9px;
    justify-content: flex-end;
    margin-bottom: ${marginButton ?? 40}px;
  `}
`;

export const Dropdown = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface OpenButtonProps {
  isOpenDropdown: boolean;
}

export const OpenButton = styled.button<OpenButtonProps>`
  ${({ theme, isOpenDropdown }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 14px 20px;

    & > svg {
      width: 16px;
      height: 16px;
      transform: ${isOpenDropdown && "rotate(180deg)"};

      & > path {
        fill: ${theme.color.gray_80};
      }
    }

    &:disabled {
      svg path {
        fill: ${theme.color.gray_50};
      }
    }
  `}
`;

interface SelectDropdownProps {
  isSelected: boolean;
}

export const SelectDropdown = styled.div<SelectDropdownProps>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    color: ${isSelected ? theme.color.black : theme.color.gray_40};
  `}
`;

export const DropdownsWrapper = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    top: 52px;
    width: 100%;
    max-height: 402px;
    border: 1px solid ${theme.color.gray_30};
    border-bottom: 0;
    background-color: ${theme.color.white};
    box-shadow: ${theme.boxShadow.shadow_medium};
    overflow: auto;
    z-index: ${theme.zIndex.DIALOG};
  `}
`;

interface DropdownItemProps {
  isSelected: boolean;
}

export const DropdownItem = styled.button<DropdownItemProps>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid ${theme.color.gray_30};
    padding: 0 20px;
    color: ${isSelected ? theme.color.blue_10 : theme.color.gray_70};

    :hover {
      color: ${isSelected ? theme.color.blue_10 : theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }
  `}
`;

export const checkeIcon = (theme: Theme) => css`
  width: 16px;

  path {
    fill: ${theme.color.blue_10};
  }
`;
