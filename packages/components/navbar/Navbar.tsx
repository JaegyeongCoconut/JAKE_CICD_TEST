import React, { FC, SVGProps } from "react";

import { NavLink } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useFilterStore } from "@repo/stores/filter";
import type { InaccessInfo, Languages } from "@repo/types";

import * as S from "./Navbar.styled";

interface NavbarProps {
  navs: {
    path: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    content: Languages;
  }[];
  level?: string | number;
  inaccessInfo?: InaccessInfo;
}

const Navbar = ({ navs, level, inaccessInfo }: NavbarProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const isInitFilter = useFilterStore((state) => state.isInitFilter);
  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);

  const handleNavLinkClick = () => {
    if (isInitFilter) return;

    setIsInitFilter(true);
  };

  const checkAccessDenied = (path: string): boolean => {
    if (inaccessInfo && level) return inaccessInfo[level].path.includes(path);

    return false;
  };

  return (
    <S.Navbar>
      <ul>
        {navs.map(({ path, Icon, content }) => {
          const isAccessDenied = checkAccessDenied
            ? checkAccessDenied(path)
            : false;

          if (isAccessDenied) return null;

          return (
            <li key={path}>
              <NavLink
                css={S.link(defaultLanguage(content))}
                to={path}
                onClick={handleNavLinkClick}
              >
                <Icon />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </S.Navbar>
  );
};

export default Navbar;
