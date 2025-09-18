import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import AccountInput from "./AccountInput";

const meta = {
  title: "KOKKOK/Input/AccountInput",
  component: AccountInput,
  parameters: {
    docs: {
      description: {
        component:
          "로그인이나 회원가입 화면에서 이메일, 비밀번호 등의 정보를 입력받기 위해 사용되는 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    id: "email",
    type: "email",
    label: "Email" as Languages,
    maxLength: 100,
    disabled: false,
    isDirty: false,
    hasError: false,
    register: {
      onChange: async () => {},
      onBlur: async () => {},
      name: "",
      ref: () => {},
    },
  },
  argTypes: {
    className: {
      description: "`AccountInput` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    id: {
      description:
        "`AccountInput`의 라벨(제목)과 입력창을 연결해주는 역할을 합니다.",
      control: false,
    },
    type: {
      description:
        "기본 input의 입력 유형을 지정하며, `AccountInput`이 어떤 종류의 데이터를 받을지 결정합니다.",
    },
    label: {
      description: "`AccountInput` 상단에 표시되는 제목이나 설명입니다.",
      control: false,
      table: { type: { summary: "string" } },
    },
    maxLength: {
      description: "`AccountInput`에 입력할 수 있는 글자 수를 제한합니다.",
    },
    disabled: {
      description: "`AccountInput`을 클릭하거나 입력하지 못하게 막습니다.",
      defaultValue: { summary: "false" },
    },
    isDirty: {
      description: "입력값이 바뀐 적이 있는지를 알려주는 표시입니다.",
      control: false,
    },
    hasError: {
      description: "`AccountInput` 에러 스타일 적용 여부를 나타냅니다.",
      defaultValue: { summary: "false" },
    },
    register: {
      description:
        "`react-hook-form` 사용 시 입력값을 관리하는 데 필요한 설정입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof AccountInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    switch (args.type) {
      case "email":
        args.id = "email";
        args.label = "Email" as Languages;

        break;
      case "password":
        args.id = "password";
        args.label = "Password" as Languages;

        break;
      default:
        args.id = "text";
        args.label = "Text" as Languages;
    }

    return <AccountInput {...args} />;
  },
};
