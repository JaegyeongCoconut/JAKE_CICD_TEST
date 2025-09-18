import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import useToggle from "@repo/hooks/useToggle";

import Checkbox from "./Checkbox";

const meta = {
  title: "KOKKOK/Button/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: "항목을 선택하거나 해제할 수 있는 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isChecked: false,
    disabled: false,
    handleCheck: () => {},
  },
  argTypes: {
    className: {
      description: "`Checkbox` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    label: {
      description: "`Checkbox` 오른쪽에 표시되는 설명 문구를 설정합니다.",
    },
    isChecked: {
      description: "`Checkbox`가 선택되어 있는지 여부를 나타냅니다.",
    },
    disabled: { description: "`Checkbox` 기능을 비활성화 처리합니다." },
    handleCheck: {
      description:
        "`Checkbox` 클릭 시 실행되는 handler 함수입니다. 선택 또는 해제 동작을 처리합니다.",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isChecked, handleCheck] = useToggle();

    return (
      <Checkbox {...args} isChecked={isChecked} handleCheck={handleCheck} />
    );
  },
};
