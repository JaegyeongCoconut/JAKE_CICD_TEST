import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as CsIcon } from "@repo/assets/icon/ic_cs.svg";
import { ReactComponent as CustomizeIcon } from "@repo/assets/icon/ic_customize.svg";
import { ReactComponent as PersonIcon } from "@repo/assets/icon/ic_person.svg";
import { ReactComponent as SettingIcon } from "@repo/assets/icon/ic_setting.svg";
import { MonitorIcon } from "@repo/styles/iconBarrel";

import Navbar from "./Navbar";

const meta = {
  title: "KOKKOK/Navbar",
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          "페이지 간 이동을 지원하는 내비게이션 UI입니다. 아이콘을 클릭하여 페이지 이동을 할 수 있습니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    navs: [
      { path: "/logistics", Icon: MonitorIcon, content: "Monitoring" },
      { path: "/category", Icon: CustomizeIcon, content: "Category" },
      { path: "/client", Icon: PersonIcon, content: "Client" },
      { path: "/support", Icon: CsIcon, content: "Support" },
      { path: "/settings", Icon: SettingIcon, content: "Settings" },
    ],
    inaccessInfo: {
      all: { path: [], redirectPage: "" },
      inaccess: { path: ["/logistics", "/client"], redirectPage: "" },
    },
    level: "all",
  },
  argTypes: {
    navs: {
      description:
        "페이지 경로, 아이콘, 페이지 이름 정보를 포함하는 배열입니다.<br />마우스 hover 시 페이지 이름이 툴팁으로 표시됩니다.",
      control: false,
      table: {
        type: {
          summary: "{ path: string; Icon: SVGIcon; content: string; }[]",
        },
      },
    },
    level: {
      description:
        "사용자의 계정 등급을 나타냅니다.<br />해당 등급을 기준으로 접근 가능한 페이지를 제어하는 데 사용됩니다.",
      control: { type: "radio" },
      options: ["all", "inaccess"],
    },
    inaccessInfo: {
      description:
        "계정 등급별 접근 불가능한 경로를 정의합니다.<br />이를 기반으로 사용자가 접근 가능한 내비게이션 아이콘만 렌더링됩니다.",
      control: false,
      table: {
        type: {
          summary:
            "{ [key: string | number]: { path: string[]; redirectPage: string; } }",
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "40vh" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Navbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
