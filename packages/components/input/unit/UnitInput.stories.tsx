import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import UnitInput from "./UnitInput";

const meta = {
  title: "KOKKOK/Input/UnitInput",
  component: UnitInput,
  parameters: {
    docs: {
      description: {
        component: "단위를 함께 표시할 수 있는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Enter the price" as Languages,
    maxLength: 100,
    hasError: false,
    disabled: false,
    unit: "₭",
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
        "`UnitInput` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    placeholder: {
      description:
        "`UnitInput`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    maxLength: {
      description: "`UnitInput`의 최대 입력 가능 글자 수를 제한합니다.",
      type: { required: true, name: "number" },
      if: { arg: "disabled", neq: true },
    },
    hasError: {
      description: "`UnitInput` 에러 스타일 적용 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      table: { defaultValue: { summary: "false" } },
      if: { arg: "disabled", neq: true },
    },
    value: {
      description: "`UnitInput`에서 입력한 값입니다.",
      control: false,
      type: { required: true, name: "string" },
      if: { arg: "disabled", neq: false },
    },
    disabled: {
      description: "`UnitInput` 필드 클릭 및 입력을 비활성화합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    unit: {
      description:
        "`UnitInput`에 표시되는 단위 값입니다. `₭, ฿, P, $`는 입력 필드 좌측에 배치되며, 그 외 단위는 우측에 배치됩니다.",
    },
    register: {
      description:
        "`react-hook-form` 사용 시 입력값을 관리하는데 필요한 설정입니다.",
      type: {
        required: true,
        name: "other",
        value: "UseFormRegisterReturn<string>",
      },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
} satisfies Meta<typeof UnitInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
