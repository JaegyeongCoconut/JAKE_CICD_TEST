import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { Languages } from "@repo/types";

import DetailModal from "./DetailModal";
import LabelContentTable from "../../label/table/content/LabelContentTable";

const meta = {
  title: "KOKKOK/Modal/DetailModal",
  component: DetailModal,
  parameters: {
    docs: {
      description: {
        component:
          "확인, 생성, 수정, 삭제 등의 동작을 수행할 수 있는 모달창 UI 컴포넌트",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: (
      <LabelContentTable variant="bg">
        <LabelContentTable.Row>
          <LabelContentTable.Content label="Current status" labelWidth={210}>
            <span>On</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content label="Change to" labelWidth={210}>
            <span>Off</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </LabelContentTable>
    ),
    isPosLoading: false,
    isPosDisabled: false,
    isNegDisabled: false,
    negButtonName: "Delete popup",
    posButtonName: "Edit",
    title: "Popup details",
    desc: "(123456-234567-345678)" as Languages,
    posFnType: "button",
    handleClose: () => {},
    handleNegButtonClick: () => {},
    handlePosButtonClick: () => {},
  },
  argTypes: {
    className: {
      description: "`DetailModal` 스타일을 커스텀하기 위해 사용합니다.",
      table: { type: { summary: "string" } },
    },
    children: {
      description: "`DetailModal` 내부에 추가적으로 전달할 정보를 설정합니다.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
      type: { required: true, name: "boolean" },
    },
    posFnType: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작 버튼의 타입을 지정합니다.",
      control: { type: "radio" },
      options: ["button", "submit"],
      table: {
        type: { summary: "button | submit" },
        defaultValue: { summary: "button" },
      },
    },
    isPosLoading: {
      description:
        "API 요청이 진행 중일 때 중복 요청을 방지하기 위해 로딩 상태 여부를 설정합니다.",
      type: { required: true, name: "boolean" },
    },
    isPosDisabled: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼의 활성화 여부를 설정합니다.",
    },
    isNegDisabled: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼의 활성화 여부를 설정합니다.",
    },
    negButtonName: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼에 표시할 문구를 지정합니다.",
    },
    posButtonName: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼에 표시할 문구를 지정합니다.",
    },
    desc: { description: "`DetailModal`의 설명 문구를 지정합니다." },
    title: {
      description: "`DetailModal`의 제목을 지정합니다.",
      type: { required: true, name: "string" },
    },
    handleClose: {
      description: "모달 닫기 버튼 클릭 시 실행되는 함수입니다.",
      table: { type: { summary: "() => void" } },
    },
    handlePosButtonClick: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼 클릭 시 실행되는 함수입니다.",
      table: { type: { summary: "() => void" } },
    },
    handleNegButtonClick: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼 클릭 시 실행되는 함수입니다.",
      table: { type: { summary: "(e: React.MouseEvent) => void" } },
    },
  },
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
