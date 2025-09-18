import { useState } from "react";

const useDispatchSelect = <T extends { id: string | undefined } | undefined>(
  initData: T | null,
) => {
  const [selectedData, setSelectedData] = useState<T | null>(initData ?? null);

  const handleDataSelect = (list: T[], selectId: string): void => {
    const findData = list.find((item) => item?.id === selectId);
    setSelectedData(findData || null);
  };

  const resetSelection = (): void => {
    setSelectedData(null);
  };

  return { selectedData, handleDataSelect, resetSelection };
};

export default useDispatchSelect;
