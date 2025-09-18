import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { calcTableWidth } from "@repo/utils/table";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";

export const link = (theme: Theme) => css`
  display: grid;
  grid-template-columns: ${calcTableWidth({
    tableHeaderInfos: INSPECTION_TABLE_HEADER_INFOS,
  })};
  border-bottom: 1px solid ${theme.color.gray_20};
  padding: 0 12px;
  color: inherit;

  &:hover {
    text-decoration: none;
    background-color: ${theme.color.gray_10};
  }
`;

export const IdentificationNo = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    padding: 10px 12px;

    & > p {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `}
`;

export const ModelInfoWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    padding: 10px 12px;
  `}
`;

export const ItemSpanWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const ItemSpan = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;

    & > *:not(:first-of-type)::before {
      content: "|";
      margin: 0 8px;
      color: ${theme.color.gray_30};
    }
  `}
`;

export const icon = (theme: Theme) => css`
  width: 16px;
  height: 16px;
  margin-right: 4px;

  & > path {
    fill: ${theme.color.gray_50};
  }
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
`;

export const Circle = styled.span<{ color: string }>`
  ${({ theme, color }) => css`
    width: 12px;
    height: 12px;
    margin-right: 4px;
    border: 1px solid ${theme.color.gray_30};
    border-radius: 50%;
    background-color: ${color && `#${color}`};
  `}
`;
