import React, { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

import { useApiDebugStore } from "@repo/stores/apiDebug";

import ApiDebugToggleButton from "./containers/button/ApiDebugToggleButton";
import ApiDebugPanel from "./containers/panel/ApiDebugPanel";

const ApiDebugTool = () => {
  const { pathname } = useLocation();
  const previousePath = useRef(pathname);

  const isOpen = useApiDebugStore((state) => state.isOpen);
  const allClear = useApiDebugStore((state) => state.onAllClear);

  useEffect(() => {
    if (previousePath.current !== pathname) {
      allClear();
      previousePath.current = pathname;
    }
  }, [pathname]);

  return (
    <aside>
      <ApiDebugToggleButton />
      {isOpen && <ApiDebugPanel />}
    </aside>
  );
};

export default ApiDebugTool;
