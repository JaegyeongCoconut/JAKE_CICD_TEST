import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import type { Dayjs } from "dayjs";

import CalendarInput from "./CalendarInput";

const meta = {
  title: "KOKKOK/Input/CalendarInput",
  component: CalendarInput,
  parameters: {
    docs: {
      layout: "fullscreen",
      description: {
        component:
          "`Calendar` 컴포넌트를 열고 단일 일자나 기간을 선택하거나, 선택된 일자 정보가 input에 노출되도록 하는 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    selectedDate: [],
    dialogPosition: "down",
    type: "free",
    value: "",
    hasError: false,
    placeholder: "Select the date",
    handleDateChange: () => {},
    handleConditionFocus: () => {},
    handleConditionBlur: () => {},
  },
  argTypes: {
    className: {
      description: "스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    dialogPosition: {
      description: "`Calendar` 위치를 '위 or 아래'로 설정합니다.",
      type: { required: true, name: "enum", value: ["up", "down", "center"] },
      table: { type: { summary: "up | down | center" } },
      if: { arg: "disabled", neq: true },
    },
    value: {
      description: "`Calendar`에서 선택한 값이 노출됩니다.",
      type: { required: true, name: "boolean" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    type: {
      description: "선택하는 일자의 type을 단일, 기간 중 선택합니다.",
      type: { required: true, name: "enum", value: ["free", "date"] },
      table: {
        type: { summary: "free | date" },
        defaultValue: { summary: "date" },
      },
      if: { arg: "disabled", neq: true },
    },
    selectedDate: {
      description:
        "일 단위 화면에서 원하는 일자를 직접 선택하면 선택한 일자는 `DD/MM/YYYY` 형태로 input에 자동 산입됩니다.",
      control: false,
      type: { required: true, name: "string" },
      table: { type: { summary: "string[]" } },
      if: { arg: "disabled", neq: true },
    },
    handleDateChange: {
      description:
        "사용자가 Apply 버튼을 눌렀을 때 선택한 일자 정보를 업데이트하는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      table: { type: { summary: "(date: dayjs.Dayjs[] | []) => void" } },
      if: { arg: "disabled", neq: true },
    },
    placeholder: {
      description: "일자를 선택하기 전 기본 placeholder를 보여줍니다.",
      table: { type: { summary: "string" } },
    },
    hasError: {
      description: "에러 여부에 따라 다른 style로 설정합니다.",
      type: { required: true, name: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
      if: { arg: "disabled", neq: true },
    },
    disabled: {
      description: "`CalendarInput` 기능을 비활성화처리합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    handleConditionFocus: {
      description: "사용자가 input에 focus했을 때 동작하는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    handleConditionBlur: {
      description:
        "사용자가 input에서 blur했을 때 동작하는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
} satisfies Meta<typeof CalendarInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<string[]>([]);

    const handleDate = (date: Dayjs[] | []): void => {
      setDate(date.map((item) => item.format("DD/MM/YYYY")));
    };

    const TOP_POSITION = { up: "80%", center: "50%", down: "20%" };

    return !args.disabled ? (
      <CalendarInput
        {...args}
        css={{
          position: "absolute",
          //NOTE: position:absolute + dialogPosition: "up" 조합의 경우 canvas height에서 잘려서 보이는 이슈 발생하여 css 조건 추가
          top: TOP_POSITION[args.dialogPosition],
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        value={date.join("~")}
        selectedDate={date}
        handleDateChange={handleDate}
      />
    ) : (
      <CalendarInput
        css={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        disabled
        value=""
        placeholder={args.placeholder}
      />
    );
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", minHeight: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DateTypeCalendarInput: Story = {
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
  argTypes: { dialogPosition: { control: false } },
};

export const FreeTypeCalendarInput: Story = {
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
  argTypes: { dialogPosition: { control: false } },
};
