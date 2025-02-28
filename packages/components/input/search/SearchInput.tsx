import React from "react";

import { CircleCloseIcon, SearchIcon } from "@repo/assets/icon";
import type { Languages } from "@repo/types";

import * as S from "./SearchInput.styled";
import Input from "../Input";

interface QuerySearchInputProps {
  className?: string;
  inputAsidePadding: number;
  iconAsidePadding: number;
  placeholder: Languages;
  value: string;
  maxLength?: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputReset: () => void;
  handleSearch: (e: React.FormEvent) => void;
}
// TODO: 코코트럭과 KKM의 reset, 빈 값 입력시 쿼리 및 상태 초기화에 대한 논의가 필요
const SearchInput = ({
  className,
  inputAsidePadding,
  iconAsidePadding,
  placeholder,
  value,
  maxLength = 100,
  handleInputChange,
  handleInputReset,
  handleSearch,
}: QuerySearchInputProps) => {
  return (
    <S.Form className={className} onSubmit={handleSearch}>
      <S.SearchButton iconAsidePadding={iconAsidePadding}>
        <SearchIcon css={S.searchIcon} />
      </S.SearchButton>
      <Input
        css={S.input({
          hasValue: !!value,
          inputAsidePadding: inputAsidePadding,
          iconAsidePadding: iconAsidePadding,
        })}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        handleChange={handleInputChange}
      />
      {value && (
        <S.CloseButton
          type="button"
          onClick={handleInputReset}
          iconAsidePadding={iconAsidePadding}
        >
          <CircleCloseIcon />
        </S.CloseButton>
      )}
    </S.Form>
  );
};

export default SearchInput;
