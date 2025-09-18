import { useState } from "react";

const useQueryFilterFieldState = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);
  const onSetError = (): void => setHasError(true);
  const handleErrorClear = (): void => setHasError(false);

  return {
    hasError,
    isFocused,
    handleErrorClear,
    handleBlur,
    handleFocus,
    onSetError,
  };
};

export default useQueryFilterFieldState;
