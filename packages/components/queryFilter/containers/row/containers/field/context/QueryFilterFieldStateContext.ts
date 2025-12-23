import { createContext } from "react";

interface QueryFilterFieldStateContextProps {
  hasError: boolean;
  isFocused: boolean;
  handleBlur: () => void;
  handleErrorClear: () => void;
  handleFocus: () => void;
  onSetError: () => void;
}

export const defaultValue: QueryFilterFieldStateContextProps = {
  hasError: false,
  isFocused: false,
  handleBlur: () => {},
  handleErrorClear: () => {},
  handleFocus: () => {},
  onSetError: () => {},
};

export const QueryFilterFieldStateContext = createContext(defaultValue);
