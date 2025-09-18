import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as RefreshIcon } from "@repo/assets/icon/ic_refresh.svg";

import GhostButton from "./GhostButton";

const meta = {
  title: "KOKKOK/Button/GhostButton",
  component: GhostButton,
  parameters: {
    docs: {
      description: {
        component:
          "배경색이 없고, 문구 하단에 밑줄이 표시되는 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    isLoading: false,
    type: "button",
    variant: "ghost",
    label: "Reset",
    icon: {
      component: <RefreshIcon css={{ width: "12px", marginRight: "4px" }} />,
      position: "left",
    },
    handleButtonClick: () => {},
  },
  argTypes: {
    className: {
      description: "`GhostButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    disabled: {
      description:
        "`GhostButton`을 비활성화합니다. 만약 disabled 상태라면 마우스 호버시 not-allowed 커서가 보입니다.",
    },
    isLoading: {
      description:
        "`GhostButton`이 로딩 상태인지 나타냅니다. 만약 로딩 상태라면 spinner 아이콘이 보여집니다.",
    },
    type: {
      description:
        "`GhostButton`의 타입을 정의합니다. 기본 값은 button 타입입니다.",
    },
    variant: { description: "`GhostButton`의 스타일 variant를 정의합니다." },
    label: {
      description: "`GhostButton`에 표시할 텍스트를 설정합니다.",
      table: { type: { summary: "string" } },
    },
    icon: {
      description:
        "`GhostButton`에 아이콘을 추가할 때 사용하는 객체입니다.<br />" +
        "- `components`: 추가할 SVG 아이콘을 설정합니다.<br />" +
        "- `position`: 아이콘이 버튼의 좌측 또는 우측에 위치하도록 설정합니다.",
      control: false,
    },
    handleButtonClick: {
      description: "`GhostButton` 클릭 시 호출되는 handler 함수입니다.",
    },
  },
} satisfies Meta<typeof GhostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
