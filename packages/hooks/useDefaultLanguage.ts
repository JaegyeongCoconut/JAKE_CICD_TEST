import { useTranslation } from "react-i18next";

import type { Languages } from "@repo/types";

const useDefaultLanguage = () => {
  const { t } = useTranslation();

  const defaultLanguage = (text: Languages): string =>
    t(text, { defaultValue: text });

  return { defaultLanguage };
};

export default useDefaultLanguage;
