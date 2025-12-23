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
      <LabelContentTable variant="bg" hasDefaultMarginBottom subject={null}>
        <LabelContentTable.Row
          hasError={false}
          hasPartition={false}
          marginTop={0}
        >
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Current status"
            labelWidth={210}
          >
            <span>On</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row
          hasError={false}
          hasPartition={false}
          marginTop={0}
        >
          <LabelContentTable.Content
            hasError={false}
            isRequired={false}
            label="Change to"
            labelWidth={210}
          >
            <span>Off</span>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </LabelContentTable>
    ),
    isPositiveLoading: false,
    isPositiveDisabled: false,
    isNegativeDisabled: false,
    negativeButtonName: "Delete popup",
    positiveButtonName: "Edit",
    title: "Popup details",
    description: "(123456-234567-345678)" as Languages,
    handleClose: () => {},
    handleNegativeButtonClick: () => {},
    handlePositiveButtonClick: () => {},
  },
  argTypes: {
    className: {
      description: "`DetailModal` 스타일을 커스텀하기 위해 사용합니다.",
      table: { type: { summary: "string" } },
    },
    children: {
      description: "`DetailModal` 내부에 추가적으로 전달할 정보를 설정합니다.",
      type: { required: true, name: "other", value: "React.ReactNode" },
      table: { type: { summary: "React.ReactNode" } },
      control: false,
    },
    isPositiveLoading: {
      description:
        "API 요청이 진행 중일 때 중복 요청을 방지하기 위해 로딩 상태 여부를 설정합니다.",
      type: { required: true, name: "boolean" },
      if: { arg: "isPositiveDisabled", neq: true },
    },
    isPositiveDisabled: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼의 활성화 여부를 설정합니다.",
      type: { required: true, name: "boolean" },
    },
    isNegativeDisabled: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼의 활성화 여부를 설정합니다.",
      type: { required: true, name: "boolean" },
    },
    negativeButtonName: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼에 표시할 문구를 지정합니다.",
      type: { required: true, name: "string" },
    },
    positiveButtonName: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼에 표시할 문구를 지정합니다.",
      type: { required: true, name: "string" },
    },
    description: {
      description: "`DetailModal`의 설명 문구를 지정합니다.",
      type: { required: true, name: "string" },
      table: { type: { summary: "string | undefined" } },
    },
    title: {
      description: "`DetailModal`의 제목을 지정합니다.",
      type: { required: true, name: "string" },
    },
    handleClose: {
      description: "모달 닫기 버튼 클릭 시 실행되는 함수입니다.",
      type: { required: true, name: "function" },
      table: { type: { summary: "() => void" } },
      control: false,
    },
    handlePositiveButtonClick: {
      description:
        "확인, 생성, 수정 등의 긍정적 동작을 수행하는 버튼 클릭 시 실행되는 함수입니다.",
      type: { required: true, name: "function" },
      table: { type: { summary: "() => void" } },
      if: { arg: "isPositiveDisabled", neq: true },
      control: false,
    },
    handleNegativeButtonClick: {
      description:
        "취소, 삭제 등의 부정적 동작을 수행하는 버튼 클릭 시 실행되는 함수입니다.",
      type: { required: true, name: "function" },
      table: { type: { summary: "(e: React.MouseEvent) => void" } },
      if: { arg: "isNegativeDisabled", neq: true },
      control: false,
    },
  },
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
