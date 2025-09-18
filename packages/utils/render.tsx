import React from "react";

import type { jsx, SerializedStyles } from "@emotion/react";

import { ReactComponent as PinIcon } from "@repo/assets/icon/ic_pin.svg";
import type {
  CommonUnitType,
  CurrencyUnitType,
  Languages,
  RenderTableColumnType,
  RenderTableRowType,
  RenderTableType,
} from "@repo/types";
import { formatICTDateTime } from "@repo/utils/date";
import {
  comma,
  commaWithCurrencyUnit,
  commaWithUnit,
} from "@repo/utils/formatter/currency";
import { formatFullName } from "@repo/utils/formatter/name";
import { formatCountryMobile } from "@repo/utils/formatter/phone";
import { findLookupTableLabel } from "@repo/utils/method";
import { countNoticeNo } from "@repo/utils/notice";

// NOTE: 순환 참조 문제로 직접 경로 설정
import CommonStatus from "../components/status/CommonStatus";

export const renderAddress = (
  address: string | null | undefined,
): jsx.JSX.Element => {
  return address ? <address>{address}</address> : <span>-</span>;
};

interface RenderFullNameProps {
  firstName: string | undefined;
  lastName: string | undefined;
}

export const renderFullName = ({
  firstName,
  lastName,
}: RenderFullNameProps): jsx.JSX.Element => {
  const formattedName = formatFullName({ firstName, lastName });

  return formattedName ? <span>{formattedName}</span> : <span>-</span>;
};

interface RenderPhoneProps {
  countryDial: string | undefined;
  mobile: string | undefined;
}

export const renderPhone = ({
  countryDial,
  mobile,
}: RenderPhoneProps): jsx.JSX.Element => {
  const formatPhone = formatCountryMobile({ countryDial, phone: mobile });

  return formatPhone ? <address>{formatPhone}</address> : <span>-</span>;
};

interface RenderDateProps {
  date: string | null | undefined;
  template?: string;
}

export const renderDate = ({
  date,
  template,
}: RenderDateProps): jsx.JSX.Element => {
  return date ? (
    <time dateTime={date}>{formatICTDateTime({ date, template })}</time>
  ) : (
    <span>-</span>
  );
};

interface RenderLabelProps<
  T extends { key: string | number; label: Languages },
> {
  key: string | number | undefined | null;
  list: ReadonlyArray<T>;
  handleTranslate: ((text: Languages) => string) | undefined;
}

export const renderLabel = <
  T extends { key: string | number; label: Languages },
>({
  key,
  list,
  handleTranslate,
}: RenderLabelProps<T>): jsx.JSX.Element => {
  if (
    key === undefined ||
    key === null ||
    !list.some((item) => item.key === key)
  ) {
    return <span>-</span>;
  }

  const label = findLookupTableLabel({ list, key }) || "-";

  return (
    <span>{handleTranslate ? handleTranslate(label as Languages) : label}</span>
  );
};

interface RenderCurrencyUnitProps {
  currencyUnit: CurrencyUnitType | undefined;
  price: number | string | null | undefined;
  showPlusSign: boolean;
}

export const renderCurrencyUnit = ({
  currencyUnit,
  price,
  showPlusSign,
}: RenderCurrencyUnitProps): jsx.JSX.Element => {
  if ((typeof price !== "number" && typeof price !== "string") || !currencyUnit)
    return <span>-</span>;

  return (
    <span>
      {commaWithCurrencyUnit({
        price,
        currencyUnit,
        showPlusSign,
      })}
    </span>
  );
};

interface RenderCommaUnitProps {
  value: number | undefined | null;
  unit: CommonUnitType;
}

export const renderCommaUnit = ({
  value,
  unit,
}: RenderCommaUnitProps): jsx.JSX.Element => {
  return (
    <span>
      {typeof value === "number" ? commaWithUnit({ value, unit }) : "-"}
    </span>
  );
};

export const renderWithComma = (
  value: number | null | undefined,
): jsx.JSX.Element => {
  return <span>{typeof value === "number" ? comma(value) : "-"}</span>;
};

export const renderDefault = (value: unknown): jsx.JSX.Element => {
  return (
    <span>
      {typeof value === "string" || typeof value === "number" ? value : "-"}
    </span>
  );
};

interface RenderStatusProps {
  className?: string;
  color: "orange" | "green" | "blue" | "gray" | "red" | undefined;
  hasBg?: boolean;
  status: Languages | null;
}

export const renderStatus = ({
  className,
  hasBg,
  status,
  color,
}: RenderStatusProps): jsx.JSX.Element => {
  if (!status || !color) return <div>-</div>;

  return (
    <CommonStatus
      className={className}
      variant={color}
      hasBg={hasBg}
      status={status}
    />
  );
};

interface RenderPinProps {
  className?: SerializedStyles;
  isPinned: 0 | 1 | undefined;
  currentPage: number;
  index: number;
  totalData: number;
}

export const renderPin = ({
  className,
  isPinned,
  index,
  totalData,
  currentPage,
}: RenderPinProps): jsx.JSX.Element => {
  return isPinned ? (
    <PinIcon css={className} />
  ) : (
    <span>{countNoticeNo({ totalData, currentPage }) - index}</span>
  );
};

interface RenderTableDataProps<
  THeaderInfo extends readonly { key: string }[],
  TModel extends Record<K, (Record<string, unknown> | undefined)[] | undefined>,
  K extends keyof TModel,
> {
  key: RenderTableColumnType<THeaderInfo>;
  index?: number;
  item: RenderTableRowType<TModel, K> | undefined;
  tableRender: RenderTableType<THeaderInfo, TModel, K>;
}

export const renderTableData = <
  THeaderInfo extends readonly { key: string }[],
  TModel extends Record<K, (Record<string, unknown> | undefined)[] | undefined>,
  K extends keyof TModel,
>({
  key,
  index,
  item,
  tableRender,
}: RenderTableDataProps<THeaderInfo, TModel, K>): jsx.JSX.Element => {
  if (!item) return renderDefault(undefined);

  return tableRender[key]
    ? tableRender[key](item, index)
    : renderDefault(item[key]);
};
