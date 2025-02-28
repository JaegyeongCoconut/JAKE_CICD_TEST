import React from "react";

import { useFormContext } from "react-hook-form";

import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static";
import usePrompt from "@repo/hooks/usePrompt";
import type { FormVersion } from "@repo/types";

import * as S from "./VersionForm.styled";
import Button from "../../button/Button";
import Input from "../../input/Input";
import LabelContentTable from "../../label/table/content/LabelContentTable";
import ErrorMessage from "../../message/ErrorMessage";

interface VersionFormProps {
  isLoading: boolean;
  handleCancelClick: () => void;
  handleVersionSubmit: (data: FormVersion) => void;
}

const VersionForm = ({
  isLoading,
  handleCancelClick,
  handleVersionSubmit,
}: VersionFormProps) => {
  const {
    formState: { isDirty, errors },
    watch,
    register,
    handleSubmit,
  } = useFormContext<FormVersion>();

  usePrompt(isDirty && !isLoading);

  return (
    <>
      <LabelContentTable css={S.labelContent} variant="empty">
        <LabelContentTable.Row>
          <LabelContentTable.Content isRequired label="OS" labelWidth={210}>
            <Input css={S.input} disabled value={VERSION_OS[watch("os")]} />
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            isRequired
            label="Platform type"
            labelWidth={210}
          >
            <Input
              css={S.input}
              disabled
              value={VERSION_PLATFORM[watch("platform")]}
            />
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            label="First version"
            isRequired
            labelWidth={210}
          >
            <div>
              <Input
                css={S.input}
                hasError={!!errors.old?.message}
                value={watch("old")}
                placeholder="Enter the first version number"
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
            label="Last version"
            isRequired
            labelWidth={210}
          >
            <div>
              <Input
                css={S.input}
                hasError={!!errors.new?.message}
                value={watch("new")}
                placeholder="Enter the last version number"
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
            label="Review version"
            isRequired
            labelWidth={210}
          >
            <div>
              <Input
                css={S.input}
                hasError={!!errors.test?.message}
                value={watch("test")}
                placeholder="Enter the review version number"
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
          type="submit"
          isLoading={isLoading}
          disabled={!!Object.keys(errors).length}
          label="Update"
          variant="primary"
          handleButtonClick={handleSubmit(handleVersionSubmit)}
        />
        <Button
          label="Cancel"
          variant="secondary"
          isLoading={false}
          disabled={false}
          handleButtonClick={handleCancelClick}
        />
      </S.ButtonWrapper>
    </>
  );
};

export default VersionForm;
