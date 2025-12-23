import React from "react";

import { useIsFetching } from "@tanstack/react-query";

import QueryFilter from "@repo/components/queryFilter";
import type { QueryFilterConstructorType } from "@repo/types";
import { mappingToKeyLabelSelects } from "@repo/utils/mapping";

import type { INSPECTION_QUERY_FILTERS } from "~assets";
import { LANGUAGE_LABEL } from "~constants";
import { makerKeys, useGetMakers } from "~services";
import type { CarInspectionLanguages } from "~types";

import * as S from "./Filter.styled";

const Filter = () => {
  const fetchingQueryNumber = useIsFetching({ queryKey: makerKeys.makers() });
  const { data } = useGetMakers();

  const brandDropdown = mappingToKeyLabelSelects<CarInspectionLanguages>(
    data?.makers,
  );

  const filterConstructor = {
    brand: {
      type: "dropdown",
      queryKey: "brand",
      label: LANGUAGE_LABEL.BRAND,
      selections: brandDropdown,
      isRequired: true,
      placeholder: LANGUAGE_LABEL.SELECT_THE_OPTION,
    },
    frameNo: {
      type: "input",
      queryKey: "frameNo",
      maxLength: 17,
      label: LANGUAGE_LABEL.FRAME_NUMBER,
      placeholder: LANGUAGE_LABEL.ENTER_THE_FRAME_NUMBER,
    },
    model: {
      type: "input",
      queryKey: "model",
      maxLength: 100, // NOTE: 임시값
      label: LANGUAGE_LABEL.MODEL,
      placeholder: LANGUAGE_LABEL.ENTER_THE_MODEL,
    },
    engineNo: {
      type: "input",
      queryKey: "engineNo",
      maxLength: 100,
      label: LANGUAGE_LABEL.ENGINE_NUMBER,
      placeholder: LANGUAGE_LABEL.ENTER_THE_ENGINE_NUMBER,
    },
  } satisfies QueryFilterConstructorType<
    (typeof INSPECTION_QUERY_FILTERS)[number]
  >;

  return (
    <QueryFilter
      css={S.filter}
      isLoadingApplyButton={!!fetchingQueryNumber}
      constructor={filterConstructor}
    >
      <QueryFilter.Row>
        <QueryFilter.Field
          disabled={false}
          controls={filterConstructor.brand}
        />
        <QueryFilter.Field
          disabled={false}
          controls={filterConstructor.frameNo}
        />
      </QueryFilter.Row>
      <QueryFilter.Row>
        <QueryFilter.Field
          disabled={false}
          controls={filterConstructor.model}
        />
        <QueryFilter.Field
          disabled={false}
          controls={filterConstructor.engineNo}
        />
      </QueryFilter.Row>
    </QueryFilter>
  );
};

export default Filter;
