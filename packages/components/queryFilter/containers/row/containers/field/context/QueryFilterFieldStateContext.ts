import { createContext } from "react";

interface QueryFilterFieldStateContextProps {
  hasError: boolean;
  isFocused: boolean;
  handleBlur: () => void;
  handleErrorClear: () => void;
  handleFocus: () => void;
  onSetError: () => void;
}

export const QueryFilterFieldStateContext = createContext(
  {} as QueryFilterFieldStateContextProps,
);
