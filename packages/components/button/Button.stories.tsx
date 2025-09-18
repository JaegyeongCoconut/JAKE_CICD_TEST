import type React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as PlusIcon } from "@repo/assets/icon/ic_plus.svg";
import * as Icon from "@repo/styles/iconBarrel";

import Button from "./Button";

const iconMapping = Object.entries(Icon).reduce<
  Record<string, React.FC<React.SVGProps<SVGSVGElement>>>
>((acc, [name, SVGIcon]) => {
  acc[name] = SVGIcon;

  return acc;
}, {});

const meta = {
  title: "KOKKOK/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Button의 스타일을 커스텀하기 위해 사용합니다.",
      control: false, // NOTE: control 을 사용하지 않기 위해 false 설정
    },
    variant: {
      description:
        "버튼의 타입을 설정합니다. 아래 속성별 디자인을 확인할 수 있습니다. variant=iconOnly일 때는 label 입력을 받을 수 없습니다.",
    },
    label: {
      description:
        "버튼의 text를 설정합니다. 번역파일에 존재하는 단어만 사용 가능합니다.",
      table: { type: { summary: "string" } }, // NOTE: 어떤 타입을 전달 받는지 명시적으로 작성
      if: { arg: "variant", neq: "iconOnly" },
    },
    isLoading: {
      description:
        "버튼이 로딩 상태인지 나타냅니다. 만약 로딩 상태라면 spinner 아이콘이 보여집니다.",
    },
    disabled: {
      description:
        "버튼을 사용할 수 있는 상태인지 나타냅니다. 만약 disabled 상태라면 마우스 호버시 not-allowed 커서가 보입니다.",
    },
    type: {
      description: "버튼의 type을 정의합니다. 기본 값은 button타입 입니다.",
    },
    Icon: {
      description: "버튼에 svg icon을 추가 할 때 사용합니다.",
      options: Object.keys(Icon),
      mapping: iconMapping,
    },
    handleButtonClick: {
      description: "버튼의 onclick 이벤트에 전달할 handler를 전달합니다.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const Error: Story = {
  args: {
    variant: "error",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const FilledGrayBlue: Story = {
  args: {
    variant: "filled_gray_blue",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const GhostBlue: Story = {
  args: {
    variant: "ghost_blue",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const IconOnly: Story = {
  args: {
    variant: "iconOnly",
    disabled: false,
    Icon: PlusIcon,
    handleButtonClick: () => {},
  },
  argTypes: {
    variant: { control: false },
    isLoading: { control: false },
    Icon: { options: Object.keys(Icon), mapping: iconMapping },
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const Third: Story = {
  args: {
    variant: "third",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { control: false } },
};

export const IconWithVariant: Story = {
  args: {
    variant: "primary",
    label: "Confirm",
    isLoading: false,
    disabled: false,
    handleButtonClick: () => {},
  },
  argTypes: { variant: { if: { arg: "variant", neq: "iconOnly" } } },
};
