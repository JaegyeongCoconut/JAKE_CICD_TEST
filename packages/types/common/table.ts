import type { Languages } from "./language";
import type { TooltipPosition } from "./tooltip";

export type ColumnTooltip = {
  [key: string]: { position: TooltipPosition; message: Languages };
};

export type DefaultTableColumn<T extends string = string> = {
  readonly key: T;
  readonly label: Languages;
};

type DoubleHeadTableColumn<T extends string = string> =
  DefaultTableColumn<T> & {
    secondDepthes?: readonly DefaultTableColumn<T>[];
  };

export type TableColumns<T extends string = string> =
  readonly DoubleHeadTableColumn<T>[];

export type DefaultTableHeaderInfo<
  T extends string = string,
  U extends Languages = Languages,
> = {
  readonly key: T;
  readonly label: U;
  /*
    NOTE: DobuleHeader 의 경우 부모 헤더는 빈 string, 자식 요소 값을 넣어주어야 함
    예:
    {
      key:xx, label: xx, columnWidth: ""
      secondDepthes:[{key: xx, label, xx, columnWidth: "20px" }, {key: xx, label, xx, columnWidth: "20px" }]
    }
  */
  readonly columnWidth: string | string[];
};

type DoubleHeadTableHeaderInfo<
  T extends string = string,
  U extends Languages = Languages,
> = DefaultTableHeaderInfo<T, U> & {
  secondDepthes?: readonly DefaultTableHeaderInfo<T, U>[];
};

export type TableHeaderInfo<
  T extends string = string,
  U extends Languages = Languages,
> = readonly DoubleHeadTableHeaderInfo<T, U>[];
