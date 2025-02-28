import React, { useState, memo, useEffect, useMemo } from "react";

import { isEmpty } from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import { ChevronDownIcon } from "@repo/assets/icon";
import useDropdown from "@repo/hooks/dropdown/useDropdown";
import { useRecentSearchStore } from "@repo/stores/persist";
import type { Country, GetCountriesClientModel } from "@repo/types";
import { getCountryList, getFilterCountries } from "@repo/utils/country";

import * as S from "./CountryListDropdown.styled";

export interface MemorizedCountryListDropdownProps {
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  selectedCountry: Country;
  countries?: GetCountriesClientModel;
  handleCountryWithCodeSelect: (code: string) => void;
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
  const addCountryCode = useRecentSearchStore((state) => state.addCountryCode);
  const initializeCountryCodes = useRecentSearchStore(
    (state) => state.initializeCountryCodes,
  );

  const handleSelect = (code: string) => {
    addCountryCode(code);
    setSelectedOption(code);
    handleCountryWithCodeSelect(code);
  };

  const { dropdownRef, optionsRef, isOpen, handleOpener, handleOptionClick } =
    useDropdown(selectedOption, handleSelect);

  const fixedCountries = useMemo(
    () => getCountryList(fixedCountryCode, countries),
    [countries],
  );

  const recentCountries = useMemo(
    () => getCountryList(countryCodes, countries),
    [countryCodes, countries],
  );

  const filteredRecentCountries = useMemo(
    () => getFilterCountries(recentCountries, fixedCountryCode),
    [recentCountries],
  );

  const filteredRemainCountries = useMemo(
    () => (countries ? getFilterCountries(countries, countryCodes) : []),
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
    <S.Dropdown ref={dropdownRef} className={className}>
      <S.CustomDropdownButton
        aria-controls={id}
        aria-expanded={isOpen}
        data-haserr={hasError}
        disabled={disabled}
        type="button"
        onClick={handleOpener}
      >
        <span>{selectedOption}</span>
        <ChevronDownIcon />
      </S.CustomDropdownButton>
      <S.CustomOptionWrapper
        ref={optionsRef}
        aria-hidden={!isOpen}
        id={id}
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
                  type="button"
                  data-selected={selectedOption === code}
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
