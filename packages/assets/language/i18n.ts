import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resourcesMap } from "./translationResources";

/*NOTE: 
  version: v3.0.0
  author: 서대원
  description: 중복키 문제로 프로젝트를 구분해서 동적으로 번역 resources 생성
*/

export const resources = {
  en: {
    translation: {
      ...resourcesMap["common"].en.translation,
      ...resourcesMap[__SERVICE_NAME__].en.translation,
    },
  },
  lo: {
    translation: {
      ...resourcesMap["common"].lo.translation,
      ...resourcesMap[__SERVICE_NAME__].lo.translation,
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources, // NOTE: t 함수 사용하여 번역 시, 사용할 번역 파일
  fallbackLng: "en", // NOTE: 번역 파일이 없을 경우 사용할 기본 언어
  returnNull: false, // NOTE: 번역 파일이 없을 경우 null 반환 여부
});

export default i18n;
