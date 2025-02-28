import { resources } from "@repo/assets/language";
import { LANGUAGE_DROPDOWNS } from "@repo/assets/static";

export type Languages = keyof (typeof resources)["en"]["translation"];

export interface UpdateLanguageServerModel {
  body: { langCode: (typeof LANGUAGE_DROPDOWNS)[number]["key"] };
}
