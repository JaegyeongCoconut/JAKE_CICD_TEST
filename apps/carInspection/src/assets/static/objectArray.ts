import { LANGUAGE_LABEL } from "~constants";

export const INSPECTION_STATUS_OBJECT_ARRAY = [
  { key: "pass", label: LANGUAGE_LABEL.PASS },
  { key: "bad", label: LANGUAGE_LABEL.BAD },
  { key: "normal", label: LANGUAGE_LABEL.NORMAL },
] as const;
