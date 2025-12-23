import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as CalendarIcon } from "@repo/assets/icon/ic_calendar.svg";

import CalendarButton from "./CalendarButton";
import Calendar from "../../calendar/Calendar";

const meta = {
  title: "KOKKOK/Button/CalendarButton",
  component: CalendarButton,
  parameters: {
    docs: {
      description: {
        component: "`Calendar` 컴포넌트를 열기 위한 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: <CalendarIcon css={{ width: "24px" }} />,
    disabled: false,
    onPopup: (dialogRef, isDialogOpen, handleDialogClose) => (
      <Calendar
        ref={dialogRef}
        isDialogOpen={isDialogOpen}
        dialogPosition="down"
        selectedDate={[]}
        type="date"
        handleConditionBlur={() => {}}
        handleConditionFocus={() => {}}
        handleDateChange={() => {}}
        handleDialogClose={handleDialogClose}
      />
    ),
  },
  argTypes: {
    children: {
      description:
        "`CalendarButton` 내부에 렌더링될 요소입니다. 아이콘이나 텍스트를 전달하여 커스텀합니다.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
    },
    disabled: { description: "`CalendarButton`을 비활성화 처리합니다." },
    onPopup: {
      description:
        "`CalendarButton` 클릭 시 열리는 `Calendar` 컴포넌트를 렌더링하고 제어하는 함수입니다.",
      table: {
        type: {
          summary:
            "(ref: React.RefObject<HTMLDialogElement>, isOpen: boolean, handleDialogClose: () => void) => void;",
        },
      },
    },
  },
} satisfies Meta<typeof CalendarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
