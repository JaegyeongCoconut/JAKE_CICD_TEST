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

export const commaWithUnit = (
  str: string | number,
  unit:
    | "km"
    | "m"
    | "kg"
    | "cc"
    | "mm"
    | "ps(kw)/rpm"
    | "kWh"
    | "kW"
    | "kgm(NM)/rpm"
    | "km/L"
    | "km/h"
    | "KM"
    | "KW",
): string => {
  if (typeof str !== "string") str = `${str}`;

  if (!str) return "";

  return `${comma(str)} ${unit || ""}`;
};

interface CommaWithCurrencyUnitProps {
  price: string | number | null | undefined;
  currencyUnit: "$" | "₭" | "฿" | "P";
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
