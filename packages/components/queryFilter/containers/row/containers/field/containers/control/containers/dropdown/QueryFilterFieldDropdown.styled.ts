import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterFieldDropdown = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface QueryFilterFieldDropdownOpenButtonProps {
  isOpenDropdown: boolean;
}

export const QueryFilterFieldDropdownOpenButton = styled.button<QueryFilterFieldDropdownOpenButtonProps>`
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

interface SelectQueryFilterFieldDropdownProps {
  isSelected: boolean;
}

export const SelectQueryFilterFieldDropdown = styled.div<SelectQueryFilterFieldDropdownProps>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    color: ${isSelected ? theme.color.gray_90 : theme.color.gray_40};
  `}
`;

export const QueryFilterFieldDropdownsWrapper = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    top: 52px;
    width: 100%;
    max-height: 402px;
    border: 1px solid ${theme.color.gray_30};
    border-bottom: 0;
    box-shadow: ${theme.boxShadow.shadow_medium};
    overflow: auto;
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.DIALOG};
  `}
`;

interface QueryFilterFieldDropdownItemProps {
  isSelected: boolean;
}

export const QueryFilterFieldDropdownItem = styled.button<QueryFilterFieldDropdownItemProps>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid ${theme.color.gray_30};
    padding: 0 20px;
    color: ${isSelected ? theme.color.blue_60 : theme.color.gray_70};

    :hover {
      color: ${isSelected ? theme.color.blue_60 : theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }
  `}
`;

export const checkeIcon = (theme: Theme) => css`
  width: 16px;

  path {
    fill: ${theme.color.blue_60};
  }
`;
