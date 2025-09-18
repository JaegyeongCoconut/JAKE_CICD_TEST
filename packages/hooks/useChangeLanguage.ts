import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import { LANGUAGE_DROPDOWNS } from "@repo/assets/static/dropdown";
import type { LanguageType } from "@repo/types";

interface UseChangeLanguageProps {
  isAuth: boolean | undefined;
  authLanguage: LanguageType | undefined;
  changeAuthLanguageCode: (selectedLanguage: LanguageType) => void;
}

const useChangeLanguage = ({
  isAuth,
  authLanguage,
  changeAuthLanguageCode,
}: UseChangeLanguageProps) => {
  const { i18n } = useTranslation();

  const selectLanguage = (selectedLanguage: LanguageType): void => {
    i18n.changeLanguage(selectedLanguage);

    changeAuthLanguageCode(selectedLanguage);
  };

  const isExistLangCode = (language: LanguageType | undefined) =>
    !!language && LANGUAGE_DROPDOWNS.some(({ key }) => key === language);

  useEffect(() => {
    if (!isAuth) return;

    const language = authLanguage || "lo";

    if (!isExistLangCode(authLanguage)) {
      selectLanguage("lo");

      return;
    }

    i18n.changeLanguage(language);
  }, []);

  return { selectLanguage };
};

export default useChangeLanguage;
