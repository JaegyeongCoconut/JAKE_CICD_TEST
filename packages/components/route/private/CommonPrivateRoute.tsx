import React, { useEffect } from "react";

import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import { useModalStore } from "@repo/stores/modal";

interface PrivateRouteLayoutProps {
  hasUser: boolean;
  isAccessiblePage: boolean;
  navigatePath: string;
}

const CommonPrivateRoute = ({
  hasUser,
  isAccessiblePage,
  navigatePath,
}: PrivateRouteLayoutProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleModalAllClose = useModalStore(
    (state) => state.handleModalAllClose,
  );

  useEffect(() => {
    handleModalAllClose();
    document.body.style.cssText = "overflow: auto";
  }, [location.pathname, searchParams]);

  if (!hasUser) return <Navigate to="/" />;
  if (!isAccessiblePage && navigatePath !== "")
    return <Navigate to={navigatePath} />;

  return <Outlet />;
};

export default CommonPrivateRoute;
