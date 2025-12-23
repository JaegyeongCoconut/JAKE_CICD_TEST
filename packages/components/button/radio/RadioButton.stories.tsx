import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import useRadioButton from "@repo/hooks/useRadioButton";
import type { Languages, RadioType } from "@repo/types";

import RadioButton from "./RadioButton";

const radioList: RadioType<string | number, Languages>[] = [
  { key: "on", label: "On" as Languages },
  { key: "off", label: "Off" as Languages },
];

const meta = {
  title: "KOKKOK/Button/RadioButton",
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component:
          "사용자가 하나의 옵션을 선택할 수 있도록 제공되는 라디오 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    radioList: radioList,
    radioState: "on",
    handleRadioButtonClick: () => () => {},
  },
  argTypes: {
    className: {
      description: "`RadioButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    disabled: { description: "`RadioButton`을 비활성화합니다." },
    radioList: {
      description: "`RadioButton`에서 선택할 수 있는 옵션 목록입니다.",
      table: {
        type: {
          summary:
            "{  Icon?: FC<SVGProps<SVGSVGElement>>; key: string | number; label: string; }[]",
        },
      },
    },
    radioState: {
      description: "`RadioButton`에서 선택된 옵션의 값을 나타냅니다.",
      table: { type: { summary: "string | number | null" } },
    },
    handleRadioButtonClick: {
      description:
        "`RadioButton`에서 옵션을 선택했을 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      table: { type: { summary: "(key: string | number) => () => void;" } },
      if: { arg: "disabled", neq: true },
      control: false,
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const { radioState, handleRadioButtonClick } = useRadioButton(
      radioList[0].key,
    );

    return (
      <RadioButton
        {...args}
        disabled={false}
        radioState={radioState}
        handleRadioButtonClick={handleRadioButtonClick}
      />
    );
  },
};
