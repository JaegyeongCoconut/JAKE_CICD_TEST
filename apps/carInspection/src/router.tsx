import React from "react";

import { createBrowserRouter, type RouteObject } from "react-router-dom";

import PageNotFound from "@repo/components/error/pageNotFound";
import PublicLayout from "@repo/components/layout/publicLayout";

import { PrivateLayout, PrivateRoute, PublicRoute, Root } from "~components";
import { PATH } from "~constants";
import * as P from "~pages";

const publicRoutes: RouteObject[] = [{ path: PATH.ROOT, element: <P.Login /> }];

const privateRoutes: RouteObject[] = [
  {
    path: PATH.INSPECTION,
    children: [
      { index: true, element: <P.Inspection /> },
      {
        path: `:inspectionId/${PATH.UPDATE}`,
        children: [
          {
            path: PATH.DEFAULT_INFO,
            element: <P.InspectionDetailUpdateDefaultInfo />,
          },
          {
            path: PATH.CHECK_LIST,
            element: <P.InspectionDetailUpdateCheckList />,
          },
        ],
      },
    ],
  },
  { path: PATH.COMPLETED, element: <P.Completed /> },
];

const routes: RouteObject[] = [
  {
    element: <Root />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: <PublicLayout paddingTop="76px" />,
            children: publicRoutes,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: "*", element: <PageNotFound path={PATH.ROOT} /> },
          { element: <PrivateLayout />, children: privateRoutes },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);
