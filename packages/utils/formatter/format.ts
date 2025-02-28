import { upperCase } from "lodash-es";

export const formatHexColor = (color: string): string =>
  upperCase(color).split(" ").join("");

export const formatExceptSpacing = (word: string): string =>
  word.split(" ").join("");

export const formatCouponCode = (code: string): string => {
  const regex = /([^a-zA-Z0-9])/gim;

  return code.replace(regex, "");
};
