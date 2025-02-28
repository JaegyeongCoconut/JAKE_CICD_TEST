import React from "react";

import { NoneSearchIcon, NoneSelectIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./NoResult.styled";

interface NoResultProps {
  className?: string;
  contents: Languages[];
  type?: "search" | "select";
}

const NoResult = ({ className, contents, type = "search" }: NoResultProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const icon = {
    search: <NoneSearchIcon />,
    select: <NoneSelectIcon />,
  };

  return (
    <S.Wrapper className={className}>
      {icon[type]}
      <S.ContentWrapper>
        {contents.map((content) => (
          <S.Content key={content}>{defaultLanguage(content)}</S.Content>
        ))}
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default NoResult;
