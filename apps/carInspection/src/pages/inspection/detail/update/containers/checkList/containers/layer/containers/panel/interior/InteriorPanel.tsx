import React from "react";

import * as S from "./InteriorPanel.styled";
import Body from "../containers/body/Body";
import Header from "../containers/header/Header";

const InteriorPanel = () => {
  return (
    <S.Wrapper>
      <Header />
      <Body type="interior" />
    </S.Wrapper>
  );
};

export default InteriorPanel;
