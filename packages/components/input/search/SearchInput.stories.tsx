import type { ChangeEvent } from "react";
import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import SearchInput from "./SearchInput";

const meta = {
  title: "KOKKOK/Input/SearchInput",
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component:
          "검색어를 입력하고 결과를 필터링할 수 있는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search customer" as Languages,
    disabled: false,
    value: "",
    maxLength: 100,
    handleInputChange: () => {},
    handleInputReset: () => {},
    handleSearch: () => {},
  },
  argTypes: {
    className: {
      description: "`SearchInput` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    placeholder: {
      description:
        "`SearchInput`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "`SearchInput` 필드 클릭 및 입력을 비활성화합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    value: {
      description: "`SearchInput`에서 입력한 값입니다.",
      control: false,
      type: { required: true, name: "string" },
      if: { arg: "disabled", neq: true },
    },
    maxLength: {
      description: "`SearchInput`의 최대 입력 가능 글자 수를 제한합니다.",
      type: { required: true, name: "number" },
      if: { arg: "disabled", neq: true },
    },
    handleInputChange: {
      description:
        "`SearchInput` 필드에 입력 값이 변경될 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    handleInputReset: {
      description:
        "`SearchInput` 입력 값을 초기화할 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    handleSearch: {
      description:
        "`SearchInput` 검색을 실행할 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
      setValue(e.target.value);
    const handleInputReset = (): void => setValue("");

    return args.disabled ? (
      <SearchInput disabled placeholder={args.placeholder} />
    ) : (
      <SearchInput
        {...args}
        disabled={false}
        value={value}
        maxLength={args.maxLength}
        handleInputChange={handleInputChange}
        handleInputReset={handleInputReset}
      />
    );
  },
};
