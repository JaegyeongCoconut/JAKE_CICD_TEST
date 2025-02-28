import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";

const useFilterRadio = (
  queryKey: string,
  handleLocalValueChange: (queryKey: string, value: string | string[]) => void,
  handleSetFilterLabel: (
    queryKey: string,
    searchResult: string | string[],
  ) => void,
) => {
  const [searchParams] = useSearchParams();

  const handleRadioClick = (queryKey: string, key: string) => (): void => {
    handleSetFilterLabel(queryKey, key);
    handleLocalValueChange(queryKey, key);
  };

  useEffect(() => {
    handleLocalValueChange(queryKey, searchParams.get(queryKey) ?? "");
  }, []);

  return { handleRadioClick };
};

export default useFilterRadio;
