import type { FC, SVGProps } from "react";
import React from "react";

import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useQueryFilterStore } from "@repo/stores/queryFilter";
import type { InaccessInfo, Languages } from "@repo/types";

import * as S from "./Navbar.styled";

interface NavbarProps {
  inaccessInfo?: InaccessInfo;
  level?: string | number;
  navs: {
    content: Languages;
    Icon: FC<SVGProps<SVGSVGElement>>;
    path: string | string[];
  }[];
}

const Navbar = ({ navs, level, inaccessInfo }: NavbarProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const checkAccessDenied = (path: string): boolean => {
    if (inaccessInfo && level)
      return inaccessInfo[level].path.includes(`/${path}`);

    return false;
  };

  return (
    <S.Navbar>
      <ul>
        {navs.map(({ path, Icon, content }) => {
          const paths = Array.isArray(path) ? path : [path];
          const isActive = paths.some((rawPath) =>
            location.pathname.startsWith(`/${rawPath}`),
          );

          if (paths.some(checkAccessDenied)) return null;

          return (
            <NavItem
              key={`${content}-${i18n.language}`}
              isActive={isActive}
              content={content}
              Icon={Icon}
              path={paths[0]}
            />
          );
        })}
      </ul>
    </S.Navbar>
  );
};

export default Navbar;

interface NavItemProps {
  isActive: boolean;
  content: Languages;
  Icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
}

const NavItem = React.memo(
  ({ isActive, content, Icon, path }: NavItemProps) => {
    const isInitQueryFilter = useQueryFilterStore(
      (state) => state.isInitQueryFilter,
    );
    const setIsInitQueryFilter = useQueryFilterStore(
      (state) => state.setIsInitQueryFilter,
    );

    const { defaultLanguage } = useDefaultLanguage();

    const handleNavLinkClick = () => {
      if (isInitQueryFilter) return;

      setIsInitQueryFilter(true);
    };

    return (
      <li>
        <NavLink
          css={S.link({
            content: defaultLanguage({ text: content }),
            isActive,
          })}
          to={path}
          onClick={handleNavLinkClick}
        >
          <Icon />
        </NavLink>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isActive === nextProps.isActive;
  },
);

NavItem.displayName = "NavItem";
