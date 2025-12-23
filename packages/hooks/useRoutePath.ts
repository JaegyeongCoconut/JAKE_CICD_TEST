import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import pathStorage from "@repo/utils/pathStorage";

interface useRoutePathProps {
  nonSavedPath: string[];
}

const useRoutePath = ({ nonSavedPath }: useRoutePathProps) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const fullPath = pathname + search;
    if (!nonSavedPath.includes(pathname)) {
      pathStorage.setPath(fullPath);
    }
  }, [pathname, search]);
};

export default useRoutePath;
