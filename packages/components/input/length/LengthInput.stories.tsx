import type { ChangeEvent } from "react";
import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import LengthInput from "./LengthInput";

const meta = {
  title: "KOKKOK/Input/LengthInput",
  component: LengthInput,
  parameters: {
    docs: {
      description: {
        component:
          "사용자가 입력한 글자 수와 최대 입력 가능 글자 수를 보여주는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    hasError: false,
    maxLength: 100,
    placeholder: "Enter text" as Languages,
    value: "",
    handleBlur: () => {},
    handleChange: () => {},
  },
  argTypes: {
    className: {
      description: "`LengthInput` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    hasError: {
      description: "`LengthInput` 에러 스타일 적용 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
    maxLength: {
      description: "`LengthInput`의 최대 입력 가능 글자 수를 제한합니다.",
    },
    placeholder: {
      description:
        "`LengthInput`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    value: {
      description: "`LengthInput`에 입력한 값입니다.",
      control: false,
    },
    handleBlur: {
      description:
        "`LengthInput`에서 blur 이벤트가 발생했을 때 호출되는 handler 함수입니다.",
      control: false,
    },
    handleChange: {
      description:
        "`LengthInput` 필드에 입력 값이 변경될 때 호출되는 handler 함수입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof LengthInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
      setValue(e.target.value);

    return <LengthInput {...args} value={value} handleChange={handleChange} />;
  },
};
