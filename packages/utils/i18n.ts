import type { Namespace, Resource, TFunction } from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { fallbackLng } from "@repo/assets/language/i18n";
import type { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import type { LanguageType } from "@repo/types";

interface InitI18nProps {
  initLanguage: LanguageType;
  resources: Resource;
}

export const initI18n = ({
  initLanguage,
  resources,
}: InitI18nProps): Promise<
  TFunction<Namespace<LanguageType>, undefined, Namespace<LanguageType>>
> =>
  i18n.use(initReactI18next).init({
    lng: initLanguage,
    resources, // NOTE: t 함수 사용하여 번역 시, 사용할 번역 파일
    fallbackLng, // NOTE: 번역 파일이 없을 경우 사용할 기본 언어
    returnNull: false, // NOTE: 번역 파일이 없을 경우 null 반환 여부
    returnEmptyString: false, // NOTE: 번역 파일이 없을 경우 빈 문자열 반환 여부
  });

interface SetLocalStorageI18nProps {
  i18nKey: (typeof SERVICE_INFO)[keyof typeof SERVICE_INFO]["i18nKey"];
  language: LanguageType;
}

export const setLocalStorageI18n = ({
  language,
  i18nKey,
}: SetLocalStorageI18nProps): void => {
  i18nKey && localStorage.setItem(i18nKey, language);
};

export const getLocalStorageI18n = (
  i18nKey: SetLocalStorageI18nProps["i18nKey"],
): LanguageType => {
  if (!i18nKey) return "lo"; // NOTE: i18nKey가 null인 경우에는 해당 함수를 사용 안 하겠다만,initI18n에서 타입 에러 방지를 위해 반환값 필요

  return (localStorage.getItem(i18nKey) as LanguageType | null) || "lo";
};
