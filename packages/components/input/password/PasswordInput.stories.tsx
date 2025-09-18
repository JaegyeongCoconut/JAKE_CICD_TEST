import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import PasswordInput from "./PasswordInput";

const meta = {
  title: "KOKKOK/Input/PasswordInput",
  component: PasswordInput,
  parameters: {
    docs: {
      description: {
        component: "비밀번호 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    hasError: false,
    autoComplete: "off",
    placeholder: "Enter password" as Languages,
    register: {
      onChange: async () => {},
      onBlur: async () => {},
      name: "",
      ref: () => {},
    },
  },
  argTypes: {
    hasError: {
      description: "`PasswordInput` 에러 스타일 적용 여부를 나타냅니다.",
      defaultValue: { summary: "false" },
    },
    autoComplete: {
      description:
        "기본 input의 자동 완성 유형을 설정하며, `PasswordInput`에서 적용할 자동 완성 방식을 결정합니다.",
    },
    placeholder: {
      description:
        "`PasswordInput`에 입력 값이 없을 때 표시되는 placeholder입니다.",
      table: { type: { summary: "string" } },
    },
    register: {
      description:
        "`react-hook-form` 사용 시 입력값을 관리하는 데 필요한 설정입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
