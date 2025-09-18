import type { ChangeEvent, FormEvent } from "react";
import { useContext, useEffect, useState } from "react";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateMaped } from "@repo/types";

import { QueryFilterFieldStateContext } from "../../../../../context/QueryFilterFieldStateContext";

interface UseQueryFilterFieldInputProps<T extends string> {
  filter:
    | QueryFilterStateMaped<T>[
        | typeof QUERY_FILTER_TYPE.INPUT
        | typeof QUERY_FILTER_TYPE.INPUT_REGEXP
        | typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH]
    | undefined;
}

const useQueryFilterFieldInput = <T extends string>({
  filter,
}: UseQueryFilterFieldInputProps<T>) => {
  const { handleErrorClear, handleBlur, handleFocus, onSetError } = useContext(
    QueryFilterFieldStateContext,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [localInputValue, setLocalInputValue] = useState(
    filter?.inputValue ?? "",
  );

  const { updateInputValue, updateTagValue } = useQueryFilterHooks();

  const handleInputFocus = (): void => {
    if (!filter) return;

    handleFocus();
    setIsVisible(true);
  };
  const handleInputBlur = (): void => {
    if (!filter) return;

    handleBlur();
    handleErrorClear();
    setIsVisible(false);
  };
  const handleApplyButtonMouseDown = (queryKey: T) => (): void => {
    if (!filter) return;

    updateTagValue({ queryKey, selectedKey: localInputValue });
    updateInputValue({ queryKey, inputValue: localInputValue });
    handleBlur();
    handleErrorClear();
    setIsVisible(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!filter) return;

    let { value } = e.target;

    switch (filter.type) {
      case QUERY_FILTER_TYPE.INPUT_REGEXP:
        const { regExp } = filter;
        const isInvalidTextPattern = regExp.test(value);
        isInvalidTextPattern ? onSetError() : handleErrorClear();
        value = value.replaceAll(regExp, "");
        break;
      case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH:
        const { regExp: fullLengthRegExp, maxLength } = filter;
        const isInvalidFullLengthPattern = fullLengthRegExp.test(value);
        const isLessThanTextMaxLength = value.length !== maxLength;
        isInvalidFullLengthPattern || isLessThanTextMaxLength
          ? onSetError()
          : handleErrorClear();
        value = value.replaceAll(fullLengthRegExp, "");
        break;
    }

    setLocalInputValue(value);
  };
  const handleInputSearch =
    (queryKey: T) =>
    (e: FormEvent<HTMLFormElement>): void => {
      if (!filter) return;

      e.preventDefault();

      if (!localInputValue) return alert("Please enter a search keyword.");

      updateTagValue({ queryKey, selectedKey: localInputValue });
      updateInputValue({ queryKey, inputValue: localInputValue });
      handleBlur();
      setIsVisible(false);
    };

  useEffect(() => {
    setLocalInputValue(filter?.inputValue ?? "");
  }, [filter?.inputValue]);

  return {
    localInputValue,
    isVisible,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleInputSearch,
    handleApplyButtonMouseDown,
  };
};

export default useQueryFilterFieldInput;
