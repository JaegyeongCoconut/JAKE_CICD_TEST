import React from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./Breadcrumb.styled";

interface BreadcrumbSkeletonProps {
  className?: string;
  length: number;
}

const BreadcrumbSkeleton = ({ className, length }: BreadcrumbSkeletonProps) => {
  return (
    <S.PageLayoutBreadcrumb className={className}>
      {Array.from({ length }, (_, i) => (
        <S.PageLayoutBreadcrumbLi key={i} hasEllipsis={false} content="">
          <Skeleton key={i} width={80} height={20} />
        </S.PageLayoutBreadcrumbLi>
      ))}
    </S.PageLayoutBreadcrumb>
  );
};

export default BreadcrumbSkeleton;
