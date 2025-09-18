import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import FormInput from "./FormInput";

const meta = {
  title: "KOKKOK/Input/FormInput",
  component: FormInput,
  parameters: {
    docs: {
      description: {
        component: "폼 입력 시 사용되는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    hasError: false,
    maxLength: 100,
    placeholder: "Enter the price" as Languages,
    register: {
      onChange: async () => {},
      onBlur: async () => {},
      name: "",
      ref: () => {},
    },
  },
  argTypes: {
    className: {
      description:
        "`FormInput` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    placeholder: {
      description:
        "`FormInput`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    maxLength: {
      description: "`FormInput`의 최대 입력 가능 글자 수를 제한합니다.",
    },
    hasError: {
      description: "`FormInput` 에러 스타일 적용 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "`FormInput` 필드 클릭 및 입력을 비활성화합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    register: {
      description:
        "`react-hook-form` 사용 시 입력값을 관리하는데 필요한 설정입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
