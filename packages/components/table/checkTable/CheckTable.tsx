import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash-es";

import { CloseIcon, ErrorIcon, NoneSearchIcon } from "@repo/assets/icon";
import useTableScrollTop from "@repo/hooks/table/useTableScrollTop";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import * as S from "./CheckTable.styled";
import Checkbox from "../../button/checkbox/Checkbox";
import Portal from "../../portal/Portal";

interface CheckTableProps {
  className?: string;
  tableHeaderInfos: TableHeaderInfo;
  children: React.ReactNode;
  isLoading?: boolean;
  isInitFilter?: boolean;
  toolButtons?: React.ReactNode;
  title?: string;
  selectedCount?: number;
  isAllChecked: boolean;
  handleAllCheck?: () => void;
  handleAllUnCheck?: () => void;
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
  path: string;
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
  isInitFilter,
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
              {selectedCount} {defaultLanguage("Selected")}
            </S.SelectedCount>
            {toolButtons && toolButtons}
          </S.ToolBox>
          <button
            type="button"
            aria-label="close checked info"
            onClick={handleAllUnCheck}
          >
            <CloseIcon css={S.closeIcon} />
          </button>
        </S.ToolBoxWrapper>
      )}
      <S.Table
        className={className}
        gridTemplateColumns={gridTemplateColumns}
        ref={tableRef}
      >
        <caption className="a11y">{title}</caption>
        <thead>
          <S.HeadRow>
            <S.CheckTh>
              <Checkbox isChecked={isAllChecked} handleCheck={handleAllCheck} />
            </S.CheckTh>
            {tableHeaderInfos.map(({ key, label }, i) => (
              <S.Th key={i} title={key}>
                {defaultLanguage(label)}
              </S.Th>
            ))}
          </S.HeadRow>
        </thead>
        <S.Tbody>
          {isInitFilter ? (
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
  selectFn: selectCb,
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
  const [domReady, setDomReady] = useState(false);

  const rowId = `table-row-${id}`;

  useEffect(() => {
    setDomReady(true);
  }, []);

  return (
    <>
      <S.SelectRow className={className} id={rowId}>
        {children}
      </S.SelectRow>
      <Portal container={`#${rowId}`} mounted={domReady}>
        <td>
          <S.RowLink to={path}>
            <span className="a11y">select row</span>
          </S.RowLink>
        </td>
      </Portal>
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
        <ErrorIcon css={S.noneSearchIcon} />
        {defaultLanguage("No results found")}
      </td>
    </S.NoData>
  );
};

CheckTable.InitData = function InitData() {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoData>
      <td>
        <NoneSearchIcon css={S.noneSearchIcon} />
        {defaultLanguage("Please apply the filter to search")}
      </td>
    </S.NoData>
  );
};

export default CheckTable;
