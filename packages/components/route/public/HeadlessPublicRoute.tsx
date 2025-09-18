import React from "react";

import { Navigate, Outlet } from "react-router-dom";

interface HeadlessPublicRouteProps {
  className?: string;
  hasUser: boolean;
  navigatePath: string;
}

const HeadlessPublicRoute = ({
  className,
  hasUser,
  navigatePath,
}: HeadlessPublicRouteProps) => {
  return hasUser ? (
    <Navigate to={navigatePath} />
  ) : (
    <main className={className}>
      <Outlet />
    </main>
  );
};

export default HeadlessPublicRoute;
