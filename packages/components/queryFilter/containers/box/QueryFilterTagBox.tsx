import React, { useEffect, useRef, useState } from "react";

import type { jsx } from "@emotion/react";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useQueryFilterHooks from "@repo/hooks/queryFilter/useQueryFilterHooks";
import type { QueryFilterStateUnion } from "@repo/types";

import * as S from "./QueryFilterTagBox.styled";
import QueryFilterTag from "./containers/tag/QueryFilterTag";

const QueryFilterTagBox = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const { queryFilters, updateTagValue, updateInputValue } =
    useQueryFilterHooks();

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(() => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.offsetWidth);
      }
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  if (!queryFilters) return null;

  const handleTagDeleteButtonClick =
    (queryKey: string, selectedTag: string | string[]) => (): void => {
      updateTagValue({
        queryKey,
        selectedKey: Array.isArray(selectedTag) ? [] : "",
      });
      updateInputValue({ queryKey, inputValue: "" });
    };

  const renderer: {
    [K in QueryFilterStateUnion["type"]]: (
      queryFilter: Extract<QueryFilterStateUnion, { type: K }>,
    ) => jsx.JSX.Element | null;
  } = {
    [QUERY_FILTER_TYPE.CHECKBOX]: ({
      label,
      tagValue,
      selections,
      queryKey,
      hasAllCheckButton,
    }) => {
      if (!tagValue.length) return null;

      const allSelected =
        selections &&
        hasAllCheckButton &&
        tagValue.length === selections.length;
      const content = allSelected
        ? "All"
        : tagValue
            .map(
              (key) =>
                selections?.find((selection) => selection.key === key)?.label ??
                "",
            )
            .join(", ");

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded
          content={content}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.CALENDAR]: ({
      calendarType,
      label,
      tagValue,
      queryKey,
    }) => {
      if (!tagValue.length) return null;

      const formatCalendarContent = (tagValue: string[]): string => {
        const [startDate, endDate] = tagValue;

        return calendarType === "free"
          ? `${startDate} ~ ${endDate || startDate}`
          : startDate;
      };

      return (
        <QueryFilterTag
          key={`${queryKey} - ${label}`}
          isExpanded={false}
          content={formatCalendarContent(tagValue)}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.RADIO]: ({ label, tagValue, selections, queryKey }) => {
      if (!tagValue) return null;

      const selected = selections?.find(({ key }) => key === tagValue);
      if (!selected) return null;

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded={false}
          content={selected.label}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.DROPDOWN]: ({
      label,
      tagValue,
      selections,
      queryKey,
    }) => {
      if (!tagValue) return null;

      const selected = selections?.find(({ key }) => key === tagValue);
      if (!selected) return null;

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded={false}
          content={selected.label}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.INPUT]: ({ label, tagValue, queryKey }) => {
      if (!tagValue) return null;

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded={false}
          content={tagValue}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.INPUT_REGEXP]: ({ label, tagValue, queryKey }) => {
      if (!tagValue) return null;

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded={false}
          content={tagValue}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },

    [QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH]: ({
      label,
      tagValue,
      queryKey,
    }) => {
      if (!tagValue) return null;

      return (
        <QueryFilterTag
          key={queryKey}
          isExpanded={false}
          content={tagValue}
          label={label}
          wrapperWidth={wrapperWidth}
          handleTagDeleteButtonClick={handleTagDeleteButtonClick(
            queryKey,
            tagValue,
          )}
        />
      );
    },
  };

  const renderQueryFilterTag = <K extends QueryFilterStateUnion["type"]>(
    queryFilter: Extract<QueryFilterStateUnion, { type: K }>,
  ): jsx.JSX.Element | null => {
    const renderFn = renderer[queryFilter.type];

    return renderFn ? renderFn(queryFilter) : null;
  };

  return (
    <S.QueryFilterTagBoxWrapper ref={wrapperRef}>
      <S.QueryFilterTagBox>
        {Object.values(queryFilters).map(renderQueryFilterTag)}
      </S.QueryFilterTagBox>
    </S.QueryFilterTagBoxWrapper>
  );
};

export default QueryFilterTagBox;
