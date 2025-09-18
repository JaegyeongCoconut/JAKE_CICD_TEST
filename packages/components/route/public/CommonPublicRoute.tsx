import React from "react";

import * as S from "./CommonPublicRoute.styled";
import HeadlessPublicRoute from "./HeadlessPublicRoute";

interface CommonPublicRouteProps {
  hasUser: boolean;
  paddingTop: string;
  navigatePath: string;
}

const CommonPublicRoute = ({
  hasUser,
  navigatePath,
  paddingTop,
}: CommonPublicRouteProps) => {
  return (
    <HeadlessPublicRoute
      css={S.commonPublicRoute(paddingTop)}
      hasUser={hasUser}
      navigatePath={navigatePath}
    />
  );
};

export default CommonPublicRoute;
