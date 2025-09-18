import React from "react";

import type { jsx } from "@emotion/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as LogoCarAdminIcon } from "@repo/assets/icon/ic_logo_car_admin.svg";
import { ReactComponent as LogoHeroRankingIcon } from "@repo/assets/icon/ic_logo_hero_ranking.svg";
import { LANGUAGE_DROPDOWNS } from "@repo/assets/static/dropdown";
import useDropdownValue from "@repo/hooks/dropdown/useDropdownValue";

import MainHeader from "./MainHeader";

const iconMapping = {
  LogoCarAdminIcon: <LogoCarAdminIcon />,
  LogoRankingIcon: <LogoHeroRankingIcon />,
} satisfies Record<string, jsx.JSX.Element>;

const meta = {
  title: "KOKKOK/Header/MainHeader",
  component: MainHeader,
  parameters: {
    docs: {
      description: { component: "페이지 최상위의 컨트롤 UI를 제공합니다." },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { iconWidth: "100px", icon: <LogoCarAdminIcon /> },
  argTypes: {
    className: {
      control: false,
      description: "MainHeader 스타일을 커스텀하기 위해 사용합니다.",
    },
    icon: {
      description: "MainHeader에 들어갈 로고 아이콘입니다.",
      control: { type: "select" },
      options: Object.keys(iconMapping),
      mapping: iconMapping,
    },
    iconWidth: {
      description: "MainHeader에 들어갈 로고 아이콘의 크기를 결정합니다.",
    },
    handleLogout: {
      description: "MainHeader에서 로그아웃 버튼의 handler를 전달합니다.",
    },
    children: {
      description:
        "MainHeader의 요소 LanguageDropdown, RankingLinkButton, UserInfoLabel을 받습니다.",
      control: false,
    },
  },
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof MainHeader>;

export const Default: Story = {
  render: (args) => {
    const { selectedOption, handleSelect } = useDropdownValue({
      options: LANGUAGE_DROPDOWNS,
      initKey: "en",
    });

    return (
      <div
        style={{
          width: "50vw",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainHeader {...args} handleLogout={() => alert("Sign out")}>
          <MainHeader.UserInfoLabel
            branchName="Branch"
            managerPosition="Operation manager"
          />
          <MainHeader.LanguageDropdown
            options={LANGUAGE_DROPDOWNS}
            selectedOption={selectedOption}
            handleSelect={handleSelect}
          />
          <MainHeader.RankingLinkButton href="https://example.com" />
        </MainHeader>
      </div>
    );
  },
};
