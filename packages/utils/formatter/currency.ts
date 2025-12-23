import type { CommonUnitType, CurrencyUnitType } from "@repo/types";

export const comma = (str: string | number | undefined | null): string => {
  if (typeof str === "undefined" || str === null) return "";

  const input = typeof str === "string" ? str.trim() : `${str}`;

  if (!input) return "";

  return `${input.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")}`;
};

export const removeComma = (
  str: string | number | undefined | null,
): string => {
  if (typeof str === "undefined" || str === null) return "";

  const input = typeof str === "string" ? str.trim() : `${str}`;

  if (!input) return "";

  return input.replaceAll(/,/g, "");
};

interface CommaWithUnitProps {
  value: string | number | undefined | null;
  unit: CommonUnitType;
}

export const commaWithUnit = ({ value, unit }: CommaWithUnitProps): string => {
  if (typeof value === "undefined" || value === null) return "";

  const input = typeof value === "string" ? value.trim() : `${value}`;

  if (!input) return "";

  return `${comma(input)} ${unit}`;
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
  if (typeof price === "undefined" || price === null)
    return `${currencyUnit} 0`;

  const input = typeof price === "string" ? price.trim() : `${price}`;

  if (!input) return `${currencyUnit} 0`;

  if (+input < 0) {
    return `- ${currencyUnit} ${comma(Math.abs(+input))}`;
  } else {
    return showPlusSign
      ? `+ ${currencyUnit} ${comma(input)}`
      : `${currencyUnit} ${comma(input)}`;
  }
};
