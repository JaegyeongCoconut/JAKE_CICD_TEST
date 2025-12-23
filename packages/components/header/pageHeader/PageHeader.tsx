import React from "react";

import * as S from "./PageHeader.styled";
import Heading from "../../heading/Heading";

interface BasePageHeaderProps {
  className?: string;
  heading: string;
}

interface WithoutMarginBottomPageHeaderProps extends BasePageHeaderProps {
  hasMarginBottom: false;
  marginBottom?: never;
}

interface WithMarginBottomPageHeaderProps extends BasePageHeaderProps {
  hasMarginBottom: true;
  marginBottom: number;
}

type PageHeaderProps =
  | WithoutMarginBottomPageHeaderProps
  | WithMarginBottomPageHeaderProps;

const PageHeader = ({
  className,
  heading,
  hasMarginBottom,
  marginBottom,
}: PageHeaderProps) => {
  return (
    <S.PageHeader
      className={className}
      hasMarginBottom={hasMarginBottom}
      marginBottom={marginBottom ?? 0}
    >
      <Heading css={S.heading} hasA11y={false} tags={{ h2: heading }} />
    </S.PageHeader>
  );
};

export default PageHeader;
