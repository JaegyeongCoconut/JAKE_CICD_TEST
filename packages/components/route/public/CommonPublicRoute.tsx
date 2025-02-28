import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import * as S from "./CommonPublicRoute.styled";

interface PublicRouteLayoutProps {
  hasUser: boolean;
  navigatePath: string;
  paddingTop: string;
}

const CommonPublicRoute = ({
  hasUser,
  navigatePath,
  paddingTop,
}: PublicRouteLayoutProps) => {
  return hasUser ? (
    <Navigate to={navigatePath} />
  ) : (
    <S.PublicMain paddingTop={paddingTop}>
      <Outlet />
    </S.PublicMain>
  );
};

export default CommonPublicRoute;
