import React from "react";

import * as S from "./PageLayout.styled";

interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
}

const PageLayout = ({ className, children }: PageLayoutProps) => {
  return <S.PageLayout className={className}>{children}</S.PageLayout>;
};

export default PageLayout;
