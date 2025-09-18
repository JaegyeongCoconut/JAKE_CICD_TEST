import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { QueryFilterConstructorItem, Languages } from "@repo/types";

import QueryFilterFieldCheckbox from "./QueryFilterFieldCheckbox";
import QueryFilter from "../../../../../../../../QueryFilter";

const constructor = {
  categories: {
    type: "checkbox",
    queryKey: "categories",
    label: "Category",
    selections: [
      { key: "0", label: "Salary" },
      { key: "1", label: "Profit" as Languages },
      { key: "2", label: "Rental" as Languages },
      { key: "3", label: "Battery" },
      { key: "4", label: "Reward" as Languages },
      { key: "5", label: "Penalty" as Languages },
      { key: "100", label: "Internal policy related" },
      { key: "101", label: "Safety policy related" },
      { key: "102", label: "Additional Payment related" as Languages },
      { key: "103", label: "B2B orders" },
    ],
    hasAllCheckButton: true,
  },
} satisfies QueryFilterConstructorItem<"categories">;

const meta = {
  title: "KOKKOK/QueryFilter/Controls/Checkbox",
  component: QueryFilterFieldCheckbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: constructor.categories.type,
    queryKey: constructor.categories.queryKey,
    selections: constructor.categories.selections,
  },
  argTypes: {
    type: {
      description: `현재 Filter의 control 타입을 지정합니다. FilterFieldCheckbox는 기본값 "checkbox"로 지정됩니다.`,
      control: false,
      table: { defaultValue: { summary: "checkbox" } },
    },
    queryKey: {
      description: "API 호출을 보낼 key 값을 설정합니다.",
      control: false,
    },
    selections: {
      description: "복수로 선택될 조건들을 나열하기 위해 사용됩니다.",
      table: { type: { summary: "{ key : string, label : string }[]" } },
      control: false,
    },
  },
} satisfies Meta<typeof QueryFilterFieldCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <QueryFilter
        css={{ width: "900px" }}
        isLoadingApplyButton={false}
        constructor={constructor}
      >
        <QueryFilter.Row hasPartition={false}>
          <QueryFilter.Field
            disabled={false}
            controls={{
              type: args.type,
              queryKey: args.queryKey,
              label: constructor.categories.label,
              selections: args.selections,
              hasAllCheckButton: true,
            }}
          />
        </QueryFilter.Row>
      </QueryFilter>
    );
  },
};
