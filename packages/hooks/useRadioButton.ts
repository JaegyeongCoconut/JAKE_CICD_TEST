import { useState } from "react";

const useRadioButton = <T>(initState: T) => {
  const [radioState, setRadioState] = useState(initState);

  const handleRadioButtonClick = (key: T) => (): void => {
    setRadioState(key);
  };

  return { radioState, handleRadioButtonClick };
};

export default useRadioButton;
