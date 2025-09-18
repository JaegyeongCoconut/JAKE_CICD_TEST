import type { Meta, StoryObj } from "@storybook/react";

import Breadcrumb from "./Breadcrumb";

const meta = {
  title: "KOKKOK/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Breadcrumb 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    breadcrumbs: {
      description:
        "Breadcrumb 의 path를 나타내기 위한 배열입니다. breadcrumbs의 총 길이가 648px 이상이면 마지막과 끝의 아이템을 남겨두고 말줄임표기가 됩니다.",
      table: {
        type: {
          summary: "{ name: string; isTranslated:boolean; path: string }[]",
        },
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { name: "Add notice", path: "/", isTranslated: true },
      { name: "Dashboard", path: "/dashboard", isTranslated: true },
      { name: "Settings", path: "", isTranslated: true },
    ],
  },
};

export const Ellipsis: Story = {
  args: {
    breadcrumbs: [
      { name: "Add notice", path: "/", isTranslated: true },
      { name: "Dashboard1", path: "/dashboard1", isTranslated: false },
      { name: "Dashboard2", path: "/dashboard2", isTranslated: false },
      { name: "Dashboard3", path: "/dashboard3", isTranslated: false },
      { name: "Dashboard4", path: "/dashboard4", isTranslated: false },
      { name: "Dashboard5", path: "/dashboard5", isTranslated: false },
      { name: "Dashboard6", path: "/dashboard6", isTranslated: false },
      { name: "Dashboard7", path: "/dashboard7", isTranslated: false },
      { name: "Dashboard8", path: "/dashboard8", isTranslated: false },
      { name: "Dashboard9", path: "/dashboard9", isTranslated: false },
      { name: "Dashboard10", path: "/dashboard10", isTranslated: false },
      { name: "Settings", path: "", isTranslated: true },
    ],
  },
};
