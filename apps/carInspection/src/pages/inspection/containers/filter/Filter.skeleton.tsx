import React from "react";

import QueryFilterSkeleton from "@repo/components/queryFilterSkeleton";

import { QUERY_FILTER_SKELETON_ROWS } from "~assets";

import * as S from "./Filter.styled";

const FilterSkeleton = () => {
  return (
    <QueryFilterSkeleton
      css={S.filter}
      rows={QUERY_FILTER_SKELETON_ROWS["inspection"]}
    />
  );
};

export default FilterSkeleton;
