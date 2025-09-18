import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TabHeader = styled.ul`
  ${({ theme }) => css`
    display: flex;
    column-gap: 24px;
    margin: 40px 0px;
    border-bottom: 1px solid ${theme.color.gray_20};
  `}
`;

export const Tab = styled.li<{ ariaSelected: boolean }>`
  ${({ theme, ariaSelected }) => css`
    display: flex;
    align-items: center;

    & > a {
      span {
        ${theme.font.medium_16};
        color: ${ariaSelected ? theme.color.gray_90 : theme.color.gray_50};
      }

      &:hover span {
        color: ${theme.color.gray_90};
      }
    }
  `}
`;

export const link = (isSelected: boolean) => (theme: Theme) => css`
  border-bottom: ${isSelected && `2px solid ${theme.color.gray_90}`};
  padding: 7px 9px;
  padding-bottom: ${isSelected && "5px"};
`;
