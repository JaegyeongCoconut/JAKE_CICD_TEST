import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as CalendarIcon } from "@repo/assets/icon/ic_calendar.svg";
import type { Languages } from "@repo/types";

import LabelContentTable from "./LabelContentTable";
import Button from "../../../button/Button";
import GhostButton from "../../../button/ghost/GhostButton";

const meta = {
  title: "KOKKOK/LabelContentTable",
  component: LabelContentTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "데이터 상세 조회 시, 사용자에게 정보를 조회할 수 있도록 표시되는 UI 인터페이스입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "bg",
    marginBottom: 30,
    subject: "Default information",
    children: (
      <LabelContentTable.Row>
        <LabelContentTable.Content label="Name">
          <span>Member</span>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    ),
  },
  argTypes: {
    className: {
      control: false,
      description: "Tab을 스타일을 커스텀하기 위해 사용합니다.",
    },
    variant: { description: "배경색을 지정합니다." },
    children: {
      description:
        "LabelContentTable.Row, LabelContentTable.Content를 전달 받습니다.",
      control: false,
    },
    marginBottom: { description: "하단 여백을 지정합니다." },
    subject: {
      description: "LabelContentTable의 제목 또는 ReactNode를 지정합니다.",
      table: { type: { summary: "string | ReactNode" } },
      control: false,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "930px" }}>
          <Story />
          <Button
            variant="primary"
            disabled={false}
            isLoading={false}
            label="Confirm"
            handleButtonClick={() => {}}
          />
        </div>
      );
    },
  ],
} satisfies Meta<typeof LabelContentTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Row1Partition1: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "LabelContentTable.Row = 1, LabelContentTable.Row.partition = 1인 UI입니다.",
      },
    },
  },
  args: {
    children: (
      <LabelContentTable.Row>
        <LabelContentTable.Content label="Name">
          <span>Member</span>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    ),
  },
};

export const Row2Partition2: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "LabelContentTable.Row = 1, LabelContentTable.Row.partition = 2인 UI입니다.",
      },
    },
  },
  args: {
    children: (
      <LabelContentTable.Row partition={2}>
        <LabelContentTable.Content label="Name">
          <span>Member</span>
        </LabelContentTable.Content>
        <LabelContentTable.Content label="Vehicle type">
          <span>Truck</span>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    ),
  },
};

export const Complex: Story = {
  parameters: {
    docs: {
      description: { story: "복합적인 요소가 결합된 LabelContentTable입니다." },
    },
  },
  args: {
    children: (
      <>
        <LabelContentTable.Row partition={2}>
          <LabelContentTable.Content label="Driver mobile">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>+856 10 20304050</span>
              <GhostButton variant="ghost_blue" label="Change" />
            </div>
          </LabelContentTable.Content>
          <LabelContentTable.Content label="Vehicle type">
            <span>Truck</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content label={"Icon palette" as Languages}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <time>05/03/2025, 09:44</time>
              <CalendarIcon style={{ width: "24px" }} />
            </div>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content label="Total distance">
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <span style={{ marginRight: "12px" }}>23.514km</span>
              <Button
                variant="filled_gray_blue"
                disabled={false}
                isLoading={false}
                label="Map"
                handleButtonClick={() => {}}
              />
            </div>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row partition={2}>
          <LabelContentTable.Content label="Pick-up date">
            <time>05/03/2025, 09:44</time>
          </LabelContentTable.Content>
          <LabelContentTable.Content label="Pick-up date">
            <time>05/03/2025, 09:44</time>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </>
    ),
  },
};
