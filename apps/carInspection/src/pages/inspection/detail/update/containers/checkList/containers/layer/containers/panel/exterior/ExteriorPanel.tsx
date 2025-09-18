import React from "react";

import * as S from "./ExteriorPanel.styled";
import Body from "../containers/body/Body";
import Header from "../containers/header/Header";

const ExteriorPanel = () => {
  return (
    <S.Wrapper>
      <Header />
      <Body type="exterior" />
    </S.Wrapper>
  );
};

export default ExteriorPanel;
