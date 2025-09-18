import type { CarInspectionLanguages } from "~types";

import { LANGUAGE_LABEL } from "../languageLabel";

export const ERROR_MESSAGE = {
  SIGNIN_FAILED: LANGUAGE_LABEL.INCORRECT_EMAIL_OR_PASSWORD,
} satisfies Record<string, CarInspectionLanguages>;
