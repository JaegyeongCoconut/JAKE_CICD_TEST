import type { Meta, StoryObj } from "@storybook/react";

import {
  LAOS_COUNTRY_DIAL,
  LAOS_MOBILE_PLACEHOLDER,
} from "@repo/assets/static/phone";

import MobileNumberInput from "./MobileNumberInput";

const meta = {
  title: "KOKKOK/Input/MobileNumberInput",
  component: MobileNumberInput,
  parameters: {
    docs: {
      description: { component: "전화번호 입력 필드 UI 컴포넌트입니다." },
    },
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    hasError: false,
    dial: LAOS_COUNTRY_DIAL,
    placeholder: LAOS_MOBILE_PLACEHOLDER,
    maxLength: 20,
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
        "`MobileNumberInput` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    disabled: {
      description: "`MobileNumberInput` 필드 클릭 및 입력을 비활성화합니다.",
      defaultValue: { summary: "false" },
    },
    hasError: {
      description: "`MobileNumberInput` 에러 스타일 적용 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      defaultValue: { summary: "false" },
      if: { arg: "disabled", neq: true },
    },
    dial: {
      description: "`MobileNumberInput`에서 표시되는 국가 번호 값입니다.",
      control: false,
    },
    placeholder: {
      description:
        "`MobileNumberInput`에 입력 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    maxLength: {
      description: "`MobileNumberInput`의 최대 입력 가능 글자 수를 제한합니다.",
      type: { required: true, name: "number" },
      if: { arg: "disabled", neq: true },
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
} satisfies Meta<typeof MobileNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
