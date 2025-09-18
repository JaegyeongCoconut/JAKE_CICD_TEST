import React from "react";

import { Outlet } from "react-router-dom";

import * as S from "./PrivateLayout.styled";

const PrivateLayout = () => {
  return (
    <S.Main>
      <Outlet />
    </S.Main>
  );
};

export default PrivateLayout;
