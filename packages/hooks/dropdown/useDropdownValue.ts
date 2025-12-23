import { useState, useLayoutEffect, useCallback } from "react";

import type { DropdownOptionType, Languages } from "@repo/types";

interface UseDropdownValueProps {
  initKey: string | undefined;
  options: readonly DropdownOptionType<Languages>[];
}

const useDropdownValue = ({ options, initKey }: UseDropdownValueProps) => {
  const [selectedOption, setSelectedOption] = useState<
    DropdownOptionType<Languages>
  >({ key: "", label: "" as Languages }); // NOTE: ""은 string이라 부득이하게 as Languages 단언

  const handleSelect = useCallback(
    (key: string): void => {
      const selectIndex = options.findIndex((item) => item.key === key);

      if (selectIndex < 0)
        return setSelectedOption({ key: "", label: "" as Languages });

      setSelectedOption(options[selectIndex]);
    },
    [options],
  );

  useLayoutEffect(() => {
    initKey && handleSelect(initKey);
  }, []);

  return { selectedOption, handleSelect };
};

export default useDropdownValue;
