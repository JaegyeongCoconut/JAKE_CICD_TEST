import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import FileUploadInput from "./FileUploadInput";

const meta = {
  title: "KOKKOK/Input/FileUploadInput",
  component: FileUploadInput,
  parameters: {
    docs: {
      description: {
        component: "파일을 업로드할 수 있는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    acceptFileExtension: "image/*",
    fileInputRef: undefined,
    fileInputInfo:
      "File format: jpg, jpeg, png, bmp, webp, pdf (Limit 5MB per file)" as Languages,
    disabled: false,
    errorMessage: "",
    isFileAttached: false,
    placeholder: "Upload file",
    handleFileUpload: () => {},
    handleFileDelete: () => {},
  },
  argTypes: {
    className: {
      description:
        "`FileUploadInput` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    acceptFileExtension: {
      description:
        "`FileUploadInput`에 업로드 가능한 파일의 확장자를 지정합니다. 사용자가 선택할 수 있는 파일 형식을 제한합니다.",
    },
    errorMessage: {
      description:
        "`FileUploadInput` 파일 업로드 에러 메시지를 표시하며, 메시지 유무에 따라 에러 스타일이 적용됩니다.",
      type: { required: true, name: "string" },
      if: { arg: "disabled", neq: true },
    },
    fileInputRef: {
      description: "`FileUploadInput` input 요소에 대한 ref 객체를 설정합니다.",
      control: false,
    },
    fileInputInfo: {
      description:
        "`FileUploadInput`에서 파일 업로드 조건을 설명하는 문구입니다.",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "`FileUploadInput` 버튼 및 필드 클릭을 비활성화합니다.",
      defaultValue: { summary: "false" },
    },
    isFileAttached: {
      description:
        "`FileUploadInput`에 파일이 업로드 되었는지 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    placeholder: {
      description:
        "`FileUploadInput`에서 선택된 파일이 없을 때 표시되는 placeholder 입니다.",
    },
    handleFileUpload: {
      description:
        "`FileUploadInput`에서 파일을 업로드했을 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    handleFileDelete: {
      description:
        "`FileUploadInput`에서 파일을 삭제했을 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
} satisfies Meta<typeof FileUploadInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (
      event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const file = event.target.files?.[0];

      if (!file) return;

      setFile(file);
    };

    const handleFileDelete = (): void => setFile(null);

    return (
      <FileUploadInput
        {...args}
        isFileAttached={!!file}
        placeholder={file ? file.name : args.placeholder}
        handleFileDelete={handleFileDelete}
        handleFileUpload={handleFileUpload}
      />
    );
  },
};
