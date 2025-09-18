import React from "react";

import { Outlet } from "react-router-dom";

import ApiDebugTool from "@repo/components/debug";
import ErrorBoundary from "@repo/components/error/errorBoundary";
import Heading from "@repo/components/heading";
import ModalPortal from "@repo/components/modalPortal";
import NavigationBlockingModalPortal from "@repo/components/navigationBlockingModalPortal";
import ScrollToTop from "@repo/components/scroll";
import Toast from "@repo/components/toast";
import { GoogleMapProvider } from "@repo/contexts/GoogleMapProvider";
import { RoutePathProvider } from "@repo/contexts/RoutePathProvider";
import useHasDebugError from "@repo/hooks/debug/useHasDebugError";

import { NON_SAVED_PATH, PATH } from "~constants";
import { AuthProvider } from "~contexts";
import Router from "~router";

const Root = () => {
  const hasError = useHasDebugError();

  return (
    <AuthProvider>
      <GoogleMapProvider>
        <Router>
          {hasError && <ApiDebugTool />}
          <ErrorBoundary path={PATH.ROOT}>
            <Toast />
            <ModalPortal />
            <NavigationBlockingModalPortal />
            <RoutePathProvider nonSavedPath={NON_SAVED_PATH}>
              <ScrollToTop>
                <Heading hasA11y tags={{ h1: "KOKKOK Car Inspection" }} />
                <Outlet />
              </ScrollToTop>
            </RoutePathProvider>
          </ErrorBoundary>
        </Router>
      </GoogleMapProvider>
    </AuthProvider>
  );
};

export default Root;
