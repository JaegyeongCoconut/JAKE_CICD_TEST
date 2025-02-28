import { useCallback, useEffect, useState } from "react";

import type { Country, GetCountriesClientModel } from "@repo/types";

const INIT_COUNTRY_DATA: Country = {
  code: "LA",
  name: "Laos",
  dial: "856",
};

interface UseCountryListProps {
  countryCode?: keyof GetCountriesClientModel;
  data?: GetCountriesClientModel;
}

const useCountryList = ({ countryCode, data }: UseCountryListProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    !countryCode ? INIT_COUNTRY_DATA : { code: "", name: "", dial: "" },
  );

  const handleCountryWithCodeSelect = useCallback(
    (code: string) => {
      if (!data) return;
      const selected = data[code];
      setSelectedCountry(selected);
    },
    [data],
  );

  // TODO: API에서 Code를 받는 것으로 통일하면 해당 함수는 삭제할 예정
  const handleCountryWithDialSelect = useCallback(
    (dial: string) => {
      if (!data) return;

      const selectedCountryList = Object.values(data).filter(
        (item) => item.dial === dial,
      )[0];

      setSelectedCountry(selectedCountryList);
    },
    [data],
  );

  useEffect(() => {
    if (!data || !countryCode) return;

    setSelectedCountry(data[countryCode]);
  }, [data, countryCode]);

  return {
    selectedCountry,
    handleCountryWithCodeSelect,
    handleCountryWithDialSelect,
  };
};

export default useCountryList;
