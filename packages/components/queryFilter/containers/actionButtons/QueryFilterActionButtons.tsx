import React from "react";

import { useSearchParams } from "react-router-dom";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import useQueryInitFilterHooks from "@repo/hooks/queryFilter/useQueryInitFilterHooks";

import * as S from "./QueryFilterActionButtons.styled";
import Button from "../../../button/Button";

interface QueryFilterActionButtonsProps {
  className?: string;
  isLoadingApplyButton: boolean;
  marginButton?: number;
}

const QueryFilterActionButtons = ({
  className,
  isLoadingApplyButton,
  marginButton,
}: QueryFilterActionButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { queryFilters, resetAllValues } = useQueryFilterHooks();
  const { isInitQueryFilter, setIsInitQueryFilter } = useQueryInitFilterHooks();

  const isResetButtonDisabled = Object.entries(queryFilters).every(
    ([_, { tagValue }]) => tagValue.length === 0,
  );
  const isApplyButtonDisabled = Object.values(queryFilters).some(
    ({ tagValue, isRequired }) => isRequired && tagValue?.length === 0,
  );

  const handleApplyButtonClick = (): void => {
    const searchQueryFilter = Object.entries(queryFilters).reduce(
      (acc, [key, { tagValue, type, queryKey }]) => {
        if (!tagValue.length) return acc;

        const value =
          type === QUERY_FILTER_TYPE.CALENDAR
            ? `${tagValue[0]} ~ ${tagValue[1] ?? tagValue[0]}`
            : tagValue;

        const finalKey = type === QUERY_FILTER_TYPE.CALENDAR ? queryKey : key;

        return { ...acc, [finalKey]: value };
      },
      {},
    );

    const tabParams = ["tab", "subTab"].reduce<Record<string, string>>(
      (acc, key) => {
        const value = searchParams.get(key);

        if (value) acc[key] = value;

        return acc;
      },
      {},
    );

    setSearchParams({ ...tabParams, ...searchQueryFilter }, { replace: true });

    isInitQueryFilter && setIsInitQueryFilter(false);
  };

  return (
    <S.QueryFilterActionButtonsWrapper
      className={className}
      marginButton={marginButton}
    >
      <Button
        variant="secondary"
        disabled={isResetButtonDisabled}
        isLoading={false}
        label={LANGUAGE_LABEL.RESET}
        handleButtonClick={resetAllValues}
      />
      <Button
        variant="primary"
        disabled={isApplyButtonDisabled}
        isLoading={isLoadingApplyButton}
        label={LANGUAGE_LABEL.APPLY}
        handleButtonClick={handleApplyButtonClick}
      />
    </S.QueryFilterActionButtonsWrapper>
  );
};

export default QueryFilterActionButtons;
