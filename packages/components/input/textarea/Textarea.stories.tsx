import type { ChangeEvent } from "react";
import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import Textarea from "./Textarea";

const meta = {
  title: "KOKKOK/Input/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          "여러 줄의 텍스트를 입력할 수 있는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    isEnterKeyBlock: false,
    disabled: false,
    maxLength: 100,
    placeholder: "Enter description" as Languages,
    value: "",
    handleBlur: () => {},
    handleChange: () => {},
  },
  argTypes: {
    className: {
      description: "`Textarea` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    isEnterKeyBlock: {
      description: "`Textarea`에서 `Enter` 키 입력을 비활성화합니다.",
      type: { required: true, name: "boolean" },
      defaultValue: { summary: "false" },
      if: { arg: "disabled", neq: true },
    },
    maxLength: {
      description: "`Textarea`의 최대 입력 가능 글자 수를 제한합니다.",
    },
    placeholder: {
      description:
        "`Textarea`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "`Textarea` 필드 클릭 및 입력을 비활성화합니다.",
      defaultValue: { summary: "false" },
    },
    value: { description: "`Textarea`에서 입력한 값입니다.", control: false },
    handleBlur: {
      description:
        "`Textarea`에서 blur 이벤트가 발생했을 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    handleChange: {
      description:
        "`Textarea` 필드에 입력 값이 변경될 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void =>
      setValue(e.target.value);

    return args.disabled ? (
      <Textarea
        disabled
        value={args.value}
        maxLength={args.maxLength}
        placeholder={args.placeholder}
      />
    ) : (
      <Textarea {...args} value={value} handleChange={handleChange} />
    );
  },
};
