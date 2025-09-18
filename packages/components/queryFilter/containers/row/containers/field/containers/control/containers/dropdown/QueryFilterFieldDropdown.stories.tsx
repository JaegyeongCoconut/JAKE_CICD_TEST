import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { QueryFilterConstructorItem, Languages } from "@repo/types";

import QueryFilterFieldDropdown from "./QueryFilterFieldDropdown";
import QueryFilter from "../../../../../../../../QueryFilter";

const constructor = {
  brand: {
    type: "dropdown",
    queryKey: "brand",
    label: "Brand",
    selections: [
      { key: "KIA", label: "KIA" as Languages },
      { key: "HYUNDAI", label: "HYUNDAI" as Languages },
      { key: "NETA", label: "NETA" as Languages },
      { key: "TERACO", label: "TERACO" as Languages },
      { key: "DAEHAN", label: "DAEHAN" as Languages },
      { key: "MITSUBISHI", label: "MITSUBISHI" as Languages },
      { key: "CHANGAN", label: "CHANGAN" as Languages },
      { key: "BMW", label: "BMW" as Languages },
      { key: "OTHER", label: "OTHER" as Languages },
    ],
    placeholder: "Select the option",
  },
} satisfies QueryFilterConstructorItem<"brand">;

const meta = {
  title: "KOKKOK/QueryFilter/Controls/Dropdown",
  component: QueryFilterFieldDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: constructor.brand.type,
    queryKey: constructor.brand.queryKey,
    selections: constructor.brand.selections,
    disabled: false,
  },
  argTypes: {
    type: {
      description: `현재 Filter의 control 타입을 지정합니다. FilterFieldDropdown는 기본값 "dropdown"로 지정됩니다.`,
      control: false,
      table: { defaultValue: { summary: "dropdown" } },
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
      description: "Dropdown 동작을 방지하기 위한 플래그입니다.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "500px" }}>
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
} satisfies Meta<typeof QueryFilterFieldDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <QueryFilter.Field
      disabled={args.disabled}
      controls={{
        type: args.type,
        queryKey: args.queryKey,
        selections: args.selections,
        label: constructor.brand.label,
      }}
    />
  ),
};
