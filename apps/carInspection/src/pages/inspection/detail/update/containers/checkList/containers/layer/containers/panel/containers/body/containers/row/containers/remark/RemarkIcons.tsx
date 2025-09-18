import React from "react";

import { useFormContext } from "react-hook-form";

import Button from "@repo/components/button";
import useModal from "@repo/hooks/modal/useModal";

import { PhotoIcon, RemarkIcon } from "~assets";
import type { ChecklistType, FormInspectionCheckItems } from "~types";

import * as S from "./RemarkIcons.styled";
import PhotoModal from "./containers/modal/photoModal/PhotoModal";
import RemarkModal from "./containers/modal/remarkModal/RemarkModal";

interface RemarkIconsProps {
  listId: string;
  type: ChecklistType;
}

const RemarkIcons = ({ listId, type }: RemarkIconsProps) => {
  const { control, watch, setValue, resetField } =
    useFormContext<FormInspectionCheckItems>();

  const { handleModalOpen } = useModal();

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
  const calculateIndex =
    +listId - 1 - accumulatedLength[type as keyof typeof accumulatedLength];

  return (
    <S.RemarkIconWrapper>
      <Button
        css={S.button(
          !!watch(`${type}Checklist.${calculateIndex}.photos`).length,
        )}
        variant="iconOnly"
        disabled={false}
        Icon={PhotoIcon}
        handleButtonClick={handleModalOpen(
          <PhotoModal
            name={`${type}Checklist`}
            calculateIndex={calculateIndex}
            listId={listId}
            resetField={resetField}
            setValue={setValue}
            watch={watch}
          />,
        )}
      />
      <Button
        css={S.button(!!watch(`${type}Checklist.${calculateIndex}.remark`))}
        variant="iconOnly"
        disabled={false}
        Icon={RemarkIcon}
        handleButtonClick={handleModalOpen(
          <RemarkModal
            name={`${type}Checklist`}
            calculateIndex={calculateIndex}
            listId={listId}
            control={control}
          />,
        )}
      />
    </S.RemarkIconWrapper>
  );
};

export default RemarkIcons;
