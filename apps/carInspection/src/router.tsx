import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import PageNotFound from "@repo/components/error/pageNotFound";

import { PrivateLayout, PrivateRoute, PublicRoute } from "~components";
import { PATH } from "~constants";
import * as P from "~pages";

interface RouterProps {
  children: React.ReactNode;
}

const Router = ({ children: inheritedChildren }: RouterProps) => {
  const publicRoutes: RouteObject[] = [
    { path: PATH.ROOT, element: <P.Login /> },
  ];
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
      element: inheritedChildren,
      children: [
        { element: <PublicRoute />, children: publicRoutes },
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

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
