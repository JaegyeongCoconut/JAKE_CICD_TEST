import React from "react";

import * as S from "./UndersidePanel.styled";
import Body from "../containers/body/Body";
import Header from "../containers/header/Header";

const UndersidePanel = () => {
  return (
    <S.Wrapper>
      <Header />
      <Body type="underside" />
    </S.Wrapper>
  );
};

export default UndersidePanel;
