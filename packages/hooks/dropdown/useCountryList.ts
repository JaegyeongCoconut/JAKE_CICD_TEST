import { useCallback, useMemo, useState } from "react";

import { DEFAULT_COUNTRY_CODE_INFO } from "@repo/assets/static/phone";
import type {
  CountryModel,
  Country,
  GetCountriesClientModel,
} from "@repo/types";

interface UseCountryListProps {
  countryCode: keyof CountryModel | undefined;
  data: GetCountriesClientModel;
}

const useCountryList = ({ countryCode, data }: UseCountryListProps) => {
  const getInitialCountry = useMemo((): Country => {
    if (!countryCode || !data?.countries) {
      return DEFAULT_COUNTRY_CODE_INFO;
    }

    const selected = data.countries.find(
      (country) => country?.code === countryCode,
    );

    return {
      name: selected?.name ?? DEFAULT_COUNTRY_CODE_INFO.name,
      code: selected?.code ?? DEFAULT_COUNTRY_CODE_INFO.code,
      dial: selected?.dial ?? DEFAULT_COUNTRY_CODE_INFO.dial,
    };
  }, [data, countryCode]);

  const [userSelectedCountry, setUserSelectedCountry] =
    useState<Country | null>(null);

  const selectedCountry = useMemo(() => {
    return userSelectedCountry ?? getInitialCountry;
  }, [userSelectedCountry, getInitialCountry]);

  const handleCountryWithCodeSelect = useCallback(
    (code: string): void => {
      if (!data) return;
      const selected = data?.countries?.find(
        (country) => country?.code === code,
      );

      const value = {
        name: selected?.name ?? DEFAULT_COUNTRY_CODE_INFO.name,
        code: selected?.code ?? DEFAULT_COUNTRY_CODE_INFO.code,
        dial: selected?.dial ?? DEFAULT_COUNTRY_CODE_INFO.dial,
      };

      setUserSelectedCountry(value);
    },
    [data],
  );

  // TODO: API에서 Code를 받는 것으로 통일하면 해당 함수는 삭제할 예정
  const handleCountryWithDialSelect = useCallback(
    (dial: string): void => {
      if (!data) return;

      const selected = data.countries?.find(
        (country) => country?.dial === dial,
      );

      const value = {
        name: selected?.name ?? DEFAULT_COUNTRY_CODE_INFO.name,
        code: selected?.code ?? DEFAULT_COUNTRY_CODE_INFO.code,
        dial: selected?.dial ?? DEFAULT_COUNTRY_CODE_INFO.dial,
      };

      setUserSelectedCountry(value);
    },
    [data],
  );

  const country = data?.countries?.reduce<Record<Country["code"], Country>>(
    (acc, value) => {
      if (value?.code && value?.name && value?.dial) {
        acc[value.code] = {
          code: value.code,
          name: value.name,
          dial: value.dial,
        };
      }
      return acc;
    },
    {},
  );

  return {
    country,
    selectedCountry,
    handleCountryWithCodeSelect,
    handleCountryWithDialSelect,
  };
};

export default useCountryList;
