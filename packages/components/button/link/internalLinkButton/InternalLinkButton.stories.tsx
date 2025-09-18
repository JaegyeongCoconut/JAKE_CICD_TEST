import type { Meta, StoryObj } from "@storybook/react";

import InternalLinkButton from "./InternalLinkButton";

const meta = {
  title: "KOKKOK/Button/Link/InternalLinkButton",
  component: InternalLinkButton,
  parameters: {
    docs: {
      description: {
        component:
          "다른 페이지로 이동하는 버튼 UI 컴포넌트입니다. 새 탭이 열리지 않고 현재 창에서 바로 이동합니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { variant: "primary", to: "", children: "Button" },
  argTypes: {
    className: {
      description: "`InternalLinkButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    children: {
      description: "`InternalLinkButton` 내부에 표시될 컴포넌트를 지정합니다.",
    },
    variant: {
      description: "`InternalLinkButton`의 스타일 variant를 정의합니다.",
    },
    to: {
      description: "`InternalLinkButton` 클릭 시 이동할 경로를 설정합니다.",
    },
    state: {
      description: "페이지 이동 시 함께 전달되는 추가 정보입니다.",
    },
  },
} satisfies Meta<typeof InternalLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
