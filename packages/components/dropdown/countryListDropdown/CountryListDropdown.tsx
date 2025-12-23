import React, { useState, memo, useEffect, useMemo } from "react";

import { isEmpty } from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { DEFAULT_COUNTRY_CODE_INFO } from "@repo/assets/static/phone";
import useDropdown from "@repo/hooks/dropdown/useDropdown";
import { useRecentSearchStore } from "@repo/stores/persist";
import type { CountryModel, Country } from "@repo/types";

import * as S from "./CountryListDropdown.styled";

interface AbledMemorizedCountryListDropdownProps {
  className?: string;
  disabled: boolean;
  hasError: boolean;
  country: CountryModel | undefined;
  selectedCountry: Country;
  handleCountryWithCodeSelect: (code: string) => void;
}

interface DisabledMemorizedCountryListDropdownProps {
  className?: string;
  disabled: true;
  hasError?: never;
  country?: never;
  selectedCountry: Country;
  handleCountryWithCodeSelect?: never;
}

interface GetCountryProps {
  countryCodes: (keyof CountryModel)[];
  countryItem: CountryModel | undefined;
}

interface GetFilterCountriesProps {
  country: CountryModel;
  filterValues: string[];
}

const MemorizedCountryListDropdown = ({
  className,
  disabled,
  hasError,
  selectedCountry,
  country,
  handleCountryWithCodeSelect,
}:
  | AbledMemorizedCountryListDropdownProps
  | DisabledMemorizedCountryListDropdownProps) => {
  const id = uuidv4();
  const fixedCountryCode = ["LA"];
  const [selectedOption, setSelectedOption] = useState("");

  const countryCodes = useRecentSearchStore((state) => state.countryCodes);
  const addCountryCode = useRecentSearchStore(
    (state) => state.onAddCountryCode,
  );
  const initializeCountryCodes = useRecentSearchStore(
    (state) => state.onInitializeCountryCodes,
  );

  const handleSelect = (code: string) => {
    addCountryCode(code);
    setSelectedOption(code);
    handleCountryWithCodeSelect && handleCountryWithCodeSelect(code);
  };

  const getCountry = ({
    countryCodes,
    countryItem,
  }: GetCountryProps): CountryModel => {
    if (!countryItem) return {};

    const newCountry = countryCodes.reduce<CountryModel>((acc, value) => {
      if (value) {
        const country = countryItem[value];
        if (country) {
          acc[value] = country;
        }
      }
      return acc;
    }, {});

    return newCountry;
  };

  const getFilterCountries = ({
    country,
    filterValues,
  }: GetFilterCountriesProps): Country[] => {
    if (!country) return [];

    return Object.values(country).reduce<Country[]>((acc, value) => {
      if (!filterValues.includes(value.code)) {
        acc.push({ name: value.name, code: value.code, dial: value.dial });
      }
      return acc;
    }, []);
  };

  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown({
      tagValue: selectedOption,
      handleSelect,
    });

  const fixedCountry = useMemo(
    () =>
      getCountry({
        countryCodes: fixedCountryCode,
        countryItem: country,
      }),
    [country],
  );

  const recentCountry = useMemo(
    () => getCountry({ countryCodes: countryCodes, countryItem: country }),
    [countryCodes, country],
  );

  const filteredRecentCountries = useMemo(
    () =>
      getFilterCountries({
        country: recentCountry,
        filterValues: fixedCountryCode,
      }),
    [recentCountry],
  );

  const filteredRemainCountries = useMemo(
    () =>
      country
        ? getFilterCountries({ country, filterValues: countryCodes })
        : [],
    [country, countryCodes],
  );

  useEffect(() => {
    initializeCountryCodes(
      selectedCountry?.code ?? DEFAULT_COUNTRY_CODE_INFO.code,
    );
  }, []);

  useEffect(() => {
    if (isEmpty(selectedCountry)) return;

    setSelectedOption(selectedCountry.code);
  }, [selectedCountry]);

  return (
    <S.Dropdown className={className} ref={dropdownRef}>
      <S.CustomDropdownButton
        aria-controls={id}
        aria-expanded={isOpen}
        data-haserr={hasError}
        disabled={disabled}
        type="button"
        onClick={handleOpener}
      >
        <span>{selectedOption}</span>
        <DownIcon />
      </S.CustomDropdownButton>
      <S.CustomOptionWrapper
        ref={optionsRef}
        id={id}
        aria-hidden={!isOpen}
        isOpen={isOpen}
      >
        {fixedCountry &&
          Object.values(fixedCountry)
            ?.filter(Boolean)
            .map((country, i) => (
              <S.CustomOption key={i}>
                <S.CustomOptionButton
                  type="button"
                  onClick={handleOptionClick(country.code)}
                >
                  <S.CountryCode>{country.code}</S.CountryCode>
                  <S.CountryInfo>{`${country.name} (${country.dial})`}</S.CountryInfo>
                </S.CustomOptionButton>
              </S.CustomOption>
            ))}
        {filteredRecentCountries
          ?.filter(Boolean)
          .map(({ code, name, dial }, i) => (
            <S.CustomOption key={i}>
              <S.CustomOptionButton
                type="button"
                onClick={handleOptionClick(code)}
              >
                <S.CountryCode>{code}</S.CountryCode>
                <S.CountryInfo>{`${name} (${dial})`}</S.CountryInfo>
              </S.CustomOptionButton>
            </S.CustomOption>
          ))}
        {country &&
          filteredRemainCountries?.map(({ code, name, dial }, i) => {
            return (
              <S.CustomOption key={i}>
                <S.CustomOptionButton
                  data-selected={selectedOption === code}
                  type="button"
                  onClick={handleOptionClick(code)}
                >
                  <S.CountryCode>{code}</S.CountryCode>
                  <S.CountryInfo>{`${name} (${dial})`}</S.CountryInfo>
                </S.CustomOptionButton>
              </S.CustomOption>
            );
          })}
      </S.CustomOptionWrapper>
    </S.Dropdown>
  );
};

const CountryListDropdown = memo(MemorizedCountryListDropdown);
export default CountryListDropdown;
