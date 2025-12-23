import React from "react";

import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@repo/components/button";
import { useToastStore } from "@repo/stores/toast";

import { TOAST_MESSAGE, LANGUAGE_LABEL, PATH } from "~constants";
import { useUpdateInspectionCompleted } from "~services";

import * as S from "./EnginePanel.styled";
import type { CheckListFormSchema } from "../../../../schema/checkListForm.schema";
import Body from "../containers/body/Body";
import Header from "../containers/header/Header";

const EnginePanel = () => {
  const navigate = useNavigate();
  const { inspectionId } = useParams();
  const { watch, setValue, resetField, handleSubmit } =
    useFormContext<CheckListFormSchema>();

  const addToast = useToastStore((state) => state.addToast);

  const { isLoading, mutate: updateInspectionCompletedMutate } =
    useUpdateInspectionCompleted();

  const checklistCompleted = (data: CheckListFormSchema): boolean =>
    data.exteriorChecklist.every(({ status }) => !!status) &&
    data.interiorChecklist.every(({ status }) => !!status) &&
    data.undersideChecklist.every(({ status }) => !!status) &&
    data.engineChecklist.every(({ status }) => !!status);

  const handleCompletedButtonClick = (data: CheckListFormSchema): void => {
    if (!inspectionId) return;

    if (!checklistCompleted(data)) {
      addToast(TOAST_MESSAGE.WARNING.INSPECTION_COMPLETED);
      setValue("isCompleted", false);

      return;
    }

    updateInspectionCompletedMutate(inspectionId, {
      onSuccess: () => {
        resetField("isCompleted");
        navigate(`/${PATH.COMPLETED}`);
      },
    });
  };

  return (
    <>
      <S.Wrapper>
        <Header />
        <Body type="engine" />
      </S.Wrapper>
      <Button
        css={S.button}
        variant="primary"
        disabled={!watch("isCompleted")}
        isLoading={isLoading}
        label={LANGUAGE_LABEL.COMPLETE_INSPECTION}
        handleButtonClick={handleSubmit(handleCompletedButtonClick)}
      />
    </>
  );
};

export default EnginePanel;
