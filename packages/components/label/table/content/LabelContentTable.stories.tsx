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
    hasDefaultMarginBottom: true,
    subject: "Default information",
    children: (
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label="Name"
          labelWidth={210}
        >
          <span>Member</span>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    ),
  },
  argTypes: {
    className: {
      description: "LabelContentTable의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    variant: {
      description: "LabelContentTable의 Label 영역 스타일을 설정합니다.",
    },
    children: {
      description:
        "LabelContentTable.Row, LabelContentTable.Content를 전달 받습니다.",
      type: { required: true, name: "other", value: "ReactNode" },
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
    hasDefaultMarginBottom: {
      description:
        "기본 하단 여백 값 사용 여부를 결정합니다. (기본 marginBottom: 40px)",
      table: { defaultValue: { summary: "false" } },
    },
    marginBottom: {
      description: "하단 여백을 직접 설정합니다.",
      type: { required: true, name: "number" },
      if: { arg: "hasDefaultMarginBottom", neq: true },
    },
    subject: {
      description: "LabelContentTable의 제목 또는 ReactNode를 지정합니다.",
      table: { type: { summary: "string | ReactNode | null" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "840px" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof LabelContentTable>;

export default meta;
type Story = StoryObj<typeof LabelContentTable>;

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
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label="Name"
          labelWidth={210}
        >
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
      <LabelContentTable.Row hasError={false} hasPartition marginTop={0}>
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label="Name"
          labelWidth={210}
        >
          <span>Member</span>
        </LabelContentTable.Content>
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label="Vehicle type"
          labelWidth={210}
        >
          <span>Truck</span>
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    ) as React.ReactNode,
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
        <LabelContentTable.Row hasError={false} hasPartition marginTop={0}>
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Driver mobile number"
            labelWidth={210}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>+856 10 20304050</span>
              <GhostButton
                variant="ghost_blue"
                disabled={false}
                isLoading={false}
                label="Change"
                handleButtonClick={() => {}}
              />
            </div>
          </LabelContentTable.Content>
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Vehicle type"
            labelWidth={210}
          >
            <span>Truck</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row
          hasError={false}
          hasPartition={false}
          marginTop={0}
        >
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label={"Icon palette" as Languages}
            labelWidth={210}
          >
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
        <LabelContentTable.Row
          hasError={false}
          hasPartition={false}
          marginTop={0}
        >
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Total distance"
            labelWidth={210}
          >
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
        <LabelContentTable.Row hasError={false} hasPartition marginTop={0}>
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Pick-up date"
            labelWidth={210}
          >
            <time>05/03/2025, 09:44</time>
          </LabelContentTable.Content>
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Pick-up date"
            labelWidth={210}
          >
            <time>05/03/2025, 09:44</time>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </>
    ),
  },
};
