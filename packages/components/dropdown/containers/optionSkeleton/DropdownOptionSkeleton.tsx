import React from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./DropdownOptionSkeleton.styled";

const DropdownOptionSkeleton = () => {
  return (
    <S.DropdownOptionSkeleton>
      <Skeleton width={400} height={22} />
    </S.DropdownOptionSkeleton>
  );
};

export default DropdownOptionSkeleton;
