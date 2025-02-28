import React from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import PageNotFound from "@repo/components/error/pageNotFound";

import { PATH } from "~constants";

import * as P from "./pages";

interface RouterProps {
  children: React.ReactNode;
}

const Router = ({ children }: RouterProps) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={children}>
        <Route path={PATH.RANKING} element={<P.Ranking />} />
        <Route path="*" element={<PageNotFound path={PATH.RANKING} />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
