import type { Meta, StoryObj } from "@storybook/react";

import LoadingSpinner from "./LoadingSpinner";

const meta = {
  title: "KOKKOK/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component:
          "작업 진행 중임을 사용자에게 시각적으로 알려주는 로딩 상태 표시 UI 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "`LoadingSpinner` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
