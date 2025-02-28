import React from "react";

import { Outlet } from "react-router-dom";

import ErrorBoundary from "@repo/components/error/errorBoundary";

import { PATH } from "~constants";
import Router from "~router";

const Root = () => {
  return (
    <Router>
      <ErrorBoundary path={PATH.RANKING}>
        <Outlet />
      </ErrorBoundary>
    </Router>
  );
};

export default Root;
