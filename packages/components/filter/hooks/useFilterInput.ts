import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";

import { useSearchParams } from "react-router-dom";

const useFilterInput = (
  queryKey: string,
  filterLocalValue: { [key: string]: string | string[] },
  handleConditionFocus: () => void,
  handleConditionBlur: () => void,
  handleConditionErrorCreate: () => void,
  handleConditionErrorDelete: () => void,
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void,
  handleSetFilterLabel: (
    queryKey: string,
    searchResult: string | string[],
  ) => void,
  typingValueBlockRegExp?: RegExp,
  typingValueReplacement?: {
    regExp: RegExp;
    func: (v: string) => string;
  },
  typingValueLength?: number,
) => {
  const [searchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const applyButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isVisibleApplyButton, setVisibleApplyButton] = useState(false);

  const filterValue = filterLocalValue[queryKey];
  // TODO: Type 통일 필요
  const inputValue = filterValue
    ? typeof filterValue === "object"
      ? filterValue[0]
      : filterValue
    : "";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    typingValueBlockRegExp?.test(value)
      ? handleConditionErrorCreate()
      : handleConditionErrorDelete();

    value = typingValueBlockRegExp
      ? value.replaceAll(typingValueBlockRegExp, "")
      : value;

    if (typingValueLength) {
      value = value.slice(0, typingValueLength);
      if (value.length !== typingValueLength) {
        handleConditionErrorCreate();
      } else {
        handleConditionErrorDelete();
      }
    }

    value = typingValueReplacement
      ? value.replace(typingValueReplacement.regExp, (v) =>
          typingValueReplacement.func(v),
        )
      : value;

    handleLocalValueChange(queryKey, value);
  };

  const handleSearchInput = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!inputValue.trim()) return alert("Please enter a search keyword.");

    handleSetFilterLabel(queryKey, inputValue);

    (document.activeElement as HTMLElement).blur();
    setVisibleApplyButton(false);
  };

  const handleFocusInput = (): void => {
    handleConditionFocus();
    setVisibleApplyButton(true);
  };

  const handleBlurInput = (): void => {
    // NOTE: Input에서 Apply 버튼 관련하여 하기 코드에 의해서 버튼 클릭 이벤트가 동작하지 않아 임시로 setTimeout 설정
    setTimeout(() => {
      if (document.activeElement === applyButtonRef.current) return;

      handleConditionBlur();
      handleConditionErrorDelete();
      setVisibleApplyButton(false);
    }, 0);
  };

  useEffect(() => {
    handleLocalValueChange(queryKey, searchParams.get(queryKey) ?? "");
  }, []);

  return {
    inputRef,
    applyButtonRef,
    isVisibleApplyButton,
    inputValue,
    handleFocusInput,
    handleBlurInput,
    handleInputChange,
    handleSearchInput,
  };
};

export default useFilterInput;
