import type { Languages } from "@repo/types";

import { LANGUAGE_LABEL } from "./languageLabel";

export const WEEKS = [
  { day: LANGUAGE_LABEL.SUN, shortenDay: "S" as Languages },
  { day: LANGUAGE_LABEL.MON, shortenDay: "M" as Languages },
  { day: LANGUAGE_LABEL.TUE, shortenDay: "T" as Languages },
  { day: LANGUAGE_LABEL.WED, shortenDay: "W" as Languages },
  { day: LANGUAGE_LABEL.THU, shortenDay: "T" as Languages },
  { day: LANGUAGE_LABEL.FRI, shortenDay: "F" as Languages },
  { day: LANGUAGE_LABEL.SAT, shortenDay: "S" as Languages },
] as const;

export const MONTH = {
  [LANGUAGE_LABEL.JAN]: 1,
  [LANGUAGE_LABEL.FEB]: 2,
  [LANGUAGE_LABEL.MAR]: 3,
  [LANGUAGE_LABEL.APR]: 4,
  [LANGUAGE_LABEL.MAY]: 5,
  [LANGUAGE_LABEL.JUN]: 6,
  [LANGUAGE_LABEL.JUL]: 7,
  [LANGUAGE_LABEL.AUG]: 8,
  [LANGUAGE_LABEL.SEP]: 9,
  [LANGUAGE_LABEL.OCT]: 10,
  [LANGUAGE_LABEL.NOV]: 11,
  [LANGUAGE_LABEL.DEC]: 12,
} as const;
