import React from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./DropdownOptionSkeleton.styled";

const DropdownOptionSkeleton = () => {
  return (
    <S.DropdownOptionSkeleton>
      <Skeleton height={22} width={400} />
    </S.DropdownOptionSkeleton>
  );
};

export default DropdownOptionSkeleton;
