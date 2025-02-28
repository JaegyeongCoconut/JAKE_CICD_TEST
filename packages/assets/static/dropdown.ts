import type { Languages } from "../../types";

export const LANGUAGE_DROPDOWNS = [
  // NOTE: 번역이 필요 없으나 DropdownType의 Languages를 넣으며 부득이하게 as Languages 단언
  { key: "en", label: "English" as Languages },
  { key: "lo", label: "ພາສາລາວ" as Languages },
] as const;
