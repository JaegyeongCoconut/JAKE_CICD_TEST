import { useEffect, useState, useMemo } from "react";

import { useSearchParams } from "react-router-dom";

interface UseCheckTableWithConditionProps<
  T extends { id: string; isSelected: boolean },
> {
  tableDatas: T[];
}

const useCheckTableWithCondition = <
  T extends { id: string; isSelected: boolean },
>({
  tableDatas,
}: UseCheckTableWithConditionProps<T>) => {
  const [searchParams] = useSearchParams();

  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const isChecked = (id: string | undefined): boolean => {
    if (!id) return false;

    return checkedIds.includes(id);
  };

  const checkableIds = useMemo(() => {
    return tableDatas.map((tableData) => tableData.id);
  }, [tableDatas]);

  const isCheckable = (id: string): boolean => checkableIds.includes(id);

  const isAllChecked = (): boolean => {
    if (!checkableIds.length) return false;

    return checkableIds.length === checkedIds.length;
  };

  const handleCheck = (id: string | undefined) => (): void => {
    if (!id) return;

    return checkedIds.includes(id)
      ? setCheckedIds(checkedIds.filter((checkId) => checkId !== id))
      : setCheckedIds([...checkedIds, id]);
  };
  const handleAllCheck = (): void =>
    isAllChecked() ? setCheckedIds([]) : setCheckedIds(checkableIds);

  const handleAllUnCheck = (): void => setCheckedIds([]);

  useEffect(() => {
    setCheckedIds([]);
  }, [searchParams.get("page")]);

  useEffect(() => {
    setCheckedIds(
      tableDatas
        .filter((tableData) => tableData.isSelected)
        .map((tableData) => tableData.id),
    );
  }, []);

  return {
    isCheckable,
    isChecked,
    isAllChecked,
    checkedIds,
    handleCheck,
    handleAllCheck,
    handleAllUnCheck,
  };
};

export default useCheckTableWithCondition;
