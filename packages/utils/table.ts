import type {
  DefaultTableColumn,
  TableColumns,
  TableHeaderInfo,
} from "@repo/types";

interface calcTableWidthProps {
  prevGrid?: string[];
  tableHeaderInfos: TableHeaderInfo;
  nextGrid?: string[];
}

export const calcTableWidth = ({
  prevGrid,
  tableHeaderInfos,
  nextGrid,
}: calcTableWidthProps): string => {
  const gridColumns = [
    ...(prevGrid || []),
    ...tableHeaderInfos.flatMap((headerInfo) => {
      const { columnWidth, secondDepthes = [] } = headerInfo;

      return [columnWidth, ...secondDepthes.map((depth) => depth.columnWidth)];
    }),
    ...(nextGrid || []),
  ].filter(Boolean);

  const tableColumnArr = gridColumns.map((designColumnWidth) =>
    typeof designColumnWidth === "string"
      ? designColumnWidth
      : `minmax(${designColumnWidth[0]}, ${designColumnWidth[1]})`,
  );

  return tableColumnArr.join(" ");
};

export const filterTableColumns = <T extends string>(
  tableColumns: TableColumns<T>,
) => {
  const filteredTableColumns = tableColumns.reduce<DefaultTableColumn<T>[]>(
    (acc, cur) => {
      if (cur.secondDepthes) {
        const columns = cur.secondDepthes;
        return [...acc, ...columns];
      }

      const columns = [cur];
      return [...acc, ...columns];
    },
    [],
  );

  return filteredTableColumns;
};
