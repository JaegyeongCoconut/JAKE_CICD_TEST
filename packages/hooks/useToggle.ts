import { useState } from "react";

const useToggle = (initIsValue = false) => {
  const [isValue, setIsValue] = useState(initIsValue);

  const handleValue = (): void => {
    setIsValue(!isValue);
  };

  return [isValue, handleValue] as const;
};

export default useToggle;
