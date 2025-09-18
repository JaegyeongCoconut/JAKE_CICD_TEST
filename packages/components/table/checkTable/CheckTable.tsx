import React from "react";

import { isEmpty } from "lodash-es";

import { ReactComponent as CloseIcon } from "@repo/assets/icon/ic_close.svg";
import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { ReactComponent as WebSearchIcon } from "@repo/assets/icon/ic_web_search.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDomReady from "@repo/hooks/table/useDomReady";
import useTableScrollTop from "@repo/hooks/table/useTableScrollTop";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import * as S from "./CheckTable.styled";
import Checkbox from "../../button/checkbox/Checkbox";
import Portal from "../../portal/Portal";

interface CheckTableProps {
  className?: string;
  isAllChecked: boolean;
  isInitQueryFilter?: boolean;
  isLoading?: boolean;
  selectedCount?: number;
  tableHeaderInfos: TableHeaderInfo;
  title?: string;
  toolButtons?: React.ReactNode;
  handleAllCheck?: () => void;
  handleAllUnCheck?: () => void;
  children: React.ReactNode;
}

interface RowProps {
  className?: string;
  handleMouseLeave?: React.MouseEventHandler<HTMLElement>;
  handleMouseOver?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
}

interface SelectRowProps extends RowProps {
  id: string;
  isSelected?: boolean;
  handleSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SelectRowMovePageProps extends RowProps {
  id: string | undefined;
  path: string | undefined;
}

interface TdProps {
  className?: string;
  children: React.ReactNode;
}

const CheckTable = ({
  className,
  tableHeaderInfos,
  children,
  isLoading,
  isInitQueryFilter,
  toolButtons,
  title,
  selectedCount,
  isAllChecked,
  handleAllCheck,
  handleAllUnCheck,
}: CheckTableProps) => {
  const { defaultLanguage } = useDefaultLanguage();
  const { tableRef, toolBoxRef } = useTableScrollTop();

  const gridTemplateColumns = calcTableWidth({
    prevGrid: ["40px"],
    tableHeaderInfos: tableHeaderInfos,
  });

  return (
    <>
      {selectedCount !== 0 && (
        <S.ToolBoxWrapper ref={toolBoxRef}>
          <S.ToolBox>
            <S.SelectedCount>
              {selectedCount} {defaultLanguage(LANGUAGE_LABEL.SELECTED)}
            </S.SelectedCount>
            {toolButtons && toolButtons}
          </S.ToolBox>
          <button
            aria-label="close checked info"
            type="button"
            onClick={handleAllUnCheck}
          >
            <CloseIcon css={S.closeIcon} />
          </button>
        </S.ToolBoxWrapper>
      )}
      <S.Table
        className={className}
        ref={tableRef}
        gridTemplateColumns={gridTemplateColumns}
      >
        <caption className="a11y">{title}</caption>
        <thead>
          <S.HeadRow>
            <S.CheckTh>
              {handleAllCheck && (
                <Checkbox
                  isChecked={isAllChecked}
                  handleCheck={handleAllCheck}
                />
              )}
            </S.CheckTh>
            {tableHeaderInfos.map(({ key, label }, i) => (
              <S.Th key={i} title={key}>
                {defaultLanguage(label)}
              </S.Th>
            ))}
          </S.HeadRow>
        </thead>
        <S.Tbody>
          {isInitQueryFilter ? (
            <CheckTable.InitData />
          ) : isEmpty(children) && !isLoading ? (
            <CheckTable.NoData />
          ) : (
            children
          )}
        </S.Tbody>
      </S.Table>
    </>
  );
};

CheckTable.Row = function Row({
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

CheckTable.SelectRow = function SelectRow({
  className,
  children,
  id,
  isSelected = false,
  handleSelect: selectCb,
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
      <Portal container={`#${rowId}`} mounted={domReady}>
        <td>
          <S.RowButton type="button" onClick={selectCb}>
            <span className="a11y">select row</span>
          </S.RowButton>
        </td>
      </Portal>
    </>
  );
};

CheckTable.SelectRowMovePage = function SelectRowMovePage({
  className,
  children,
  id,
  path,
}: SelectRowMovePageProps) {
  const { domReady } = useDomReady();

  const rowId = `table-row-${id}`;

  return (
    <>
      <S.SelectRow className={className} id={rowId} hasId={!!id}>
        {children}
      </S.SelectRow>
      {id && path && (
        <Portal container={`#${rowId}`} mounted={domReady}>
          <td>
            <S.RowLink to={path}>
              <span className="a11y">select row</span>
            </S.RowLink>
          </td>
        </Portal>
      )}
    </>
  );
};

CheckTable.Td = function Td({ className, children }: TdProps) {
  return <S.Td className={className}>{children}</S.Td>;
};

CheckTable.CheckTd = function CheckTd({ className, children }: TdProps) {
  return <S.CheckTd className={className}>{children}</S.CheckTd>;
};

CheckTable.NoData = function NoData() {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData>
      <td>
        <WarningIcon css={S.noneSearchIcon} />
        {defaultLanguage(LANGUAGE_LABEL.NO_RESULTS_FOUND)}
      </td>
    </S.NoData>
  );
};

CheckTable.InitData = function InitData() {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData>
      <td>
        <WebSearchIcon css={S.noneSearchIcon} />
        {defaultLanguage(LANGUAGE_LABEL.PLEASE_APPLY_THE_FILTER_TO_SEARCH)}
      </td>
    </S.NoData>
  );
};

export default CheckTable;
