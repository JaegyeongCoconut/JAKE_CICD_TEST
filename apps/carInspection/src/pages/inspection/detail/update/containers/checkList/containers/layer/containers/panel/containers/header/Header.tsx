import React from "react";

import { INSPECTION_CHECKLIST_TABLE_HEADER_INFOS } from "~assets";
import { useServiceTranslation } from "~hooks";

import * as S from "./Header.styled";

const Header = () => {
  const { defaultLanguage } = useServiceTranslation();

  return (
    <S.ListHeader>
      {INSPECTION_CHECKLIST_TABLE_HEADER_INFOS.map(({ key, label }) => (
        <S.ListHeaderItem key={key}>
          {defaultLanguage({ text: label })}
        </S.ListHeaderItem>
      ))}
    </S.ListHeader>
  );
};

export default Header;
