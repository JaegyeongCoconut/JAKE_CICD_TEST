import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import PageHeader from "./PageHeader";

const meta = {
  title: "KOKKOK/Header/PageHeader",
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component: "현재 페이지의 타이틀을 나타내주는 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    hasMarginBottom: true,
    marginBottom: 40,
    heading: "Client",
  },
  argTypes: {
    className: {
      description: "PageHeader 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    hasMarginBottom: {
      description: "PageHeader 컴포넌트의 하단 여백 적용 여부를 결정합니다.",
    },
    marginBottom: {
      description: "PageHeader 컴포넌트의 하단 여백 값을 직접 지정합니다.",
      type: { required: true, name: "number" },
      if: { arg: "hasMarginBottom", neq: false },
    },
    heading: {
      description: "PageHeader 컴포넌트에 표시할 타이틀 문구를 입력합니다.",
      table: { type: { summary: "string" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "50vw", border: "1px solid red" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
