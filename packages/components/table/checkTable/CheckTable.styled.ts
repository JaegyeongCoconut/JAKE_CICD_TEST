import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ToolBoxWrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: ${`calc(${theme.size.HEADER_HEIGHT} + ${theme.size.TABLE_HEADER_HEIGHT})`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    border: 1px solid ${theme.color.gray_20};
    border-bottom: 0;
    padding: 0 22px 0 24px;
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.STICKY};
  `}
`;

export const ToolBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
`;

export const SelectedCount = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    position: relative;
    color: ${theme.color.blue_60};
    ::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -16px;
      width: 1px;
      height: 12px;
      background-color: ${theme.color.gray_30};
      transform: translateY(-50%);
    }
  `}
`;

export const Table = styled.table<{ gridTemplateColumns: string }>`
  ${({ theme, gridTemplateColumns }) => css`
    width: 100%;
    height: ${theme.size.TABLE_HEIGHT};
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

    tbody > tr:nth-of-type(20) {
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
    padding: 0px 12px;
  `}
`;

export const Tbody = styled.tbody`
  > tr:nth-of-type(20) {
    border-bottom: 0;
  }
`;

export const HeadRow = styled(TableRow)`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    background-color: ${theme.color.gray_10};

    & > :last-child {
      border-right: 0;
    }
  `}
`;

export const Th = styled.th`
  ${({ theme }) => css`
    display: block;
    padding: 0px 12px;
    overflow: hidden;
    line-height: 40px;
    color: ${theme.color.gray_60};
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const CheckTh = styled(Th)`
  padding: 0;
`;

export const Row = styled(TableRow)`
  & > :last-child {
    border-right: 0;
  }

  :nth-of-type(20) {
    border-bottom: 0;
  }
`;

export const Td = styled.td`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: block;
    padding: 0px 12px;
    overflow: hidden;
    line-height: 40px;
    color: ${theme.color.gray_90};
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;

    & > time,
    span,
    address {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `}
`;

export const CheckTd = styled(Td)`
  padding: 0;
`;

interface SelectableRowProps {
  hasId: boolean;
  isSelected?: boolean;
}

export const SelectRow = styled(TableRow)<SelectableRowProps>`
  ${({ theme, hasId, isSelected }) => css`
    background-color: ${hasId && isSelected && theme.color.gray_10};
    cursor: ${!hasId && "not-allowed"};

    ${hasId &&
    css`
      &:hover {
        background-color: ${theme.color.gray_10};
      }
    `};
  `}
`;

const mixinRowButton = css`
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
    z-index: 5;
  }
`;

export const RowButton = styled.button`
  ${mixinRowButton}
`;

export const RowLink = styled(Link)`
  ${mixinRowButton}
`;

export const NoData = styled.tr`
  ${({ theme }) => css`
    & > td {
      ${theme.font.regular_14};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: ${theme.color.gray_60};
    }
  `}
`;

export const noneSearchIcon = (theme: Theme) => css`
  width: 52px;
  height: 52px;
  margin-bottom: 8px;

  & > path {
    fill: ${theme.color.gray_50};
  }
`;

export const closeIcon = (theme: Theme) => css`
  width: 16px;
  height: 16px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;
