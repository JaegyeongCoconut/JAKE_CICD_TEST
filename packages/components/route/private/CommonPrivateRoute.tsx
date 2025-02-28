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
  initializing: boolean;
  isAccessiblePage: boolean;
  navigatePath: string;
}

const CommonPrivateRoute = ({
  hasUser,
  initializing,
  isAccessiblePage,
  navigatePath,
}: PrivateRouteLayoutProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const clearModals = useModalStore((state) => state.clearModals);

  useEffect(() => {
    clearModals();
    document.body.style.cssText = "overflow: auto";
  }, [location.pathname, searchParams]);

  if (initializing) return null;
  if (!hasUser) return <Navigate to="/" />;
  if (!isAccessiblePage && navigatePath !== "")
    return <Navigate to={navigatePath} />;

  return <Outlet />;
};

export default CommonPrivateRoute;
