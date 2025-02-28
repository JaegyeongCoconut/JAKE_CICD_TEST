import React from "react";

import { RankIcon, TranslateIcon, TriangleIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { DropdownOptionType, Languages } from "@repo/types";

import * as S from "./MainHeader.styled";
import GhostButton from "../../button/ghost/GhostButton";
import ExternalLinkButton from "../../button/link/externalLinkButton/ExternalLinkButton";
import Dropdown from "../../dropdown/Dropdown";

interface MainHeaderProps {
  className?: string;
  icon: React.ReactNode;
  iconWidth: string;
  children?: React.ReactNode;
  handleLogout: () => void;
}

const MainHeader = ({
  className,
  icon,
  iconWidth,
  children,
  handleLogout,
}: MainHeaderProps) => {
  return (
    <S.MainHeader className={className} iconWidth={iconWidth}>
      {icon}
      <S.ControlWrapper>
        {children}
        <GhostButton
          css={S.logoutButton}
          variant="ghost"
          label="Sign out"
          handleButtonClick={handleLogout}
        />
      </S.ControlWrapper>
    </S.MainHeader>
  );
};

interface LanguageDropdownProps {
  options: readonly DropdownOptionType<Languages>[];
  selectedOption: DropdownOptionType<Languages>;
  handleSelect: (value: string) => void;
}

MainHeader.LanguageDropdown = function LanguageDropdown({
  options,
  selectedOption,
  handleSelect,
}: LanguageDropdownProps) {
  return (
    <S.LanguageWrapper>
      <TranslateIcon css={S.translateIcon} />
      <Dropdown
        css={S.dropdown}
        options={options}
        selectedOption={selectedOption}
        Icon={TriangleIcon}
        handleSelect={handleSelect}
      />
    </S.LanguageWrapper>
  );
};

interface RankingLinkButtonProps {
  href: string;
}

MainHeader.RankingLinkButton = function RankingLinkButton({
  href,
}: RankingLinkButtonProps) {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <ExternalLinkButton
      css={S.externalLinkButton}
      variant="alert_gray"
      href={href}
    >
      <RankIcon />
      {defaultLanguage("Rank")}
    </ExternalLinkButton>
  );
};

interface UserInfoLabelProps {
  branchName: Languages;
  managerPosition: Languages;
}

MainHeader.UserInfoLabel = function UserInfoLabel({
  branchName,
  managerPosition,
}: UserInfoLabelProps) {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.UserInfoLabel>{`${defaultLanguage(branchName)} ・ ${defaultLanguage(
      managerPosition,
    )}`}</S.UserInfoLabel>
  );
};

export default MainHeader;
