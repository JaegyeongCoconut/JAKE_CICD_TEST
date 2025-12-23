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

  const translateTagValue = (value: string): string => {
    if (isExpanded) {
      const pieces = value
        .split(",")
        .map((piece) => defaultLanguage({ text: piece.trim() as Languages }));

      return pieces.join(", ");
    }

    return defaultLanguage({ text: value as Languages });
  };

  return (
    <S.QueryFilterTag isExpanded={isExpanded} wrapperWidth={wrapperWidth}>
      <S.QueryFilterTagName>
        {defaultLanguage({ text: label })}:{" "}
      </S.QueryFilterTagName>
      <S.QueryFilterTagContent>
        {translateTagValue(content)}
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
