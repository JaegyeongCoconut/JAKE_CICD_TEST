import React from "react";

import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { ReactComponent as WebSearchIcon } from "@repo/assets/icon/ic_web_search.svg";
import { ReactComponent as WebSelectIcon } from "@repo/assets/icon/ic_web_select.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./NoResult.styled";

interface NoResultProps {
  className?: string;
  contents: Languages[];
  type?: "search" | "select" | "warning";
}

const NoResult = ({ className, contents, type = "search" }: NoResultProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const icon = {
    search: <WebSearchIcon />,
    select: <WebSelectIcon />,
    warning: <WarningIcon />,
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
