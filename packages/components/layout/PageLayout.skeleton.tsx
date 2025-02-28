import React from "react";

import Skeleton from "react-loading-skeleton";

import type { Languages } from "@repo/types";

import * as S from "./PageLayout.styled";
import BreadcrumbSkeleton from "../breadcrumb/Breadcrumb.skeleton";
import PageHeader from "../header/pageHeader/PageHeader";

interface PageLayoutSkeletonProps {
  className?: string;
  heading?: Languages;
  length: number;
}

const PageLayoutSkeleton = ({
  className,
  heading,
  length,
}: PageLayoutSkeletonProps) => {
  return (
    // NOTE: className으로 접근하기 위해 div 추가
    <div className={className}>
      <BreadcrumbSkeleton length={length} />
      {heading ? (
        <PageHeader heading={heading} />
      ) : (
        <Skeleton css={S.skeleton} width={100} height={40} />
      )}
    </div>
  );
};

export default PageLayoutSkeleton;
