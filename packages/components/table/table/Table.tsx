import type { ReactNode, MouseEvent } from "react";
import React from "react";

import { isEmpty } from "lodash-es";

import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { ReactComponent as WebSearchIcon } from "@repo/assets/icon/ic_web_search.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDomReady from "@repo/hooks/table/useDomReady";
import useTableScrollTop from "@repo/hooks/table/useTableScrollTop";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import * as S from "./Table.styled";
import NoResult from "../../noResult/NoResult";
import Portal from "../../portal/Portal";

interface BaseTableProps {
  className?: string;
  children: ReactNode;
}

interface TableProps extends BaseTableProps {
  isInitQueryFilter?: boolean;
  isLoading?: boolean;
  tableHeaderInfos: TableHeaderInfo;
  title?: string;
}

interface SelectRowProps extends BaseTableProps {
  id: string | undefined;
  isSelected: boolean;
  handleSelect: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface SelectRowNewTabProps extends BaseTableProps {
  id: string | undefined;
  path: string | undefined;
  state?: Record<string, string | null>;
}

interface SelectRowMovePageProps extends BaseTableProps, SelectRowNewTabProps {}

const Table = ({
  className,
  children,
  isLoading,
  isInitQueryFilter,
  title = "",
  tableHeaderInfos,
}: TableProps) => {
  const { tableRef } = useTableScrollTop();

  const gridTemplateColumns = calcTableWidth({ tableHeaderInfos });

  return (
    <S.Table
      className={className}
      ref={tableRef}
      gridTemplateColumns={gridTemplateColumns}
    >
      <caption className="a11y">{title}</caption>
      <Table.Header tableHeaderInfos={tableHeaderInfos} />
      <S.Tbody>
        {isInitQueryFilter ? (
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
}

Table.Header = function Header({ tableHeaderInfos }: HeaderProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const hasMultiColumn = tableHeaderInfos.some(
    ({ secondDepthes }) => !!secondDepthes,
  );

  return (
    <thead>
      <S.HeadRow hasMultiColumn={hasMultiColumn}>
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
                hasDepth={isFirstTh}
                isParentHeader={isFirstTh && !hasNotDepthOfColumn}
                columnCount={isFirstTh ? filteredColumns.length - 1 : 1}
                rowCount={hasNotDepthOfColumn ? 3 : 1}
                scope="col"
              >
                {defaultLanguage(column.label)}
              </S.Th>
            );
          });
        })}
      </S.HeadRow>
    </thead>
  );
};

Table.Row = function Row({ className, children }: BaseTableProps) {
  return <S.Row className={className}>{children}</S.Row>;
};

Table.SelectRow = function SelectRow({
  className,
  children,
  id,
  isSelected,
  handleSelect,
}: SelectRowProps) {
  const { domReady } = useDomReady();

  const rowId = `table-row-${id}`;

  return (
    <>
      <S.SelectRow
        className={className}
        id={rowId}
        hasId={!!id}
        isSelected={isSelected}
      >
        {children}
      </S.SelectRow>
      <Portal container={`#${rowId} > td`} mounted={domReady}>
        <S.RowButton type="button" onClick={handleSelect}>
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
  path,
  state,
}: SelectRowMovePageProps) {
  const { domReady } = useDomReady();

  const rowId = `table-row-${id}`;

  return (
    <>
      <S.SelectRow
        className={className}
        id={id && rowId}
        hasId={!!id}
        isSelected={false}
      >
        {children}
      </S.SelectRow>
      {id && path && (
        <Portal container={`#${rowId} > td`} mounted={domReady}>
          <S.RowLink state={state} target="_self" to={path}>
            <span className="a11y">select row</span>
          </S.RowLink>
        </Portal>
      )}
    </>
  );
};

Table.SelectRowNewTab = function SelectRowNewTab({
  className,
  id,
  path,
  state,
  children,
}: SelectRowNewTabProps) {
  const { domReady } = useDomReady();

  const rowId = `table-row-${id}`;

  return (
    <>
      <S.SelectRow
        className={className}
        id={id && rowId}
        hasId={!!id}
        isSelected={false}
      >
        {children}
      </S.SelectRow>
      {id && path && (
        <Portal container={`#${rowId} > td`} mounted={domReady}>
          <S.RowLink state={state} target="_blank" to={path}>
            <span className="a11y">select row</span>
          </S.RowLink>
        </Portal>
      )}
    </>
  );
};

Table.Td = function Td({ className, children }: BaseTableProps) {
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
        <WarningIcon css={S.noResultIcon} />
        {defaultLanguage(LANGUAGE_LABEL.NO_RESULTS_FOUND)}
      </td>
    </S.NoData>
  );
};

Table.InitData = function InitData() {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData>
      <td>
        <WebSearchIcon css={S.noResultIcon} />
        {defaultLanguage(LANGUAGE_LABEL.PLEASE_APPLY_THE_FILTER_TO_SEARCH)}
      </td>
    </S.NoData>
  );
};

Table.NoResultTr = function NoResultTr() {
  return (
    <S.NoResultTr>
      <td>
        <NoResult contents={[LANGUAGE_LABEL.NO_RESULTS_FOUND]} type="search" />
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
