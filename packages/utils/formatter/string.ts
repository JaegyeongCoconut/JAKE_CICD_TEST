/* eslint-disable no-useless-escape */
export const exceptSpecialSymbol = (v: string): string => {
  const regex = /[`~!@#$%^&*()_|+\-=?;:,.'"<>\{\}\[\]\\\/ ]/gim;

  return v.replaceAll(regex, "");
};

export const checkHexcodeOnly = (value: string): string =>
  value.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
