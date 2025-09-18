import React from "react";

import { useApiDebugStore } from "@repo/stores/apiDebug";

import * as S from "./ApiDebugToggleButton.styled";

const ApiDebugToggleButton = () => {
  const toggle = useApiDebugStore((state) => state.onToggle);

  return <S.ApiToggleButton onClick={toggle}>API Error</S.ApiToggleButton>;
};

export default ApiDebugToggleButton;
