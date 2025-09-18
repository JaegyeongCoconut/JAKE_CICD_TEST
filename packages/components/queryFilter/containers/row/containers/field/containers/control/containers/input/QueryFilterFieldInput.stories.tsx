import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { QueryFilterConstructorItem } from "@repo/types";

import QueryFilterFieldInput from "./QueryFilterFieldInput";
import QueryFilter from "../../../../../../../../QueryFilter";

const constructor = {
  regNo: {
    type: "input",
    queryKey: "regNo",
    label: "Plate number",
    maxLength: 100,
    placeholder: "Enter the plate number",
  },
} satisfies QueryFilterConstructorItem<"regNo">;

const meta = {
  title: "KOKKOK/QueryFilter/Controls/Input",
  component: QueryFilterFieldInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: constructor.regNo.type,
    queryKey: constructor.regNo.queryKey,
    disabled: false,
  },
  argTypes: {
    type: {
      description: `현재 Filter의 control 타입을 지정합니다. FilterFieldInput는 기본값 "input"로 지정됩니다.`,
      control: false,
      table: { defaultValue: { summary: "input" } },
    },
    queryKey: {
      description: "API 호출을 보낼 key 값을 설정합니다.",
      control: false,
    },
    disabled: {
      description: "Input 동작을 방지하기 위한 플래그입니다.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <QueryFilter
          css={{ width: "900px" }}
          isLoadingApplyButton={false}
          constructor={constructor}
        >
          <QueryFilter.Row hasPartition={false}>
            <Story />
          </QueryFilter.Row>
        </QueryFilter>
      );
    },
  ],
} satisfies Meta<typeof QueryFilterFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <QueryFilter.Field
      disabled={args.disabled}
      controls={{
        type: args.type,
        queryKey: args.queryKey,
        label: constructor.regNo.label,
      }}
    />
  ),
};
