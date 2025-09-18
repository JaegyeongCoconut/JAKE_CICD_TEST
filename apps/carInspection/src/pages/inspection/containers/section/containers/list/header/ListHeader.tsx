import React from "react";

import { useTranslation } from "react-i18next";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";

import * as S from "./ListHeader.styled";

const ListHeader = () => {
  const { t } = useTranslation();

  return (
    <S.ListHeader>
      {INSPECTION_TABLE_HEADER_INFOS.map(({ key, label }) => (
        <S.ListHeaderItem key={key}>{t(label)}</S.ListHeaderItem>
      ))}
    </S.ListHeader>
  );
};

export default ListHeader;
