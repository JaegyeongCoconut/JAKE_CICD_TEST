import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import useNavigationBlockingModal from "@repo/hooks/modal/useNavigationBlockingModal";

import { LeftArrowIcon, LogoutIcon } from "~assets";
import { useLogout } from "~services";
import type { CarInspectionLanguages } from "~types";

import * as S from "./Header.styled";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <S.Header>{children}</S.Header>;
};

interface HeaderBackLinkButton {
  to: string;
}

Header.BackLinkButton = function BackLinkButton({ to }: HeaderBackLinkButton) {
  return (
    <Link to={to}>
      <LeftArrowIcon css={S.icon} />
    </Link>
  );
};

interface HeaderTitleProps {
  title: CarInspectionLanguages;
}

Header.Title = function Title({ title }: HeaderTitleProps) {
  const { t } = useTranslation();

  return (
    <S.TitleContainer>
      <S.Title>{t(title)}</S.Title>
    </S.TitleContainer>
  );
};

Header.LogoutButton = function LogoutButton() {
  const { mutate: logoutMutate } = useLogout();

  const { handleNavigationBlockingModalOpen } = useNavigationBlockingModal();

  const handleLogout = (): void => {
    handleNavigationBlockingModalOpen(logoutMutate)();
  };

  return (
    <button type="button" onClick={handleLogout}>
      <LogoutIcon css={S.icon} />
    </button>
  );
};

export default Header;
