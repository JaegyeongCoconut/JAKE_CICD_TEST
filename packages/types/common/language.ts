import type { resources } from "@repo/assets/language/i18n";
import type { LANGUAGE_DROPDOWNS } from "@repo/assets/static/dropdown";

export type Languages = keyof (typeof resources)["en"]["translation"];

export type LanguageType = (typeof LANGUAGE_DROPDOWNS)[number]["key"];

export interface UpdateLanguageServerModel {
  body: { langCode: LanguageType };
}
