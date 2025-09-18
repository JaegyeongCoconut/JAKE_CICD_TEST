import React from "react";

import { Outlet } from "react-router-dom";

import ApiDebugTool from "@repo/components/debug";
import ErrorBoundary from "@repo/components/error/errorBoundary";
import useHasDebugError from "@repo/hooks/debug/useHasDebugError";

import { PATH } from "~constants";
import Router from "~router";

const Root = () => {
  const hasError = useHasDebugError();

  return (
    <Router>
      {hasError && <ApiDebugTool />}
      <ErrorBoundary path={PATH.RANKING}>
        <Outlet />
      </ErrorBoundary>
    </Router>
  );
};

export default Root;
