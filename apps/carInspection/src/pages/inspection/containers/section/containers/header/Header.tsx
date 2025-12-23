import React from "react";

import { formatICTDateTime } from "@repo/utils/date";

import { RefreshIcon } from "~assets";
import { LANGUAGE_LABEL } from "~constants";
import { useServiceTranslation } from "~hooks";

import * as S from "./Header.styled";

interface HeaderProps {
  dataUpdatedAt: number;
  length: number;
  onRefetch: () => void;
}

const Header = ({ length, dataUpdatedAt, onRefetch }: HeaderProps) => {
  const { defaultLanguage } = useServiceTranslation();

  return (
    <S.HeaderWapper>
      <S.HeaderTitle>{`${defaultLanguage({ text: LANGUAGE_LABEL.LIST })} (${length})`}</S.HeaderTitle>
      {!!dataUpdatedAt && (
        <>
          <S.HeaderSubTitle>{`${defaultLanguage({ text: LANGUAGE_LABEL.LAST_UPDATED })}:`}</S.HeaderSubTitle>
          <S.UpdatedDate>
            {formatICTDateTime({ date: dataUpdatedAt })}
          </S.UpdatedDate>
          <S.UpdateButton type="button" onClick={onRefetch}>
            <RefreshIcon css={S.resetIcon} />
          </S.UpdateButton>
        </>
      )}
    </S.HeaderWapper>
  );
};

export default Header;
