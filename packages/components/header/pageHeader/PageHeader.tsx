import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./PageHeader.styled";
import Heading from "../../heading/Heading";

interface PageHeaderProps {
  className?: string;
  heading: Languages;
  button?: React.ReactNode;
  marginBottom?: number;
}

const PageHeader = ({
  className,
  heading,
  button,
  marginBottom,
}: PageHeaderProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.PageHeader className={className} marginBottom={marginBottom}>
      <Heading
        css={S.heading}
        hasA11y={false}
        tags={{ h2: defaultLanguage(heading) }}
      />
      {button && button}
    </S.PageHeader>
  );
};

export default PageHeader;
