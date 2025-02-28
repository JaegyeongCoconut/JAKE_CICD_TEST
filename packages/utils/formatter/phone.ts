import { numericOnly } from "./number";

export const formatCountryMobile = (
  countryDial?: string | null,
  phone?: string | null,
): string | null => {
  if (!countryDial || !phone) return null;

  const dialPrefix = "+";
  const formatPhone = phone.replace(/^([0-9]{2})([0-9]{8,})$/, "$1 $2");
  return `${countryDial ? dialPrefix : ""}${countryDial} ${formatPhone}`;
};

export const formatMobileExceptZero = (value: string): string => {
  const [firstValue, ...restValue] = value;

  if (firstValue === "0") {
    return numericOnly(restValue.join() ?? "");
  }

  return numericOnly(value);
};
