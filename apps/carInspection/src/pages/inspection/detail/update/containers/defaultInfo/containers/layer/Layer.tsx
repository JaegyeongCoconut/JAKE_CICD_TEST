import React from "react";

import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@repo/components/button";
import InternalLinkButton from "@repo/components/button/link/internal";

import { LANGUAGE_LABEL, PATH } from "~constants";
import {
  useGetInspectionDetail,
  useUpdateInspectionDefaultInfo,
} from "~services";
import type {
  FormInspectionDefaultInfo,
  UpdateInspectionDefaultInfoQueryModel,
} from "~types";

import * as S from "./Layer.styled";
import useDefaultInfoForm from "../hooks/useDefaultInfoForm";
import Form from "./containers/form/Form";

const Layer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inspectionId } = useParams();

  const [
    { data: inspectionData },
    { data: colorData },
    { data: fuelData },
    { data: transmissionData },
  ] = useGetInspectionDetail(inspectionId!);
  const { isLoading, mutate: updateInspectionDefaultInfoMutate } =
    useUpdateInspectionDefaultInfo();

  if (!inspectionData) return null;

  const { formMethod } = useDefaultInfoForm(inspectionData);

  const handleInspectionInfoUpdate = (
    data: FormInspectionDefaultInfo,
  ): void => {
    if (!inspectionId) return;

    const req: UpdateInspectionDefaultInfoQueryModel = {
      inspectionId,
      body: {
        code: data.code ? data.code.trim().replaceAll(" ", "") : null,
        usedCarStock: {
          year: +data.year,
          mileage: +data.mileage.replaceAll(",", ""),
          transmission: data.transmission,
          color: data.color,
          fuel: data.fuel,
        },
      },
    };

    updateInspectionDefaultInfoMutate(req, {
      onSuccess: () =>
        navigate(
          `/${PATH.INSPECTION}/${inspectionId}/${PATH.UPDATE}/${PATH.CHECK_LIST}`,
        ),
    });
  };

  return (
    <>
      <FormProvider {...formMethod}>
        <Form
          colorData={colorData}
          fuelData={fuelData}
          transmissionData={transmissionData}
        />
      </FormProvider>
      <S.HorizontalLine />
      <S.ButtonWrapper>
        <Button
          variant="primary"
          disabled={Object.keys(formMethod.formState.errors).length > 0}
          isLoading={isLoading}
          label={LANGUAGE_LABEL.START_INSPECTION}
          handleButtonClick={formMethod.handleSubmit(
            handleInspectionInfoUpdate,
          )}
        />
        <InternalLinkButton
          variant="secondary"
          hasBoth={false}
          label={t(LANGUAGE_LABEL.CANCEL)}
          to={`/${PATH.INSPECTION}`}
        />
      </S.ButtonWrapper>
    </>
  );
};

export default Layer;
