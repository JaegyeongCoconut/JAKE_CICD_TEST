import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import CopyButton from "./CopyButton";
import Toast from "../../toast/Toast";

const meta = {
  title: "KOKKOK/Button/CopyButton",
  component: CopyButton,
  parameters: {
    docs: {
      description: {
        component: "텍스트를 클립보드에 복사하는 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { copyText: "copy text", serviceType: "car" },
  argTypes: {
    className: {
      description: "`CopyButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    copyText: {
      description:
        "`CopyButton` 클릭 시 클립보드에 복사할 텍스트를 설정합니다.",
    },
    serviceType: {
      description: "`CopyButton`이 사용되는 서비스 종류를 설정합니다.",
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "60px" }}>
          <Toast />
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
