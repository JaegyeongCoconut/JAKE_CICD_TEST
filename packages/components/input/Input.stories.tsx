import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import Input from "./Input";

const meta = {
  title: "KOKKOK/Input",
  component: Input,
  parameters: {
    docs: {
      description: { component: "기본 입력 필드 UI 컴포넌트입니다." },
    },
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    hasError: false,
    maxLength: 100,
    value: "",
    placeholder: "Enter the text" as Languages,
    handleBlur: () => {},
    handleChange: () => {},
  },
  argTypes: {
    className: {
      description: "`Input` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    disabled: {
      description: "`Input` 필드 클릭 및 입력을 비활성화합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    hasError: {
      description: "`Input` 에러 스타일 적용 여부를 나타냅니다.",
      table: { defaultValue: { summary: "false" } },
    },
    maxLength: {
      description: "`Input`의 최대 입력 가능 글자 수를 제한합니다.",
    },
    placeholder: {
      description: "`Input`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    value: {
      description: "`Input`에서 입력한 값입니다.",
      control: false,
    },
    handleBlur: {
      description:
        "`Input`에서 blur 이벤트가 발생했을 때 호출되는 handler 함수입니다.",
      control: false,
    },
    handleChange: {
      description:
        "`Input` 필드에 입력 값이 변경될 때 호출되는 handler 함수입니다.",
      control: false,
    },
    handleFocus: {
      description:
        "`Input`에서 focus 이벤트가 발생했을 때 호출되는 handler 함수입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
