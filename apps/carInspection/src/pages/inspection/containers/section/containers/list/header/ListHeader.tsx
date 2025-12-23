import React from "react";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";
import { useServiceTranslation } from "~hooks";

import * as S from "./ListHeader.styled";

const ListHeader = () => {
  const { defaultLanguage } = useServiceTranslation();

  return (
    <S.ListHeader>
      {INSPECTION_TABLE_HEADER_INFOS.map(({ key, label }) => (
        <S.ListHeaderItem key={key}>
          {defaultLanguage({ text: label })}
        </S.ListHeaderItem>
      ))}
    </S.ListHeader>
  );
};

export default ListHeader;
