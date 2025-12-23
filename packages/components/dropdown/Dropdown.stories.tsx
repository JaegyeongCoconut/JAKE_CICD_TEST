import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { ReactComponent as PolygonDownIcon } from "@repo/assets/icon/ic_polygon_down.svg";
import type { DropdownOptionType, Languages } from "@repo/types";

import Dropdown from "./Dropdown";

// DESC: 타입 강제 지정 Dropdown의 타입이 union이라 storybook 에서 args를 never로 추론됨
interface StoryDropdownProps {
  className?: string;
  disabled: boolean;
  hasError: boolean;
  isLoading: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  options: readonly DropdownOptionType<Languages>[];
  placeholder: Languages;
  selectedOption: DropdownOptionType<Languages>;
  handleSelect: (value: string) => void;
}

const dropdownOptions = [
  { key: "KIA", label: "KIA" as Languages },
  { key: "HYUNDAI", label: "HYUNDAI" as Languages },
  { key: "NETA", label: "NETA" as Languages },
  { key: "TERACO", label: "TERACO" as Languages },
  { key: "DAEHAN", label: "DAEHAN" as Languages },
];

const meta = {
  title: "KOKKOK/Dropdown",
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          "사용자가 옵션을 선택할 수 있도록 도와주는 드롭다운 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    isLoading: false,
    disabled: false,
    hasError: false,
    options: dropdownOptions,
    Icon: DownIcon,
    placeholder: "Select an option" as Languages,
    selectedOption: { key: "", label: "" as Languages },
    handleSelect: () => {},
  },
  argTypes: {
    className: {
      description: "`Dropdown` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    isLoading: {
      description:
        "`Dropdown` 옵션 로딩 상태를 나타냅니다. 로딩 중에는 스켈레톤이 표시됩니다.",
      type: { required: true, name: "boolean" },
      if: { arg: "disabled", neq: true },
    },
    disabled: { description: "`Dropdown` 기능을 비활성화 처리합니다." },
    hasError: {
      description: "`Dropdown` 에러 스타일 적용 여부를 나타냅니다.",
      type: { required: true, name: "boolean" },
      if: { arg: "disabled", neq: true },
    },
    selectedOption: {
      description: "`Dropdown`에서 선택한 옵션의 값이 노출됩니다.",
      type: {
        required: true,
        name: "object",
        value: { key: { name: "string" }, label: { name: "string" } },
      },
      table: { type: { summary: "{ key : string, label : string }" } },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    Icon: {
      description: "`Dropdown` 아이콘 설정합니다. ",
      table: { type: { summary: "FC<SVGProps<SVGSVGElement>>" } },
      options: ["DownIcon", "PolygonDownIcon"],
      mapping: { DownIcon, PolygonDownIcon },
      defaultValue: { summary: "DownIcon" },
    },
    options: {
      description: "`Dropdown`에 표시할 옵션 목록입니다.",
      type: {
        required: true,
        name: "array",
        value: {
          name: "object",
          value: { key: { name: "string" }, label: { name: "string" } },
        },
      },
      table: { type: { summary: "{ key : string, label : string }[]" } },
      control: false,
      if: { arg: "disabled", neq: true },
    },
    placeholder: {
      description:
        "`Dropdown`에서 선택된 옵션이 없을 때 표시되는 placeholder입니다.",
      type: { required: true, name: "string" },
      table: { type: { summary: "string" } },
    },
    handleSelect: {
      description:
        "`Dropdown`에서 옵션을 선택했을 때 동작하는 handler 함수입니다.",
      type: { required: true, name: "function" },
      control: false,
      if: { arg: "disabled", neq: true },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "300px" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<StoryDropdownProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<
      DropdownOptionType<Languages>
    >({ key: "", label: "" as Languages });

    const handleSelect = (findKey: string): void => {
      const selected = dropdownOptions.find((item) => item.key === findKey);
      if (selected) setSelectedOption(selected);
    };

    return (
      <Dropdown
        {...args}
        selectedOption={selectedOption}
        handleSelect={handleSelect}
      />
    );
  },
};
