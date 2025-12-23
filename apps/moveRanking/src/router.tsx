import React from "react";

import type { RouteObject } from "react-router-dom";
import { Navigate, createBrowserRouter } from "react-router-dom";

import PageNotFound from "@repo/components/error/pageNotFound";

import { Root } from "~components";
import { PATH } from "~constants";

import * as P from "./pages";

const routes: RouteObject[] = [
  {
    path: PATH.ROOT,
    element: <Root />,
    children: [
      { index: true, element: <Navigate replace to={PATH.RANKING} /> },
      { path: PATH.RANKING, element: <P.Ranking /> },
      { path: "*", element: <PageNotFound path={PATH.RANKING} /> },
    ],
  },
];

export default createBrowserRouter(routes);
