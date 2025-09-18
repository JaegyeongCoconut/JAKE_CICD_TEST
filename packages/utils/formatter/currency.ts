import type { CommonUnitType, CurrencyUnitType } from "@repo/types";

export const comma = (str: string | number): string => {
  if (typeof str !== "string") str = `${str}`;

  if (!str) return "";

  return `${str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")}`;
};

export const removeComma = (str: string | number): string => {
  if (typeof str !== "string") str = `${str}`;

  if (!str) return "";

  return str.replaceAll(/,/g, "");
};

interface CommaWithUnitProps {
  value: string | number;
  unit: CommonUnitType;
}

export const commaWithUnit = ({ value, unit }: CommaWithUnitProps): string => {
  if (typeof value !== "string") value = `${value}`;

  if (!value) return "";

  return `${comma(value)} ${unit || ""}`;
};

interface CommaWithCurrencyUnitProps {
  currencyUnit: CurrencyUnitType;
  price: string | number | null | undefined;
  showPlusSign: boolean;
}

export const commaWithCurrencyUnit = ({
  price,
  currencyUnit,
  showPlusSign,
}: CommaWithCurrencyUnitProps): string => {
  if (typeof price === "number") price = `${price}`;

  if (!price) return `${currencyUnit} 0`;

  if (+price < 0) {
    return `- ${currencyUnit} ${comma(Math.abs(+price))}`;
  } else {
    return showPlusSign
      ? `+ ${currencyUnit} ${comma(+price)}`
      : `${currencyUnit} ${comma(+price)}`;
  }
};
