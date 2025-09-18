import type { Meta, StoryObj } from "@storybook/react";

import ExternalLinkButton from "./ExternalLinkButton";

const meta = {
  title: "KOKKOK/Button/Link/ExternalLinkButton",
  component: ExternalLinkButton,
  parameters: {
    docs: {
      description: {
        component:
          "다른 페이지로 이동하는 버튼 UI 컴포넌트입니다. 항상 새 탭에서 이동합니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { variant: "secondary", href: "", children: "Button" },
  argTypes: {
    className: {
      description: "`ExternalLinkButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    children: {
      description: "`ExternalLinkButton` 내부에 표시될 컴포넌트를 지정합니다.",
    },
    variant: {
      description: "`ExternalLinkButton`의 스타일 variant를 정의합니다.",
    },
    href: {
      description: "`ExternalLinkButton` 클릭 시 이동할 경로를 설정합니다.",
    },
  },
} satisfies Meta<typeof ExternalLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
