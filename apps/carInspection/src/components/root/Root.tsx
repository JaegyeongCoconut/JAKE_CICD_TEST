import React from "react";

import { Outlet } from "react-router-dom";

import ApiDebugTool from "@repo/components/debug";
import ErrorBoundary from "@repo/components/error/errorBoundary";
import Heading from "@repo/components/heading";
import ModalPortal from "@repo/components/modalPortal";
import NavigationBlockingModalPortal from "@repo/components/navigationBlockingModalPortal";
import ScrollToTop from "@repo/components/scroll";
import useHasDebugError from "@repo/hooks/useHasDebugError";
import useNavigateRoute from "@repo/hooks/useNavigateRoute";
import useRoutePath from "@repo/hooks/useRoutePath";

import { NON_SAVED_PATH, PATH } from "~constants";

const Root = () => {
  const hasError = useHasDebugError();
  useNavigateRoute();
  useRoutePath({ nonSavedPath: NON_SAVED_PATH });

  return (
    <>
      <>
        {hasError && <ApiDebugTool />}
        <ErrorBoundary path={PATH.ROOT}>
          <ModalPortal />
          <NavigationBlockingModalPortal />
          <ScrollToTop>
            <Heading hasA11y tags={{ h1: "KOKKOK Car Inspection" }} />
            <Outlet />
          </ScrollToTop>
        </ErrorBoundary>
      </>
    </>
  );
};

export default Root;
