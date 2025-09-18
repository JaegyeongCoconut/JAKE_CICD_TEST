import type { FC, SVGProps } from "react";
import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import useQueryInitFilterHooks from "@repo/hooks/queryFilter/useQueryInitFilterHooks";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
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
  useNavigate(); // IMPORTANT: useNavigate()를 호출하지만 반환값은 사용하지 않습니다. 이 훅은 반드시 이 컴포넌트 내에서 호출되어야 하며, 그 이유는 라이브러리 내부의 상태 공유로 인해 Navbar의 선택된 색상이 유지되기 때문입니다.

  const { defaultLanguage } = useDefaultLanguage();

  const { isInitQueryFilter, setIsInitQueryFilter } = useQueryInitFilterHooks();

  const handleNavLinkClick = () => {
    if (isInitQueryFilter) return;

    setIsInitQueryFilter(true);
  };

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
            <li key={paths[0]}>
              <NavLink
                css={S.link({ content: defaultLanguage(content), isActive })}
                to={paths[0]}
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
