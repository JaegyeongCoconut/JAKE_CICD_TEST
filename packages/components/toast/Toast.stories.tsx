import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import ToastItem from "./item/ToastItem";

const meta = {
  title: "KOKKOK/Toast",
  component: ToastItem,
  parameters: {
    docs: {
      description: {
        component: "사용자에게 알림을 표시하는 개별 Toast 항목입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: { description: "Toast의 id를 지정합니다.", control: false },
    type: {
      description: "Toast의 타입을 지정합니다.",
      control: { type: "radio" },
      options: ["success", "warning"],
    },
    content: {
      description: "Toast 메시지를 입력합니다.",
      table: { type: { summary: "string" } },
      control: { type: "text" },
    },
  },
  // NOTE: Toast는 일정 시간이 지나면 사라지기 때문에 props를 수정하지 않고 setTimeout을 초기화해주도록 함
  decorators: [
    (Story) => {
      const originalSetTimeout = window.setTimeout;

      window.setTimeout = ((handler: () => void, timeout?: number) => {
        return originalSetTimeout(() => {}, timeout);
      }) as typeof window.setTimeout;

      return <Story />;
    },
  ],
} satisfies Meta<typeof ToastItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessToast: Story = {
  args: {
    id: "successToast",
    type: "success",
    content: "The banner has been deleted.",
  },
};

export const WarningToast: Story = {
  args: {
    id: "warningToast",
    type: "warning",
    content:
      "The point history cannot be deleted.\nThe order has already been completed." as Languages,
  },
};
