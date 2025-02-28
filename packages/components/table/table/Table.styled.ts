import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Table = styled.table<{ gridTemplateColumns: string }>`
  ${({ theme, gridTemplateColumns }) => css`
    width: 100%;
    height: 883px;
    border: 1px solid ${theme.color.gray_20};
    border-top: 0;
    border-bottom: 0;
    cursor: default;

    tr {
      grid-template-columns: ${gridTemplateColumns};
    }

    & > thead {
      position: sticky;
      top: ${`calc(${theme.size.HEADER_HEIGHT} + ${theme.size.TABLE_HEADER_HEIGHT})`};
      z-index: ${theme.zIndex.STICKY};

      tr {
        border-top: 1px solid ${theme.color.gray_20};
      }
    }

    & > tbody > tr:nth-of-type(20) {
      border-bottom: 0;
    }
  `}
`;

const TableRow = styled.tr`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    height: 42px;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 0 0 12px;
  `}
`;

export const Tbody = styled.tbody`
  > tr:nth-of-type(20) {
    border-bottom: 0;
  }
`;

export const HeadRow = styled(TableRow)<{ hasMultiColumn: boolean }>`
  ${({ theme, hasMultiColumn }) => css`
    ${theme.font.medium_13};

    height: ${hasMultiColumn ? "100%" : "42px"};
    background-color: ${theme.color.gray_10};

    & > th {
      display: inline-flex;
      align-items: center;
      border-right: ${hasMultiColumn && `1px solid ${theme.color.gray_20}`};
      padding: 0px 12px;
      color: ${theme.color.gray_60};
      text-align: left;
      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > :last-child {
      border-right: 0;
    }
  `}
`;

export const Row = styled(TableRow)<{ height?: number }>`
  height: ${({ height }) => `${height}px`};

  & > :last-child {
    border-right: 0;
  }

  :nth-of-type(20) {
    border-bottom: 0;
  }
`;

interface SelectableRowProps {
  isSelected: boolean;
}

export const SelectRow = styled(TableRow)<SelectableRowProps>`
  ${({ theme, isSelected }) => css`
    background-color: ${isSelected && theme.color.gray_10};

    &:hover {
      background-color: ${theme.color.gray_10};
    }
  `}
`;

const mixinRowButton = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus-visible {
    position: absolute;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${theme.zIndex.TABLE_SELECT_ROW};
  }
`;

export const RowButton = styled.button`
  ${({ theme }) => css`
    ${mixinRowButton(theme)};
  `}
`;

export const RowLink = styled(Link)`
  ${({ theme }) => css`
    ${mixinRowButton(theme)};
  `}
`;

export const Td = styled.td`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: block;
    padding: 0px 12px;
    color: ${theme.color.black};
    text-align: left;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & > time,
    span,
    address {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `}
`;

export const NoData = styled.tr`
  ${({ theme }) => css`
    position: relative;
    height: 41px;

    &:last-of-type {
      border-bottom: 0;
    }

    & > td {
      ${theme.font.regular_14};
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -50%);
      height: fit-content;
      text-align: center;
      color: ${theme.color.gray_70};

      & > button {
        margin: 16px 0 0;
      }
    }
  `}
`;

export const noResultIcon = (theme: Theme) => css`
  width: 52px;
  height: 52px;
  margin-bottom: 8px;

  & > path {
    fill: ${theme.color.gray_50};
  }
`;

export const NoResultTr = styled.tr`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > td > div {
    display: flex;
    row-gap: 8px;
  }
`;

export const headerTooltip = css`
  margin-left: 4px;
`;

interface ThProps {
  columnCount: number;
  rowCount: number;
  hasDepth: boolean;
  isParentHeader: boolean;
}

export const Th = styled.th<ThProps>`
  ${({ columnCount, rowCount, theme, hasDepth, isParentHeader }) => css`
    ${theme.font.medium_13};

    display: flex;
    align-items: center;
    justify-content: ${isParentHeader && "center"};
    grid-row: ${rowCount && hasDepth && `1/${rowCount}`};
    grid-column: ${columnCount && hasDepth && `span ${columnCount}`};
    border-bottom: ${isParentHeader && `1px solid ${theme.color.gray_20}`};
    padding: 5px 12px;
    color: ${theme.color.gray_60};
    background-color: ${theme.color.gray_10};
  `}
`;

export const OptionalTr = styled.tr`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${theme.color.gray_20};
    background-color: ${theme.color.gray_10};
  `}
`;
