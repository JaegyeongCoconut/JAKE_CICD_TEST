import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";

interface CommonPublicRouteProps {
  hasUser: boolean;
  forceLaoLanguage: boolean;
  navigatePath: string;
}

const CommonPublicRoute = ({
  hasUser,
  forceLaoLanguage,
  navigatePath,
}: CommonPublicRouteProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    forceLaoLanguage && i18n.changeLanguage("lo");
  }, []);

  if (hasUser) return <Navigate to={navigatePath} />;

  return <Outlet />;
};

export default CommonPublicRoute;
