import { useTranslation } from "react-i18next";

import type { Languages, DefaultLanguageFn } from "@repo/types";

const useDefaultLanguage = <T extends Languages>() => {
  const { t } = useTranslation();

  const defaultLanguage: DefaultLanguageFn<T> = ({
    defaultValue,
    fallbackLng,
    lng,
    N,
    text,
  }) =>
    t(text, {
      defaultValue: defaultValue ?? text,
      fallbackLng,
      lng,
      N,
    });

  return { defaultLanguage };
};

export default useDefaultLanguage;
