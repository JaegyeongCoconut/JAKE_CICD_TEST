import React from "react";

import { Outlet } from "react-router-dom";

import ApiDebugTool from "@repo/components/debug";
import ErrorBoundary from "@repo/components/error/errorBoundary";
import useHasDebugError from "@repo/hooks/useHasDebugError";

import { PATH } from "~constants";

const Root = () => {
  const hasError = useHasDebugError();

  return (
    <>
      {hasError && <ApiDebugTool />}
      <ErrorBoundary path={PATH.RANKING}>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default Root;
