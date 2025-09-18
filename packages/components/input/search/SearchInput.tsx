import React from "react";

import { ReactComponent as CloseCircleIcon } from "@repo/assets/icon/ic_close_circle.svg";
import { ReactComponent as SearchIcon } from "@repo/assets/icon/ic_search.svg";
import type { Languages } from "@repo/types";

import * as S from "./SearchInput.styled";
import Input from "../Input";
import DisabledInput from "../disabled/DisabledInput";

interface SearchInputProps {
  className?: string;
  placeholder: Languages;
}

interface DisabledSearchInputProps extends SearchInputProps {
  disabled: true;
  value?: never;
  maxLength?: never;
  handleInputChange?: never;
  handleInputReset?: never;
  handleSearch?: never;
}

interface EnabledSearchInputProps extends SearchInputProps {
  disabled: false;
  value: string;
  maxLength: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputReset: () => void;
  handleSearch: (e: React.FormEvent) => void;
}

// TODO: 코코트럭과 KKM의 reset, 빈 값 입력시 쿼리 및 상태 초기화에 대한 논의가 필요
const SearchInput = ({
  className,
  placeholder,
  disabled,
  value,
  maxLength,
  handleInputChange,
  handleInputReset,
  handleSearch,
}: DisabledSearchInputProps | EnabledSearchInputProps) => {
  return (
    <S.Form className={className} onSubmit={handleSearch}>
      <S.SearchButton disabled={!value}>
        <SearchIcon css={S.searchIcon} />
      </S.SearchButton>
      {!disabled ? (
        <>
          <Input
            css={S.input(true)}
            disabled={false}
            hasError={false}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            handleBlur={() => {}}
            handleChange={handleInputChange}
          />
          {value && (
            <S.CloseButton type="button" onClick={handleInputReset}>
              <CloseCircleIcon />
            </S.CloseButton>
          )}
        </>
      ) : (
        <DisabledInput
          css={S.input(false)}
          value=""
          placeholder={placeholder}
        />
      )}
    </S.Form>
  );
};

export default SearchInput;
