import React from "react";

import { useTranslation } from "react-i18next";

import { INSPECTION_CHECKLIST_TABLE_HEADER_INFOS } from "~assets";

import * as S from "./Header.styled";

const Header = () => {
  const { t } = useTranslation();

  return (
    <S.ListHeader>
      {INSPECTION_CHECKLIST_TABLE_HEADER_INFOS.map(({ key, label }) => (
        <S.ListHeaderItem key={key}>{t(label)}</S.ListHeaderItem>
      ))}
    </S.ListHeader>
  );
};

export default Header;
