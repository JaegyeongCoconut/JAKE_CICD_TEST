import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";

const meta = {
  title: "KOKKOK/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: "사용자에게 추가 정보를 전달하기 위한 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Tooltip을 스타일을 커스텀하기 위해 사용합니다.",
    },
    position: { description: "Tooltip이 렌더링될 위치를 선정합니다." },
    message: {
      description: "Tooltip에 포함될 문구를 입력합니다.",
      table: { type: { summary: "string" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: "BOTTOM_LEFT",
    message: "Support file: png, jpeg, jpg (Limit 1MB)",
  },
};
