import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Calendar from "./Calendar";

const meta = {
  title: "KOKKOK/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          "화면상에서 직접 단일 일자 또는 기간을 선택하고 해당 일자를 가시화하기 위한 달력 UI를 제공합니다.",
      },
    },
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    isDialogOpen: true,
    dialogPosition: "down",
    selectedDate: [],
    type: "date",
    handleConditionBlur: () => {},
    handleConditionFocus: () => {},
    handleDateChange: () => {},
    handleDialogClose: () => {},
  },
  argTypes: {
    className: {
      description: "`Calendar` 컴포넌트의 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    isDialogOpen: {
      description: "`Calendar` 컴포넌트 노출 여부를 제어합니다.",
    },
    type: {
      description:
        "날짜 선택 모드를 단일 날짜(date) 또는 기간 선택(free) 중 선택합니다.",
      type: { name: "enum", value: ["free", "date"], required: true },
      table: { type: { summary: "free | date" } },
    },
    dialogPosition: {
      description:
        "`Calendar` 컴포넌트의 위치를 '위', '중간', '아래' 으로 설정합니다.",
      type: { name: "enum", value: ["up", "center", "down"], required: true },
      table: { type: { summary: "up | down | center " } },
    },
    selectedDate: {
      description:
        "일 단위 화면에서 원하는 일자를 직접 선택하면 선택한 일자는 `DD/MM/YYYY` 형태로 input에 자동 산입됩니다.",
      control: false,
      type: { name: "array", value: { name: "string" }, required: true },
      table: { type: { summary: "string[]" } },
    },
    handleDateChange: {
      description:
        "사용자가 'Apply' 버튼을 눌렀을 때, 선택된 날짜 정보를 업데이트하는 handler 함수입니다.",
      type: { name: "function", required: true },
      table: { type: { summary: "(date: dayjs.Dayjs[] | []) => void" } },
      control: false,
    },
    handleConditionBlur: {
      description:
        "사용자가 입력 필드에서 focus를 잃었을 때 (blur) 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      table: {
        type: { summary: "(e?: React.FocusEvent<HTMLInputElement>) => void" },
      },
      control: false,
    },
    handleConditionFocus: {
      description:
        "사용자가 입력 필드에 focus했을 때 호출되는 handler 함수입니다.",
      type: { required: true, name: "function" },
      table: {
        type: { summary: "(e?: React.FocusEvent<HTMLInputElement>) => void" },
      },
      control: false,
    },
    handleDialogClose: {
      description: "`Calendar` 컴포넌트를 닫을 때 호출되는 핸들러 함수입니다.",
      type: { required: true, name: "function" },
      table: { type: { summary: "() => void" } },
      control: false,
    },
  },
  decorators: [
    (Story, context) => {
      const TOP_POSITION = { up: "100%", center: "40%", down: "0%" };

      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: TOP_POSITION[context.args.dialogPosition],
              width: "100%",
              borderTop: "2px solid red",
            }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateTypeCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`type: "date"`로 단일 일자 선택 달력 UI입니다.<br/>' +
          '`selectedDate`의 값이 `["DD/MM/YYYY"]`와 같은 배열 구조로 이루어져 있습니다.',
      },
    },
  },
  args: { type: "date" },
};

export const FreeTypeCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`type: "free"`로 기간 선택 달력 UI입니다.<br/>' +
          '`selectedDate`의 값이 `["DD/MM/YYYY","DD/MM/YYYY"]`와 같은 배열 구조이루어져 있습니다.',
      },
    },
  },
  args: { type: "free" },
};
