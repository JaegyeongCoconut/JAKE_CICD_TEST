import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash-es";

import { ErrorIcon, NoneSearchIcon } from "@repo/assets/icon";
import useTableScrollTop from "@repo/hooks/table/useTableScrollTop";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ColumnTooltip, TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import * as S from "./Table.styled";
import Checkbox from "../../button/checkbox/Checkbox";
import NoResult from "../../noResult/NoResult";
import Portal from "../../portal/Portal";
import Tooltip from "../../tooltip/Tooltip";

interface TableProps {
  className?: string;
  isLoading?: boolean;
  isInitFilter?: boolean;
  children: React.ReactNode;
  title?: string;
  columnTooltip?: ColumnTooltip;
  hasCheckbox?: boolean;
  isAllChecked?: boolean;
  handleAllCheck?: () => void;
  tableHeaderInfos: TableHeaderInfo;
}

interface RowProps {
  className?: string;
  children: React.ReactNode;
  handleMouseOver?: React.MouseEventHandler<HTMLElement>;
  handleMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

interface SelectRowProps extends RowProps {
  id: string;
  isSelected?: boolean;
  selectFn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SelectRowMovePageProps extends RowProps {
  id: string;
  isSelected?: boolean;
  path: string;
  state?: Record<string, string | null>;
  isOpenNewTab?: boolean;
  handleMouseOver?: React.MouseEventHandler<HTMLElement>;
  handleMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

interface TdProps {
  className?: string;
  children: React.ReactNode;
}

const Table = ({
  className,
  children,
  isLoading,
  isInitFilter,
  title = "",
  tableHeaderInfos,
  columnTooltip,
  hasCheckbox,
  isAllChecked,
  handleAllCheck,
}: TableProps) => {
  const { tableRef } = useTableScrollTop();

  const gridTemplateColumns = calcTableWidth({ tableHeaderInfos });

  return (
    <S.Table
      className={className}
      gridTemplateColumns={gridTemplateColumns}
      ref={tableRef}
    >
      <caption className="a11y">{title}</caption>
      <Table.Header
        tableHeaderInfos={tableHeaderInfos}
        columnTooltip={columnTooltip}
        hasCheckbox={hasCheckbox}
        isAllChecked={isAllChecked}
        handleAllCheck={handleAllCheck}
      />
      <S.Tbody>
        {isInitFilter ? (
          <Table.InitData />
        ) : isEmpty(children) && !isLoading ? (
          <Table.NoData />
        ) : (
          children
        )}
      </S.Tbody>
    </S.Table>
  );
};

interface HeaderProps {
  tableHeaderInfos: TableHeaderInfo;
  columnTooltip?: ColumnTooltip;
  hasCheckbox?: boolean;
  isAllChecked?: boolean;
  handleAllCheck?: () => void;
}

Table.Header = function Header({
  tableHeaderInfos,
  columnTooltip,
  hasCheckbox,
  isAllChecked,
  handleAllCheck,
}: HeaderProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const hasMultiColumn = tableHeaderInfos.some(
    ({ secondDepthes }) => !!secondDepthes,
  );

  return (
    <thead>
      <S.HeadRow hasMultiColumn={hasMultiColumn}>
        {hasCheckbox && (
          <th>
            <Checkbox isChecked={isAllChecked} handleCheck={handleAllCheck} />
          </th>
        )}
        {tableHeaderInfos.map((columns) => {
          const { secondDepthes, ...rest } = columns;
          const filteredColumns = [rest, ...(secondDepthes || [])].filter(
            Boolean,
          );

          return filteredColumns.map((column, i) => {
            const isFirstTh = i === 0;
            const hasNotDepthOfColumn = filteredColumns.length === 1;

            return (
              <S.Th
                key={column.label}
                scope="col"
                hasDepth={isFirstTh}
                columnCount={isFirstTh ? filteredColumns.length - 1 : 1}
                rowCount={hasNotDepthOfColumn ? 3 : 1}
                isParentHeader={isFirstTh && !hasNotDepthOfColumn}
              >
                {defaultLanguage(column.label)}
                {columnTooltip?.[columns.key] && (
                  <Tooltip
                    css={S.headerTooltip}
                    position={columnTooltip[columns.key].position}
                    message={columnTooltip[columns.key].message}
                  />
                )}
              </S.Th>
            );
          });
        })}
      </S.HeadRow>
    </thead>
  );
};

Table.Row = function Row({
  className,
  children,
  handleMouseOver,
  handleMouseLeave,
}: RowProps) {
  return (
    <S.Row
      className={className}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </S.Row>
  );
};

Table.SelectRow = function SelectRow({
  className,
  children,
  id,
  isSelected = false,
  selectFn,
}: SelectRowProps) {
  const [domReady, setDomReady] = useState(false);

  const rowId = `table-row-${id}`;

  useEffect(() => {
    setDomReady(true);
  }, []);

  return (
    <>
      <S.SelectRow className={className} id={rowId} isSelected={isSelected}>
        {children}
      </S.SelectRow>
      <Portal container={`#${rowId} > td`} mounted={domReady}>
        <S.RowButton type="button" onClick={selectFn}>
          <span className="a11y">select row</span>
        </S.RowButton>
      </Portal>
    </>
  );
};

Table.SelectRowMovePage = function SelectRowMovePage({
  className,
  children,
  id,
  isSelected = false,
  path,
  state,
  isOpenNewTab,
  handleMouseOver,
  handleMouseLeave,
}: SelectRowMovePageProps) {
  const [domReady, setDomReady] = useState(false);

  const rowId = `table-row-${id}`;

  useEffect(() => {
    setDomReady(true);
  }, []);

  return (
    <>
      <S.SelectRow className={className} id={rowId} isSelected={isSelected}>
        {children}
      </S.SelectRow>
      <Portal container={`#${rowId} > td`} mounted={domReady}>
        <S.RowLink
          to={path}
          state={state}
          target={isOpenNewTab ? "_blank" : "_self"}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <span className="a11y">select row</span>
        </S.RowLink>
      </Portal>
    </>
  );
};

Table.Td = function Td({ className, children }: TdProps) {
  return <S.Td className={className}>{children}</S.Td>;
};

interface NoDataProps {
  className?: string;
}

Table.NoData = function NoData({ className }: NoDataProps) {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData className={className}>
      <td>
        <ErrorIcon css={S.noResultIcon} />
        {defaultLanguage("No results found")}
      </td>
    </S.NoData>
  );
};

Table.InitData = function InitData() {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData>
      <td>
        <NoneSearchIcon css={S.noResultIcon} />
        {defaultLanguage("Please apply the filter to search")}
      </td>
    </S.NoData>
  );
};

Table.NoResultTr = function NoResultTr() {
  return (
    <S.NoResultTr>
      <td>
        <NoResult contents={["No results found"]} type="search" />
      </td>
    </S.NoResultTr>
  );
};

interface TableOptionalTrProps {
  className?: string;
  children: React.ReactNode;
}

Table.OptionalTr = function OptionalTr({
  className,
  children,
}: TableOptionalTrProps) {
  return (
    <S.OptionalTr className={className}>
      <td>{children}</td>
    </S.OptionalTr>
  );
};

export default Table;
