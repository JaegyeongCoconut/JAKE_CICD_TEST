import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { QueryFilterConstructorItem } from "@repo/types";

import QueryFilter from "./QueryFilter";

const constructor = {
  status: {
    type: "radio",
    queryKey: "status",
    label: "Status",
    isRequired: true,
    selections: [
      { key: "dispatched", label: "Dispatched" },
      { key: "departed", label: "Departed" },
      { key: "arrived", label: "Arrived" },
      { key: "completed", label: "Completed" },
      { key: "canceled", label: "Canceled" },
    ],
  },
  no: {
    type: "inputRegExpFullLength",
    queryKey: "no",
    placeholder: "Enter the order number (numbers only)",
    label: "Order number",
    maxLength: 15,
    regExp: /[^0-9]/g,
  },
  regNo: {
    type: "input",
    queryKey: "regNo",
    maxLength: 100,
    placeholder: "Enter the plate number",
    label: "Plate number",
  },
} satisfies QueryFilterConstructorItem;

const meta = {
  title: "KOKKOK/QueryFilter",
  component: QueryFilter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    isLoadingApplyButton: false,
    constructor,
    children: (
      <>
        <QueryFilter.Row hasPartition={false}>
          <QueryFilter.Field disabled={false} controls={constructor.status} />
        </QueryFilter.Row>
        <QueryFilter.Row hasPartition={false}>
          <QueryFilter.Field disabled={false} controls={constructor.no} />
        </QueryFilter.Row>
        <QueryFilter.Row hasPartition={false}>
          <QueryFilter.Field disabled={false} controls={constructor.regNo} />
        </QueryFilter.Row>
      </>
    ),
  },
  argTypes: {
    isLoadingApplyButton: {
      description:
        "연속적인 API 요청을 막기 위해 작성됩니다. 일반적으로 useIsFetching에서 호출된 API call 개수로 boolean을 결정합니다.",
    },
    className: {
      description: "QueryFilter 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    constructor: {
      description: "Filter를 제어하기 위해 만들어주는 객체입니다.",
      control: false,
    },
    children: {
      description:
        "<QueryFilter.Row />, <QueryFilter.Field /> 을 전달 받습니다.",
      control: false,
    },
  },
  decorators: [
    (_, context) => {
      return (
        <div
          style={{
            width: "800px",
            height: "270px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QueryFilter
            isLoadingApplyButton={context.args.isLoadingApplyButton}
            constructor={context.args.constructor}
          >
            {context.args.children}
          </QueryFilter>
        </div>
      );
    },
  ],
} satisfies Meta<typeof QueryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "검색 조건을 선택하기 위한 QueryFilter 컴포넌트입니다. isRequired가 지정되지 않으면 Apply 버튼은 활성화 상태입니다.",
      },
    },
  },
  // NOTE: constructor를 전달하지 않으면 Story에서 args 타입 불일치 오류가 발생하여 산입
  args: { constructor },
};
