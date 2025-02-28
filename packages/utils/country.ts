import type { Country, GetCountriesClientModel } from "@repo/types";

export const getCountryList = (
  countryCodeList: (keyof GetCountriesClientModel)[],
  totalCountryList?: GetCountriesClientModel,
): GetCountriesClientModel => {
  if (!totalCountryList) return {};

  const newCountryList = countryCodeList.reduce<GetCountriesClientModel>(
    (acc, value) => {
      if (value) {
        const country = totalCountryList[value];
        if (country) {
          acc[value] = country;
        }
      }
      return acc;
    },
    {},
  );

  return newCountryList;
};

export const getFilterCountries = (
  countries: GetCountriesClientModel,
  filterValues: string[],
): Country[] =>
  Object.values(countries)
    ?.filter((country) => !filterValues.includes(country.code))
    ?.filter(Boolean);
