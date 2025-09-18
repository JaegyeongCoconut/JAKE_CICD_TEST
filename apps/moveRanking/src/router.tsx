import React from "react";

import type { RouteObject } from "react-router-dom";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import PageNotFound from "@repo/components/error/pageNotFound";

import { PATH } from "~constants";

import * as P from "./pages";

interface RouterProps {
  children: React.ReactNode;
}

const Router = ({ children: inheritedChildren }: RouterProps) => {
  const routes: RouteObject[] = [
    {
      path: PATH.ROOT,
      element: inheritedChildren,
      children: [
        { index: true, element: <Navigate replace to={PATH.RANKING} /> },
        { path: PATH.RANKING, element: <P.Ranking /> },
        { path: "*", element: <PageNotFound path={PATH.RANKING} /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
