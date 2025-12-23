import React from "react";

import { Outlet } from "react-router-dom";

import * as S from "./PublicLayout.styled";

interface PublicLayoutProps {
  paddingTop: string;
}

const PublicLayout = ({ paddingTop }: PublicLayoutProps) => {
  return (
    <S.PublicLayout paddingTop={paddingTop}>
      <Outlet />
    </S.PublicLayout>
  );
};

export default PublicLayout;
