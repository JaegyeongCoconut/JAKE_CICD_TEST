import React from "react";

import * as S from "./PageHeader.styled";
import Heading from "../../heading/Heading";

interface PageHeaderProps {
  className?: string;
  marginBottom?: number;
  button?: React.ReactNode;
  heading: string;
}

const PageHeader = ({
  className,
  heading,
  button,
  marginBottom,
}: PageHeaderProps) => {
  return (
    <S.PageHeader className={className} marginBottom={marginBottom}>
      <Heading css={S.heading} hasA11y={false} tags={{ h2: heading }} />
      {button && button}
    </S.PageHeader>
  );
};

export default PageHeader;
