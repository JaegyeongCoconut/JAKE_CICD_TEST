import React from "react";

import * as S from "./Heading.styled";

interface HeadingProps {
  className?: string;
  hasA11y: boolean;
  tags:
    | { h1: string; h2?: never; h3?: never }
    | { h1?: never; h2: string; h3?: never }
    | { h1?: never; h2?: never; h3: string };
}

const Heading = ({ className, hasA11y, tags }: HeadingProps) => {
  return (
    <>
      {tags.h1 && (
        <S.H1 className={className} hasA11y={hasA11y}>
          {tags.h1}
        </S.H1>
      )}
      {tags.h2 && (
        <S.H2 className={className} hasA11y={hasA11y}>
          {tags.h2}
        </S.H2>
      )}
      {tags.h3 && (
        <S.H3 className={className} hasA11y={hasA11y}>
          {tags.h3}
        </S.H3>
      )}
    </>
  );
};

export default Heading;
