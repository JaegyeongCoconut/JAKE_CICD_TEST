import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { LAOS_COUNTRY_DIAL } from "@repo/assets/static/phone";
import { COUNTRY_CODES } from "@repo/constants/countryCode";
import type { Country } from "@repo/types";

import CountryListDropdown from "./CountryListDropdown";

const meta = {
  title: "KOKKOK/Dropdown/CountryListDropdown",
  component: CountryListDropdown,
  parameters: {
    docs: {
      description: {
        component:
          "국가 목록 중 하나를 선택할 수 있는 드롭다운 UI 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
    hasError: false,
    selectedCountry: { code: "", name: "", dial: "" },
    countries: COUNTRY_CODES,
    handleCountryWithCodeSelect: () => {},
  },
  argTypes: {
    className: {
      description: "`CountryListDropdown` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    disabled: {
      description: "`CountryListDropdown` 기능을 비활성화 처리합니다.",
      defaultValue: { summary: "false" },
    },
    hasError: {
      description: "`CountryListDropdown` 에러 스타일 적용 여부를 나타냅니다.",
      defaultValue: { summary: "false" },
    },
    selectedCountry: {
      description: "`CountryListDropdown`에서 선택한 옵션의 값이 노출됩니다.",
      control: false,
      type: {
        required: true,
        name: "object",
        value: {
          code: { name: "string" },
          name: { name: "string" },
          dial: { name: "string" },
        },
      },
      table: {
        type: { summary: "{ code : string, name : string, dial: string }" },
      },
    },
    countries: {
      description: "`CountryListDropdown`에 표시할 옵션 목록입니다.",
      control: false,
      table: {
        type: {
          summary:
            "[key: string]:{ code : string, name : string, dial: string }",
        },
      },
    },
    handleCountryWithCodeSelect: {
      description:
        "`CountryListDropdown`에서 옵션을 선택했을 때 동작하는 handler 함수입니다.",
      control: false,
      type: { required: true, name: "function" },
      table: { type: { summary: " (code: string) => void" } },
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
} satisfies Meta<typeof CountryListDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<Country>({
      code: "LA",
      dial: LAOS_COUNTRY_DIAL,
      name: "Laos",
    });

    const handleSelect = (code: string): void => {
      const selected = COUNTRY_CODES[code as keyof typeof COUNTRY_CODES];
      setSelectedOption(selected);
    };

    return (
      <CountryListDropdown
        {...args}
        selectedCountry={selectedOption}
        handleCountryWithCodeSelect={handleSelect}
      />
    );
  },
};
