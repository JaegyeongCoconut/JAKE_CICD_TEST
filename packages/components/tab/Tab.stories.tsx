import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Tab from "./Tab";

const tabContent = {
  fontSize: "16px",
  padding: "16px",
};

const meta = {
  title: "KOKKOK/Tab",
  component: Tab,
  parameters: {
    docs: {
      description: {
        component:
          "여러 개의 Tab으로 구성된 UI를 제공하며, 사용자가 Tab을 클릭하면 해당 콘텐츠로 전환됩니다.",
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: false,
      description: "Tab 스타일을 커스텀하기 위해 사용합니다.",
    },
    tabs: {
      control: false,
      description:
        "Tab 페이지의 `key`와 `label`을 정의하는 배열입니다.<br />" +
        "- `key`: URL의 쿼리 파라미터 값으로 사용됩니다.<br />" +
        "- `label`: UI에서 표시될 탭의 이름입니다.",
      table: {
        type: { summary: "{ key: string; label: string; }[]" },
      },
    },
    children: {
      control: false,
      description: "<Tab.TabHeader />, <Tab.TabPanel /> 을 전달 받습니다.",
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { key: "inquiry", label: "Inquiry" },
      { key: "notice", label: "Notice" },
      { key: "ourPartners", label: "Our partners" },
      { key: "alarm", label: "Alarm" },
      { key: "update", label: "Update" },
    ],
    children: (
      <>
        <Tab.TabHeader />
        <Tab.TabPanel
          tabPanelRender={{
            inquiry: <div style={tabContent}>Inquiry content</div>,
            notice: <div style={tabContent}>Notice content</div>,
            ourPartners: <div style={tabContent}>Our partners content</div>,
            alarm: <div style={tabContent}>Alarm content</div>,
            update: <div style={tabContent}>Update content</div>,
          }}
        />
      </>
    ),
  },
};
