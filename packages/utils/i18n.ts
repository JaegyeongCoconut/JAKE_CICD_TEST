import type { Namespace, Resource, TFunction } from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { fallbackLng } from "@repo/assets/language/i18n";

export const initI18n = (
  resources: Resource,
): Promise<
  TFunction<Namespace<"en" | "lo">, undefined, Namespace<"en" | "lo">>
> =>
  i18n.use(initReactI18next).init({
    resources, // NOTE: t 함수 사용하여 번역 시, 사용할 번역 파일
    fallbackLng, // NOTE: 번역 파일이 없을 경우 사용할 기본 언어
    returnNull: false, // NOTE: 번역 파일이 없을 경우 null 반환 여부
    returnEmptyString: false, // NOTE: 번역 파일이 없을 경우 빈 문자열 반환 여부
  });
