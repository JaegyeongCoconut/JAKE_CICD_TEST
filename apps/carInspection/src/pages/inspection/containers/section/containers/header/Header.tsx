import React from "react";

import { useTranslation } from "react-i18next";

import { formatICTDateTime } from "@repo/utils/date";

import { RefreshIcon } from "~assets";
import { LANGUAGE_LABEL } from "~constants";

import * as S from "./Header.styled";

interface HeaderProps {
  dataUpdatedAt: number;
  length: number;
  onRefetch: () => void;
}

const Header = ({ length, dataUpdatedAt, onRefetch }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <S.HeaderWapper>
      <S.HeaderTitle>{`${t(LANGUAGE_LABEL.LIST)} (${length})`}</S.HeaderTitle>
      {!!dataUpdatedAt && (
        <>
          <S.HeaderSubTitle>{`${t(LANGUAGE_LABEL.LAST_UPDATED)}:`}</S.HeaderSubTitle>
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
