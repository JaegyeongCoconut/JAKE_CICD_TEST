import { numericOnly } from "./number";
import { replaceFirstTextZeroToEmpty } from "./string";

interface FormatCountryMobileProps {
  countryDial: string | undefined | null;
  phone: string | undefined | null;
}

export const formatCountryMobile = ({
  countryDial,
  phone,
}: FormatCountryMobileProps): string | null => {
  const dial = countryDial?.trim();
  const phoneNumber = phone?.trim();

  if (!dial || !phoneNumber) return null;

  const dialPrefix = "+";
  const formatPhone = phoneNumber.replace(/^([0-9]{2})([0-9]{8,})$/, "$1 $2");
  return `${dial ? dialPrefix : ""}${dial} ${formatPhone}`;
};

export const formatMobileExceptZero = (value: string): string =>
  replaceFirstTextZeroToEmpty(numericOnly(value));
