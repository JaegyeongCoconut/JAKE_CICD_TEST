import React from "react";

import * as S from "./PrivateMain.styled";

interface PrivateMainProps {
  children: React.ReactNode;
  className?: string;
  width: string;
}

const PrivateMain = ({ children, className, width }: PrivateMainProps) => {
  return (
    <S.PrivateMain className={className} width={width}>
      {children}
    </S.PrivateMain>
  );
};

export default PrivateMain;
