import React, { useState } from "react";

import type {
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";

import UploadImages from "@repo/components/image";
import DetailModal from "@repo/components/modal/detail";
import useUploadImages from "@repo/hooks/useUploadImages";
import { useModalStore } from "@repo/stores/modal";
import { makeNewImageFileName } from "@repo/utils/formatter/name";
import { extractS3ImageKey } from "@repo/utils/image/common";

import { createS3PresignedUrlAPI } from "~apis";
import { TOAST_MESSAGE, LANGUAGE_LABEL } from "~constants";
import { useServiceTranslation } from "~hooks";
import { useUpdateInspectionChecklist } from "~services";
import type { UpdateInspectionChecklistQueryModel } from "~types";

import * as S from "./PhotoModal.styled";
import type { CheckListFormSchema } from "../../../../../../../../../../../../schema/checkListForm.schema";

const FILE_PREFIX = "inspection";

interface PhotoModalProps {
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
  resetField: UseFormResetField<CheckListFormSchema>;
  setValue: UseFormSetValue<CheckListFormSchema>;
  watch: UseFormWatch<CheckListFormSchema>;
}

const PhotoModal = React.forwardRef<HTMLDialogElement, PhotoModalProps>(
  ({ listId, name, calculateIndex, watch, setValue, resetField }, ref) => {
    const { inspectionId } = useParams();

    const handleModalClose = useModalStore((state) => state.handleModalClose);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleFormPhotoUpdate = (file: (string | File)[]) => {
      setValue(`${name}.${calculateIndex}.photos`, file);
    };
    const { isLoading, uploadImages, handleImagesAdd, handleImageRemove } =
      useUploadImages({
        images: watch(`${name}.${calculateIndex}.photos`),
        isNeedCompress: true,
        maxFileCount: 3,
        maxFileCountLabel: TOAST_MESSAGE.WARNING.PHOTO_UPLOAD_FAIL,
        compressedMaxFileSize: 0.5,
        handleFormPhotoUpdate,
      });
    const { mutate: updateInspectionChecklistMutate } =
      useUpdateInspectionChecklist();

    const { defaultLanguage } = useServiceTranslation();

    const handlePhotoUpload = async (): Promise<void> => {
      if (!inspectionId) return;

      setIsSubmitting(true);
      const photos = await uploadImages?.reduce<
        Promise<{ existPhotos: string[]; newPhotos: File[] }>
      >(
        async (accPromise, photo) => {
          const acc = await accPromise;

          if (photo instanceof File) {
            acc.newPhotos.push(photo);
          } else {
            acc.existPhotos.push(extractS3ImageKey(photo));
          }

          return acc;
        },
        Promise.resolve({ existPhotos: [], newPhotos: [] }),
      );

      const presignedPhotos = (
        await Promise.all(
          photos?.newPhotos.map(async (file) => {
            const vehiclePhotoUid = makeNewImageFileName(file);
            const fileUrl = `${FILE_PREFIX}/${vehiclePhotoUid}`;

            const s3ResInfos = await createS3PresignedUrlAPI(fileUrl, file);
            return s3ResInfos.status === 204 ? fileUrl : "";
          }) || [],
        )
      ).filter(Boolean);

      const req: UpdateInspectionChecklistQueryModel = {
        inspectionId,
        itemNo: listId,
        body: {
          photos: [...(photos?.existPhotos || []), ...presignedPhotos],
        },
      };

      updateInspectionChecklistMutate(req, {
        onSuccess: () => handleModalClose(),
        onSettled: () => setIsSubmitting(false),
      });
    };

    const handlePhotoModalClose = (): void => {
      if (isSubmitting) return;

      resetField(`${name}.${calculateIndex}.photos`);
      handleModalClose();
    };

    return (
      <DetailModal
        css={S.detailModal}
        ref={ref}
        isPositiveDisabled={isLoading || isSubmitting}
        isPositiveLoading={isLoading || isSubmitting}
        description={undefined}
        positiveButtonName={LANGUAGE_LABEL.SAVE}
        title={LANGUAGE_LABEL.UPLOAD_PHOTO}
        handleClose={handlePhotoModalClose}
        handlePositiveButtonClick={handlePhotoUpload}
      >
        {defaultLanguage({ text: LANGUAGE_LABEL.SUPPORT_FILE_PNG_JPEG_JPG })}
        <UploadImages
          css={S.uploadImages}
          hasError={false}
          hasImageInfo={false}
          isLoading={isLoading || isSubmitting}
          filePrefix={FILE_PREFIX}
          images={uploadImages}
          maxFileCount={3}
          uploadCompletedLabel={LANGUAGE_LABEL.YOU_CAN_UPLOAD_UP_TO_3_PHOTOS}
          handleImageChange={handleImagesAdd}
          handleImageRemove={handleImageRemove}
        />
      </DetailModal>
    );
  },
);

PhotoModal.displayName = "PhotoModal";
export default PhotoModal;
