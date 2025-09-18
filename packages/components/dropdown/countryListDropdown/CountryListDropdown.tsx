import React, { useState, memo, useEffect, useMemo } from "react";

import { isEmpty } from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import useDropdown from "@repo/hooks/dropdown/useDropdown";
import { useRecentSearchStore } from "@repo/stores/persist";
import type { Country, GetCountriesClientModel } from "@repo/types";

import * as S from "./CountryListDropdown.styled";

export interface MemorizedCountryListDropdownProps {
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  countries?: GetCountriesClientModel;
  selectedCountry: Country;
  handleCountryWithCodeSelect: (code: string) => void;
}

interface GetCountriesProps {
  countryCodes: (keyof GetCountriesClientModel)[];
  totalCountries: GetCountriesClientModel | undefined;
}

interface GetFilterCountriesProps {
  countries: GetCountriesClientModel;
  filterValues: string[];
}

const MemorizedCountryListDropdown = ({
  className,
  disabled,
  hasError,
  selectedCountry,
  countries,
  handleCountryWithCodeSelect,
}: MemorizedCountryListDropdownProps) => {
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
    handleCountryWithCodeSelect(code);
  };

  const getCountries = ({
    countryCodes,
    totalCountries,
  }: GetCountriesProps): GetCountriesClientModel => {
    if (!totalCountries) return {};

    const newCountryList = countryCodes.reduce<GetCountriesClientModel>(
      (acc, value) => {
        if (value) {
          const country = totalCountries[value];
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

  const getFilterCountries = ({
    countries,
    filterValues,
  }: GetFilterCountriesProps): Country[] =>
    Object.values(countries)
      ?.filter((country) => !filterValues.includes(country.code))
      ?.filter(Boolean);

  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown({
      tagValue: selectedOption,
      handleSelect,
      handleConditionBlur: undefined,
      handleConditionFocus: undefined,
    });

  const fixedCountries = useMemo(
    () =>
      getCountries({
        countryCodes: fixedCountryCode,
        totalCountries: countries,
      }),
    [countries],
  );

  const recentCountries = useMemo(
    () =>
      getCountries({
        countryCodes: countryCodes,
        totalCountries: countries,
      }),
    [countryCodes, countries],
  );

  const filteredRecentCountries = useMemo(
    () =>
      getFilterCountries({
        countries: recentCountries,
        filterValues: fixedCountryCode,
      }),
    [recentCountries],
  );

  const filteredRemainCountries = useMemo(
    () =>
      countries
        ? getFilterCountries({ countries, filterValues: countryCodes })
        : [],
    [countries, countryCodes],
  );

  useEffect(() => {
    initializeCountryCodes(selectedCountry.code);
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
        {Object.values(fixedCountries)
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

        {countries &&
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
