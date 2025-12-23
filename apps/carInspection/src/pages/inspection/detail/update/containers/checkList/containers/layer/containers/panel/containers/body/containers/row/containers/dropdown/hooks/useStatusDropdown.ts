import { useState } from "react";

import { lowerCase } from "lodash-es";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import type { STATUS_ICONS } from "~assets";
import { INSPECTION_STATUS_OBJECT_ARRAY } from "~assets";
import { LANGUAGE_LABEL } from "~constants";
import { useUpdateInspectionChecklist } from "~services";
import type {
  CarInspectionLanguages,
  ChecklistType,
  UpdateInspectionChecklistQueryModel,
} from "~types";

import type { CheckListFormSchema } from "../../../../../../../../../../schema/checkListForm.schema";

interface useStatusDropdownProps {
  listId: string;
  type: ChecklistType;
}

const useStatusDropdown = ({ type, listId }: useStatusDropdownProps) => {
  const { inspectionId } = useParams();

  const { watch, setValue, resetField } = useFormContext<CheckListFormSchema>();

  const { mutate: updateInspectionChecklistMutate } =
    useUpdateInspectionChecklist();

  const selectedResultKey =
    watch(`${type}Checklist`).find(({ no }) => `${no}` === listId)?.status ||
    null;

  const initialSelectedOption: { key: string; label: CarInspectionLanguages } =
    selectedResultKey
      ? {
          key: selectedResultKey,
          label: INSPECTION_STATUS_OBJECT_ARRAY.find(
            ({ key }) =>
              key ===
              (lowerCase(selectedResultKey) as keyof typeof STATUS_ICONS),
          )?.label!,
        }
      : { key: "", label: LANGUAGE_LABEL.SELECT_THE_OPTION };

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleSelect = (key: string): void => {
    const filteredLabel =
      INSPECTION_STATUS_OBJECT_ARRAY.find((item) => item.key === key)?.label ??
      INSPECTION_STATUS_OBJECT_ARRAY[0].label;
    const accumulatedLength = {
      exterior: 0,
      interior: watch("exteriorChecklist").length,
      underside:
        watch("exteriorChecklist").length + watch("interiorChecklist").length,
      engine:
        watch("exteriorChecklist").length +
        watch("interiorChecklist").length +
        watch("undersideChecklist").length,
    };
    const calculateIndex = +listId - 1 - accumulatedLength[type];
    const req: UpdateInspectionChecklistQueryModel = {
      inspectionId: inspectionId!,
      itemNo: listId,
      body: { status: filteredLabel },
    };

    setSelectedOption({ key, label: filteredLabel });
    updateInspectionChecklistMutate(req);

    setValue(`${type}Checklist.${calculateIndex}.status`, filteredLabel);
    resetField("isCompleted");
  };

  return { selectedOption, handleSelect };
};

export default useStatusDropdown;
