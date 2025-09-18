import type { Meta, StoryObj } from "@storybook/react";

import WhatsappConnectButton from "./WhatsappConnectButton";

const meta = {
  title: "KOKKOK/Button/WhatsappConnectButton",
  component: WhatsappConnectButton,
  parameters: {
    docs: {
      description: {
        component:
          "Whatsapp을 통해 지정된 전화번호로 연결할 수 있는 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { mobile: "+8562012341234" },
  argTypes: {
    className: {
      description:
        "`WhatsappConnectButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    mobile: { description: "Whatsapp을 통해 연결할 전화번호를 설정합니다." },
  },
} satisfies Meta<typeof WhatsappConnectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
