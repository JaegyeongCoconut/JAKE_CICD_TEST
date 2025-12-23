import type { packagesResources, resources } from "@repo/assets/language/i18n";
import type { LANGUAGE_DROPDOWNS } from "@repo/assets/static/dropdown";

export type Languages = keyof (typeof resources)["en"]["translation"];

export type PackagesLanguages =
  keyof (typeof packagesResources)["en"]["translation"];

export type LanguageType = (typeof LANGUAGE_DROPDOWNS)[number]["key"];

export interface UpdateLanguageServerModel {
  body: { langCode: LanguageType };
}

export interface DefaultLanguageFn<T extends Languages> {
  (params: {
    defaultValue?: string;
    fallbackLng?: string;
    lng?: LanguageType;
    N?: string | number;
    text: T;
  }): string;
}
