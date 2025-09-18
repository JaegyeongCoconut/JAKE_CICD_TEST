import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { QueryFilterConstructorItem } from "@repo/types";

import QueryFilterFieldRadio from "./QueryFilterFieldRadio";
import QueryFilter from "../../../../../../../../QueryFilter";

const constructor = {
  status: {
    type: "radio",
    queryKey: "status",
    label: "Brand",
    selections: [
      { key: "0", label: "Corporate" },
      { key: "1", label: "Individual" },
      { key: "2", label: "Hero" },
      { key: "3", label: "Student" },
    ],
  },
} satisfies QueryFilterConstructorItem<"status">;

const meta = {
  title: "KOKKOK/QueryFilter/Controls/Radio",
  component: QueryFilterFieldRadio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: constructor.status.type,
    queryKey: constructor.status.queryKey,
    selections: constructor.status.selections,
    disabled: false,
  },
  argTypes: {
    type: {
      description: `현재 Filter의 control 타입을 지정합니다. FilterFieldRadio는 기본값 "radio"로 지정됩니다.`,
      control: false,
      table: { defaultValue: { summary: "radio" } },
    },
    queryKey: {
      description: "API 호출을 보낼 key 값을 설정합니다.",
      control: false,
    },
    selections: {
      description: "단수로 선택될 조건을 나열하기 위해 사용됩니다.",
      table: { type: { summary: "{ key : string, label : string }[]" } },
      control: false,
    },
    disabled: {
      description: "Radio 동작을 방지하기 위한 플래그입니다.",
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
} satisfies Meta<typeof QueryFilterFieldRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <QueryFilter.Field
      disabled={args.disabled}
      controls={{
        type: args.type,
        queryKey: args.queryKey,
        label: constructor.status.label,
        selections: args.selections,
      }}
    />
  ),
};
