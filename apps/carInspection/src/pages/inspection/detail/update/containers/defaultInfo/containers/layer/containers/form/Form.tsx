import type { ChangeEvent } from "react";
import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Dropdown from "@repo/components/dropdown";
import DisabledInput from "@repo/components/input/disabled";
import FormInput from "@repo/components/input/form";
import UnitInput from "@repo/components/input/unit";
import LabelContentTable from "@repo/components/label/table";
import ErrorMessage from "@repo/components/message";
import { formatICTDateTime } from "@repo/utils/date";
import { comma } from "@repo/utils/formatter/currency";
import { numericOnly } from "@repo/utils/formatter/number";
import { mappingToKeyLabelSelects } from "@repo/utils/mapping";

import { LANGUAGE_LABEL } from "~constants";
import type {
  CarInspectionLanguages,
  FormInspectionDefaultInfo,
  GetColorsClientModel,
  GetFuelTypesClientModel,
  GetTransmissionsClientModel,
} from "~types";

import * as S from "./Form.styled";

interface FormProps {
  colorData: GetColorsClientModel | undefined;
  fuelData: GetFuelTypesClientModel | undefined;
  transmissionData: GetTransmissionsClientModel | undefined;
}

const Form = ({ colorData, fuelData, transmissionData }: FormProps) => {
  const { t, i18n } = useTranslation();

  const {
    control,
    formState: { errors },
    setValue,
    register,
    watch,
  } = useFormContext<FormInspectionDefaultInfo>();

  // NOTE: 타입이 제대로 잡히지 않아 중간 변수 활용
  const formInspectedDate = watch("inspectedDate");

  const defaultDropdownItem = {
    key: "",
    label: "" as CarInspectionLanguages,
  };
  const fuelTypes = mappingToKeyLabelSelects<CarInspectionLanguages>(
    fuelData?.fuelTypes,
  );
  const transmissions = mappingToKeyLabelSelects<CarInspectionLanguages>(
    transmissionData?.transmissions,
  );
  const colors = mappingToKeyLabelSelects<CarInspectionLanguages>(
    colorData?.colors?.map((color) => ({
      code: color?.code,
      name: i18n.language === "lo" ? color?.lo : color?.en,
    })),
  );

  return (
    <LabelContentTable variant="empty">
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTION_CODE}
          labelWidth={210}
        >
          <FormInput
            disabled={false}
            hasError={false}
            maxLength={100}
            placeholder={LANGUAGE_LABEL.ENTER_THE_INSPECTION_CODE}
            register={register("code")}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTED_BY}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("inspectedBy") ?? "-"}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTED_DATE}
          labelWidth={210}
        >
          <DisabledInput
            value={
              formInspectedDate
                ? formatICTDateTime({ date: formInspectedDate })
                : t(LANGUAGE_LABEL.INSPECTION_REQUIRED)!
            }
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.FRAME_NUMBER}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("frameNo")}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.ENGINE_NUMBER}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("engineNo")}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.BRAND}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("maker")}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.MODEL}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("model")}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.CAR_TYPE}
          labelWidth={210}
        >
          <DisabledInput
            value={watch("carType")}
            placeholder={"" as CarInspectionLanguages}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.COLOR}
          labelWidth={210}
        >
          <S.ControllerWrapper>
            <Controller
              name="color"
              control={control}
              render={({ field: { value: colorCode, onChange } }) => {
                const selectedOption =
                  colors?.find(({ key }) => key === colorCode) ??
                  defaultDropdownItem;

                const handleSelect = (key: string): void => onChange(key);

                return (
                  <Dropdown
                    css={S.dropdown}
                    hasError={!!errors.color}
                    options={colors ?? []}
                    placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                  />
                );
              }}
            />
            {errors.color?.message && (
              <ErrorMessage
                css={S.errorMessage}
                message={errors.color.message}
              />
            )}
          </S.ControllerWrapper>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content label={LANGUAGE_LABEL.YEAR} labelWidth={210}>
          <S.Wrapper>
            <FormInput
              css={S.input}
              disabled={false}
              hasError={!!errors.year}
              maxLength={4}
              placeholder={LANGUAGE_LABEL.ENTER_THE_YEAR}
              register={register("year", {
                onChange: (e: ChangeEvent<HTMLInputElement>): void =>
                  setValue("year", numericOnly(e.target.value)),
              })}
            />
            {errors.year?.message && (
              <ErrorMessage message={errors.year.message} />
            )}
          </S.Wrapper>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.MILEAGE}
          labelWidth={210}
        >
          <S.Wrapper>
            <UnitInput
              disabled={false}
              hasError={!!errors.mileage}
              maxLength={9} // NOTE: 임시 값, interger 범위보다 작게 하기 위해 9로 설정
              placeholder={LANGUAGE_LABEL.ENTER_THE_MILEAGE}
              unit="km"
              register={register("mileage", {
                onChange: (e: ChangeEvent<HTMLInputElement>): void =>
                  setValue("mileage", comma(numericOnly(e.target.value))),
              })}
            />
            {errors.mileage?.message && (
              <ErrorMessage message={errors.mileage.message} />
            )}
          </S.Wrapper>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.FUEL_TYPE}
          labelWidth={210}
        >
          <S.ControllerWrapper>
            <Controller
              name="fuel"
              control={control}
              render={({ field: { value: fuelTypeCode, onChange } }) => {
                const selectedOption =
                  fuelTypes?.find(({ key }) => key === fuelTypeCode) ??
                  defaultDropdownItem;

                const handleSelect = (key: string): void => onChange(key);

                return (
                  <Dropdown
                    css={S.dropdown}
                    hasError={!!errors.fuel}
                    options={fuelTypes ?? []}
                    placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                  />
                );
              }}
            />
            {errors.fuel?.message && (
              <ErrorMessage
                css={S.errorMessage}
                message={errors.fuel.message}
              />
            )}
          </S.ControllerWrapper>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.TRANSMISSON}
          labelWidth={210}
        >
          <S.ControllerWrapper>
            <Controller
              name="transmission"
              control={control}
              render={({ field: { value: transmissionCode, onChange } }) => {
                const selectedOption =
                  transmissions?.find(({ key }) => key === transmissionCode) ??
                  defaultDropdownItem;

                const handleSelect = (key: string): void => onChange(key);

                return (
                  <Dropdown
                    css={S.dropdown}
                    hasError={!!errors.transmission}
                    options={transmissions ?? []}
                    placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
                    selectedOption={selectedOption}
                    handleSelect={handleSelect}
                  />
                );
              }}
            />
            {errors.transmission?.message && (
              <ErrorMessage
                css={S.errorMessage}
                message={errors.transmission.message}
              />
            )}
          </S.ControllerWrapper>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    </LabelContentTable>
  );
};

export default Form;
