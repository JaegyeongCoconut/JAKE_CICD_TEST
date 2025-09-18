import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import PageHeader from "./PageHeader";
import Button from "../../button/Button";

const meta = {
  title: "KOKKOK/Header/PageHeader",
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component: "현재 페이지의 타이틀을 나타내주는 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    marginBottom: 50,
    heading: "Client",
    button: (
      <Button
        variant="ghost_blue"
        disabled={false}
        isLoading={false}
        label={"Payment gateway : BCEL" as Languages}
        handleButtonClick={() => {}}
      />
    ),
  },
  argTypes: {
    className: {
      control: false,
      description: "PageHeader 스타일을 커스텀하기 위해 사용합니다.",
    },
    marginBottom: {
      description: "PageHeader의 아래 간격을 조절하기 위해 사용합니다.",
    },
    heading: {
      description: "현재 페이지의 타이틀을 입력합니다.",
      table: { type: { summary: "string" } },
    },
    button: {
      description: "PageHeader와 동위선상에 나타낼 버튼을 포함합니다.",
      control: false,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "50vw", border: "1px solid red" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
