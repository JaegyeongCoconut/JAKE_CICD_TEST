import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    background: ${theme.color.white_00};
    z-index: ${theme.zIndex.HEADER};
  `}
`;

export const TabList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    column-gap: 24px;
    margin: 20px 0px;
    border-bottom: 1px solid ${theme.color.gray_20};
    background: ${theme.color.white_00};
  `}
`;

export const Tab = styled.li<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    display: flex;
    align-items: center;

    & > a {
      span {
        ${theme.font.medium_16};
        color: ${isSelected ? theme.color.blue_60 : theme.color.gray_50};
      }

      &:hover span {
        color: ${theme.color.blue_60};
      }
    }
  `}
`;

export const link = (isSelected: boolean) => (theme: Theme) => css`
  border-bottom: ${isSelected && `2px solid ${theme.color.blue_60}`};
  padding: 7px 9px;
  padding-bottom: ${isSelected && "5px"};
`;
