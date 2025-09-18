import type { Meta, StoryObj } from "@storybook/react";

import ConfirmModal from "./ConfirmModal";

const meta = {
  title: "KOKKOK/Modal/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    docs: {
      description: {
        component:
          "사용자가 행동을 결정하기 위해 재확인 요청을 할 수 있는 모달창 UI 컴포넌트",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isLoading: false,
    title: "Upload photo",
    desc: "Do you want to upload the car photo now?",
    activeButtonName: "Confirm",
    closeButtonName: "Cancel",
    buttonType: "active",
    noCloseButton: false,
  },
  argTypes: {
    className: {
      control: false,
      description: "`ConfirmModal` 스타일을 커스텀하기 위해 사용합니다.",
      table: { type: { summary: "string" } },
    },
    isLoading: {
      description:
        "API 요청이 진행 중일 때 중복 요청을 방지하기 위해 로딩 상태 여부를 설정합니다.",
      type: { required: true, name: "boolean" },
    },
    noCloseButton: {
      description:
        "`ConfirmModal`에서 닫기(취소) 버튼을 표시할지 여부를 지정합니다.",
      table: { defaultValue: { summary: "false" } },
    },
    buttonType: {
      description: "확인 버튼의 타입을 설정합니다.",
      control: { type: "radio" },
      options: ["active", "alert"],
      table: {
        type: { summary: "active | alert" },
        defaultValue: { summary: "active" },
      },
    },
    title: {
      description: "`ConfirmModal`의 제목을 지정합니다.",
      type: { required: true, name: "string" },
    },
    desc: {
      description: "`ConfirmModal`의 설명 문구를 지정합니다.",
      type: { required: true, name: "string" },
    },
    activeButtonName: {
      description: "`ConfirmModal` 확인 버튼에 표시할 문구를 설정합니다.",
      type: { required: true, name: "string" },
    },
    closeButtonName: {
      description: "`ConfirmModal` 닫기 버튼의 표시할 문구를 설정합니다.",
      table: { defaultValue: { summary: "Cancel" } },
    },
    handleActiveButtonClick: {
      description: "확인 버튼 클릭 시 실행할 함수를 지정합니다.",
      table: { type: { summary: "() => void" } },
    },
    handleClose: {
      description: "닫기 버튼 클릭 시 실행할 함수를 지정합니다.",
      table: { type: { summary: "() => void" } },
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
