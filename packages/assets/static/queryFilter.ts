/**
 * NOTE: queryKey가 'date' 형태일 경우 '기간' 형태로 보여주어야 함
 * 'date' 형태의 queryKey 종류는 하기와 같이 DATE_QUERY_KEYS 배열로 정의
 */
export const DATE_QUERY_KEYS = [
  "bookingDate",
  "completed",
  "contractDate",
  "created",
  "date",
  "onSaleDate",
  "pickup",
  "purchaseDate",
  "salesDate",
  "soldDate",
  "updated",
] as const;

export const SUFFIX_DATE_QUERY_KEYS = DATE_QUERY_KEYS.map((item) => ({
  start: item === "date" ? "startDate" : `${item}Start`,
  end: item === "date" ? "endDate" : `${item}End`,
}));

export const QUERY_FILTER_TYPE = {
  CALENDAR: "calendar",
  CHECKBOX: "checkbox",
  DROPDOWN: "dropdown",
  RADIO: "radio",
  INPUT: "input",
  INPUT_REGEXP: "inputRegExp",
  INPUT_REGEXP_FULL_LENGTH: "inputRegExpFullLength",
} as const;
