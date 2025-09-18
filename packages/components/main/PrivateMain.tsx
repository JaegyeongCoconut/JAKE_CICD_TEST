import React from "react";

import * as S from "./PrivateMain.styled";

interface PrivateMainProps {
  className?: string;
  navWidth: string;
  children: React.ReactNode;
}

const PrivateMain = ({ children, className, navWidth }: PrivateMainProps) => {
  return (
    <S.PrivateMain className={className} navWidth={navWidth}>
      {children}
    </S.PrivateMain>
  );
};

export default PrivateMain;
