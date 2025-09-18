import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import DisabledInput from "./DisabledInput";

const meta = {
  title: "KOKKOK/Input/DisabledInput",
  component: DisabledInput,
  parameters: {
    docs: {
      description: {
        component: "비활성화된(Disabled) 입력 필드 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    value: "",
    placeholder: "Enter the price" as Languages,
  },
  argTypes: {
    className: {
      description:
        "`DisabledInput` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    placeholder: {
      description:
        "`DisabledInput`에 입력된 값이 없을 때 표시되는 placeholder 입니다.",
      table: { type: { summary: "string" } },
    },
    value: {
      description:
        "`DisabledInput`에 입력한 값입니다. 주로 표시용으로 사용됩니다.",
    },
  },
} satisfies Meta<typeof DisabledInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
