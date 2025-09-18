import type { Meta, StoryObj } from "@storybook/react";

import UploadImageButton from "./UploadImageButton";

const meta = {
  title: "KOKKOK/Button/UploadImageButton",
  component: UploadImageButton,
  parameters: {
    docs: {
      description: {
        component: "이미지를 업로드할 수 있는 버튼 UI 컴포넌트입니다.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isLoading: false,
    isMaxImages: false,
    hasError: false,
    uploadCompletedLabel: "Confirm",
    handleImageChange: () => {},
  },
  argTypes: {
    className: {
      description: "`UploadImageButton` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    isLoading: {
      description:
        "`UploadImageButton` 이미지 업로드 진행 중 상태를 나타냅니다. 만약 로딩 상태라면 spinner 아이콘이 보여집니다.",
    },
    isMaxImages: {
      description: "이미지 업로드 최대 개수에 도달했는지 여부를 나타냅니다.",
    },
    hasError: {
      description: "`UploadImageButton` 에러 스타일 적용 여부를 나타냅니다.",
    },
    uploadCompletedLabel: {
      description: "이미지 업로드가 완료되었을 때 표시할 문구를 설정합니다.",
    },
    handleImageChange: {
      description: "이미지가 선택되었을 때 실행되는 handler 함수입니다.",
    },
  },
} satisfies Meta<typeof UploadImageButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
