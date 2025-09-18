import type { JSX } from "react";
import React, { useEffect, createContext, useContext } from "react";

import { useLocation } from "react-router-dom";

import { PathStorage } from "@repo/utils/pathStorage";

const redirectPathStorage = new PathStorage("sign_in_redirect");

export const RoutePathContext = createContext<
  | {
      redirectPathStorage: PathStorage;
    }
  | undefined
>(undefined);

RoutePathContext.displayName = "RoutePathContext";

export function useRoutePath() {
  const path = useContext(RoutePathContext);

  if (!path) {
    throw new Error("usePath must be used within RoutePathProvider");
  }

  return path;
}

export function RoutePathProvider({
  children,
  nonSavedPath,
}: {
  nonSavedPath: string[];
  children: JSX.Element;
}) {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const fullPath = pathname + search;
    if (!nonSavedPath.includes(pathname)) {
      redirectPathStorage.setPath(fullPath);
    }
  }, [pathname, search]);

  const value = { redirectPathStorage };

  return (
    <RoutePathContext.Provider value={value}>
      {children}
    </RoutePathContext.Provider>
  );
}
