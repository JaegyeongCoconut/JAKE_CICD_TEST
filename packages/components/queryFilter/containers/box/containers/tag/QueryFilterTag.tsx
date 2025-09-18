import React from "react";

import { ReactComponent as CloseIcon } from "@repo/assets/icon/ic_close.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./QueryFilterTag.styled";
import Button from "../../../../../button/Button";

interface QueryFilterTagProps {
  isExpanded: boolean;
  content: string;
  label: Languages;
  wrapperWidth: number;
  handleTagDeleteButtonClick: () => void;
}

const QueryFilterTag = ({
  label,
  content,
  isExpanded,
  wrapperWidth,
  handleTagDeleteButtonClick,
}: QueryFilterTagProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.QueryFilterTag isExpanded={isExpanded} wrapperWidth={wrapperWidth}>
      <S.QueryFilterTagName>{defaultLanguage(label)}: </S.QueryFilterTagName>
      <S.QueryFilterTagContent>
        {Array.isArray(content)
          ? content
          : defaultLanguage(content as Languages)}
      </S.QueryFilterTagContent>
      <Button
        css={S.button}
        variant="iconOnly"
        disabled={false}
        Icon={CloseIcon}
        handleButtonClick={handleTagDeleteButtonClick}
      />
    </S.QueryFilterTag>
  );
};

export default QueryFilterTag;
