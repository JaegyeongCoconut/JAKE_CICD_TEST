import React from "react";

import { useFormContext } from "react-hook-form";

import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useNavigationBlocking from "@repo/hooks/useNavigationBlocking";
import type { FormVersion, Languages } from "@repo/types";

import * as S from "./VersionForm.styled";
import Button from "../../button/Button";
import DisabledInput from "../../input/disabled/DisabledInput";
import FormInput from "../../input/form/FormInput";
import LabelContentTable from "../../label/table/content/LabelContentTable";
import ErrorMessage from "../../message/ErrorMessage";

interface VersionFormProps {
  className?: string;
  isLoading: boolean;
  posButtonLabel: Languages;
  handleCancelClick: () => void;
  handleVersionSubmit: (data: FormVersion) => void;
}

const VersionForm = ({
  className,
  isLoading,
  posButtonLabel,
  handleCancelClick,
  handleVersionSubmit,
}: VersionFormProps) => {
  const {
    formState: { isDirty, errors },
    watch,
    register,
    handleSubmit,
  } = useFormContext<FormVersion>();

  useNavigationBlocking(isDirty && !isLoading);

  const os = watch("os");
  const platform = watch("platform");

  return (
    <>
      <LabelContentTable
        css={S.labelContent}
        className={className}
        variant="empty"
      >
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label={LANGUAGE_LABEL.OS}
            labelWidth={210}
          >
            <DisabledInput
              css={S.input}
              value={os ? VERSION_OS[os] : ""}
              placeholder={"" as Languages}
            />
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label={LANGUAGE_LABEL.PLATFORM_TYPE}
            labelWidth={210}
          >
            <DisabledInput
              css={S.input}
              value={platform ? VERSION_PLATFORM[platform] : ""}
              placeholder={"" as Languages}
            />
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label={LANGUAGE_LABEL.FIRST_VERSION}
            labelWidth={210}
          >
            <div>
              <FormInput
                css={S.input}
                disabled={false}
                hasError={!!errors.old?.message}
                maxLength={255}
                placeholder={LANGUAGE_LABEL.ENTER_THE_FIRST_VERSION_NUMBER}
                register={register("old")}
              />
              {errors.old?.message && (
                <ErrorMessage
                  css={S.errorMessage}
                  message={errors.old.message}
                />
              )}
            </div>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label={LANGUAGE_LABEL.LAST_VERSION}
            labelWidth={210}
          >
            <div>
              <FormInput
                css={S.input}
                disabled={false}
                hasError={!!errors.new?.message}
                maxLength={255}
                placeholder={LANGUAGE_LABEL.ENTER_THE_LAST_VERSION_NUMBER}
                register={register("new")}
              />
              {errors.new?.message && (
                <ErrorMessage
                  css={S.errorMessage}
                  message={errors.new.message}
                />
              )}
            </div>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label={LANGUAGE_LABEL.REVIEW_VERSION}
            labelWidth={210}
          >
            <div>
              <FormInput
                css={S.input}
                disabled={false}
                hasError={!!errors.test?.message}
                maxLength={255}
                placeholder={LANGUAGE_LABEL.ENTER_THE_REVIEW_VERSION_NUMBER}
                register={register("test")}
              />
              {errors.test?.message && (
                <ErrorMessage
                  css={S.errorMessage}
                  message={errors.test.message}
                />
              )}
            </div>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </LabelContentTable>
      <S.ButtonWrapper>
        <Button
          variant="primary"
          disabled={!!Object.keys(errors).length}
          isLoading={isLoading}
          label={posButtonLabel}
          type="submit"
          handleButtonClick={handleSubmit(handleVersionSubmit)}
        />
        <Button
          variant="secondary"
          disabled={false}
          isLoading={false}
          label={LANGUAGE_LABEL.CANCEL}
          handleButtonClick={handleCancelClick}
        />
      </S.ButtonWrapper>
    </>
  );
};

export default VersionForm;
