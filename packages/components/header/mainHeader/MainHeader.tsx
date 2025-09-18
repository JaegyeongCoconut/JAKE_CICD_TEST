import React from "react";

import { ReactComponent as GlobalIcon } from "@repo/assets/icon/ic_global.svg";
import { ReactComponent as PolygonDownIcon } from "@repo/assets/icon/ic_polygon_down.svg";
import { ReactComponent as RankIcon } from "@repo/assets/icon/ic_rank.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
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
  handleLogout: () => void;
  children?: React.ReactNode;
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
          label={LANGUAGE_LABEL.SIGN_OUT}
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
      <GlobalIcon css={S.translateIcon} />
      <Dropdown
        css={S.dropdown}
        Icon={PolygonDownIcon}
        options={options}
        selectedOption={selectedOption}
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
      href={href}
      variant="alert_gray"
    >
      <RankIcon />
      {defaultLanguage(LANGUAGE_LABEL.RANK)}
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
