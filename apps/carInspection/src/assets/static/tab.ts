import { LANGUAGE_LABEL } from "~constants";

export const INSPECTION_CHECKLIST_TABS = [
  { key: "exterior", label: LANGUAGE_LABEL.EXTERIOR },
  { key: "interior", label: LANGUAGE_LABEL.INTERIOR },
  { key: "underside", label: LANGUAGE_LABEL.UNDERSIDE },
  { key: "engine", label: LANGUAGE_LABEL.ENGINE },
] as const;
