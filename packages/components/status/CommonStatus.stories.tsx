import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import CommonStatus from "./CommonStatus";

const meta = {
  title: "KOKKOK/Status",
  component: CommonStatus,
  parameters: {
    docs: {
      description: {
        component: "상태 값에 따라 색상과 스타일을 적용해 표시하는 UI 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  args: { hasBg: true, variant: "green", status: "Available" },
  argTypes: {
    className: {
      description: "`CommonStatus` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    hasBg: {
      description: "`CommonStatus` 배경색 적용 여부를 지정합니다.",
    },
    variant: {
      description: "`CommonStatus` 상태 색상을 지정합니다",
    },
    status: {
      description: "`CommonStatus`에 표시할 상태 문구입니다.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof CommonStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "20px",
        }}
      >
        <CommonStatus {...args} />
        <div style={{ display: "flex", columnGap: "20px", marginTop: "40px" }}>
          <CommonStatus variant="orange" hasBg status="Pending" />
          <CommonStatus variant="green" hasBg status="Available" />
          <CommonStatus variant="blue" hasBg status="Activated" />
          <CommonStatus variant="gray" hasBg status="Canceled" />
          <CommonStatus variant="red" hasBg status="Deactivated" />
        </div>
        <div style={{ display: "flex", columnGap: "44px" }}>
          <CommonStatus variant="orange" status="Pending" />
          <CommonStatus variant="green" status="Available" />
          <CommonStatus variant="blue" status="Activated" />
          <CommonStatus variant="gray" status="Canceled" />
          <CommonStatus variant="red" status="Deactivated" />
        </div>
      </div>
    );
  },
};
