import { useState } from "react";

const useFilterBorderLine = () => {
  const [isConditionFocus, setIsConditionFocus] = useState(false);
  const [isConditionError, setIsConditionError] = useState(false);

  const handleConditionFocus = (): void => setIsConditionFocus(true);
  const handleConditionBlur = (): void => setIsConditionFocus(false);
  const handleConditionErrorCreate = (): void => setIsConditionError(true);
  const handleConditionErrorDelete = (): void => setIsConditionError(false);

  return {
    isConditionFocus,
    isConditionError,
    handleConditionFocus,
    handleConditionBlur,
    handleConditionErrorCreate,
    handleConditionErrorDelete,
  };
};

export default useFilterBorderLine;
