import type { Languages } from "./language";

type TranslatedBreadcrumbItemType = {
  name: Languages;
  isTranslated: true;
  path: string;
};

type NoneTranslatedBreadcrumbItemType = {
  name: string;
  isTranslated: false;
  path: string;
};

export type BreadcrumbItemType =
  | TranslatedBreadcrumbItemType
  | NoneTranslatedBreadcrumbItemType;
