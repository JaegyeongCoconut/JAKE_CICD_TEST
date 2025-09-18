import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Profile from "./Profile";

const meta = {
  title: "KOKKOK/Profile",
  component: Profile,
  parameters: {
    docs: {
      description: {
        component: "사용자의 프로필 이미지를 보여주는 UI 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    isPresignedLoading: false,
    imgSrc: "https://picsum.photos/400/400",
  },
  argTypes: {
    isPresignedLoading: {
      description: "`Profile` 컴포넌트의 로딩 상태를 나타냅니다.",
      control: false,
    },
    imgSrc: { description: "`Profile`에 표시할 이미지 URL입니다." },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
