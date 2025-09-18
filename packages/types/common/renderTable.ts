import type { jsx } from "@emotion/react";

// NOTE: 테이블 Column key 타입(리터럴) ex. (typeof VEHICLE_TABLE_HEADER_INFOS)[number]["key"];
export type RenderTableColumnType<
  THeaderInfo extends readonly { key: string }[],
> = THeaderInfo[number]["key"];

// NOTE: 테이블 Row 데이터 타입 ex. GetVehiclesClientModel["vehicles"][number];
export type RenderTableRowType<
  TModel extends Record<K, (Record<string, unknown> | undefined)[] | undefined>,
  K extends keyof TModel,
> = NonNullable<TModel[K]>[number];

// NOTE: 테이블 개별 데이터 렌더링 함수
type RenderTableCellType<
  TModel extends Record<K, (Record<string, unknown> | undefined)[] | undefined>,
  K extends keyof TModel,
> = (item: RenderTableRowType<TModel, K>, index?: number) => jsx.JSX.Element;

// NOTE: 테이블 Column key 기반 테이블 렌더링 타입
export type RenderTableType<
  THeaderInfo extends readonly { key: string }[],
  TModel extends Record<K, (Record<string, unknown> | undefined)[] | undefined>,
  K extends keyof TModel,
> = Partial<
  Record<RenderTableColumnType<THeaderInfo>, RenderTableCellType<TModel, K>>
>;
