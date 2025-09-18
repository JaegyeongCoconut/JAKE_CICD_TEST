import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { ValueOf } from "@repo/types";

import type { STATUS_ICON_COLOR } from "~assets";

export const StatusDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 36px 12px 12px;
`;

export const PlaceHolder = styled.span<{ hasKey: boolean }>`
  ${({ theme, hasKey }) => css`
    ${theme.font.regular_13};
    display: flex;
    align-items: center;
    color: ${hasKey ? theme.color.gray_90 : theme.color.gray_40};
  `}
`;

export const OpenDropdownOptionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const chevronDownIcon = (isOpen: boolean) => css`
  width: 16px;
  height: 16px;
  transform: ${isOpen && "rotate(180deg)"};
`;

export const DropdownOptionWrapper = styled.div<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    position: absolute;
    top: calc(100% + 4px);
    left: 0px;
    display: ${isOpen ? "block" : "none"};
    width: 100%;
    border: 1px solid ${theme.color.gray_30};
    box-shadow: ${theme.boxShadow.shadow_bold};
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.DROPDOWN};
  `}
`;

export const OptionButton = styled.button`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid ${theme.color.gray_30};
    padding: 0 12px;
    color: ${theme.color.gray_60};
    background-color: ${theme.color.white_00};

    :hover {
      color: ${theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }
  `}
`;

export const resultIcon =
  (color: ValueOf<typeof STATUS_ICON_COLOR>) => (theme: Theme) => css`
    width: 16px;
    height: 16px;
    margin-right: 4px;

    & > path {
      fill: ${theme.color[color]};
    }
  `;
