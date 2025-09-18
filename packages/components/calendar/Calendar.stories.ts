import type { Meta, StoryObj } from "@storybook/react";

import Calendar from "./Calendar";

const meta = {
  title: "KOKKOK/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      layout: "padded",
      description: {
        component:
          "화면상에서 직접 단일 일자 또는 기간을 선택하고 해당 일자를 가시화하기 위한 달력 UI를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    dialogPosition: "down",
    isDialogOpen: true,
    type: "date",
    selectedDate: [],
    handleDateChange: () => {},
  },
  argTypes: {
    className: {
      description: "스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    as: {
      description:
        "`Calendar`의 기본 태그를 변경하는 용도로 사용합니다. 기본적으로 `div`태그로 설정되어 있습니다.",
      control: false,
      table: { type: { summary: "string" }, defaultValue: { summary: "div" } },
    },
    isDialogOpen: {
      description: "`Calendar` 노출 여부를 선택합니다.",
      control: false,
    },
    type: {
      description: "선택하는 일자의 type을 단일, 기간 중 선택합니다.",
      type: { name: "enum", value: ["free", "date"], required: true },
      table: { type: { summary: "free | date" } },
    },
    dialogPosition: {
      description: "`Calendar` 위치를 '위 or 아래'로 설정합니다.",
      control: false,
      type: { name: "enum", value: ["up", "down"], required: true },
      table: { type: { summary: "up | down" } },
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
        "사용자가 Apply 버튼을 눌렀을 때 선택한 일자 정보를 업데이트하는 handler 함수입니다.",
      control: false,
      type: { name: "function", required: true },
      table: { type: { summary: "(date: dayjs.Dayjs[] | []) => void" } },
    },
  },
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
