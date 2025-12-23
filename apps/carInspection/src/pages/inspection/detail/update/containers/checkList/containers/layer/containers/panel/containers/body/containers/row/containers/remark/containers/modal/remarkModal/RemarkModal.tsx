import React, { useState } from "react";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

import Textarea from "@repo/components/input/textarea";
import DetailModal from "@repo/components/modal/detail";
import { useModalStore } from "@repo/stores/modal";

import { LANGUAGE_LABEL } from "~constants";
import { useUpdateInspectionChecklist } from "~services";
import type { UpdateInspectionChecklistQueryModel } from "~types";

import * as S from "./RemarkModal.styled";
import type { CheckListFormSchema } from "../../../../../../../../../../../../schema/checkListForm.schema";

interface RemarkModalProps {
  name: keyof Omit<
    CheckListFormSchema,
    | "isCompleted"
    | "exteriorCount"
    | "interiorCount"
    | "undersideCount"
    | "engineCount"
  >;
  calculateIndex: number;
  listId: string;
  control: Control<CheckListFormSchema>;
}

const RemarkModal = React.forwardRef<HTMLDialogElement, RemarkModalProps>(
  ({ name, listId, control, calculateIndex }, ref) => {
    const { inspectionId } = useParams();

    const handleModalClose = useModalStore((state) => state.handleModalClose);

    const [remark, setRemark] = useState<string | null>(null);

    const { isLoading, mutate: updateInspectionChecklistMutate } =
      useUpdateInspectionChecklist();

    const handleSaveRemark = (): void => {
      if (!inspectionId) return;

      const req: UpdateInspectionChecklistQueryModel = {
        inspectionId,
        itemNo: listId,
        body: { remark: remark ?? null },
      };

      updateInspectionChecklistMutate(req, {
        onSuccess: () => handleModalClose(),
      });
    };

    return (
      <DetailModal
        css={S.detailModal}
        ref={ref}
        isPositiveDisabled={false}
        isPositiveLoading={isLoading}
        description={undefined}
        positiveButtonName={LANGUAGE_LABEL.SAVE}
        title={LANGUAGE_LABEL.REMARKS}
        handleClose={handleModalClose}
        handlePositiveButtonClick={handleSaveRemark}
      >
        <Controller
          name={`${name}.${calculateIndex}.remark`}
          control={control}
          render={({ field: { value, onBlur, onChange } }) => {
            const handleRemarkChange = (
              e: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => {
              const remark = e.target.value;

              setRemark(remark);
              onChange(remark);
            };

            return (
              <Textarea
                css={S.textarea}
                disabled={false}
                isEnterKeyBlock={false}
                value={value}
                maxLength={200}
                placeholder={LANGUAGE_LABEL.DESCRIBE}
                handleBlur={onBlur}
                handleChange={handleRemarkChange}
              />
            );
          }}
        />
      </DetailModal>
    );
  },
);

RemarkModal.displayName = "RemarkModal";
export default RemarkModal;
