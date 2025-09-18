import React from "react";

import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Title,
} from "@storybook/blocks";
import type { Meta, StoryObj } from "@storybook/react";

import type { DateQueryKeyType, QueryFilterConstructorItem } from "@repo/types";

import QueryFilterFieldCalendar from "./QueryFilterFieldCalendar";
import QueryFilter from "../../../../../../../../QueryFilter";

const constructor = {
  created: {
    type: "calendar",
    queryKey: "created",
    calendarType: "free",
    label: "Created date",
    placeholder: "Select date",
  },
} satisfies QueryFilterConstructorItem<"created">;

const meta = {
  title: "KOKKOK/QueryFilter/Controls/Calendar",
  component: QueryFilterFieldCalendar,
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  args: {
    type: constructor.created.type,
    queryKey: constructor.created.queryKey,
    disabled: false,
    calendarType: constructor.created.calendarType,
  },
  argTypes: {
    type: {
      description: `현재 Filter의 control 타입을 지정합니다. FilterFieldCalendar는 기본값 "calendar"로 지정됩니다.`,
      control: false,
      table: { defaultValue: { summary: "calendar" } },
    },
    queryKey: {
      description: "API 호출을 보낼 key 값을 설정합니다.",
      control: false,
      table: {
        type: {
          summary: `"date" | "pickup" | "updated" | "created" | "completed" | "purchaseDate" | "contractDate" | "bookingDate" | "onSaleDate" | "soldDate" | "salesDate"`,
        },
      },
    },
    disabled: {
      description: "Calendar 동작을 방지하기 위한 플래그입니다.",
      table: { defaultValue: { summary: "false" } },
    },
    calendarType: {
      description:
        "단일 날짜 / 기간 선택을 가능하게 하는 플래그입니다. date는 단일 날짜, free는 단일 / 기간 선택을 지원합니다.",
      table: { defaultValue: { summary: "free" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <QueryFilter
            css={{ width: "900px" }}
            isLoadingApplyButton={false}
            constructor={constructor}
          >
            <QueryFilter.Row hasPartition={false}>
              <Story />
            </QueryFilter.Row>
          </QueryFilter>
        </div>
      );
    },
  ],
} satisfies Meta<typeof QueryFilterFieldCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <QueryFilter.Field
        disabled={args.disabled}
        controls={{
          type: args.type,
          queryKey: args.queryKey as DateQueryKeyType,
          calendarType: args.calendarType,
          label: constructor.created.label,
        }}
      />
    );
  },
};
