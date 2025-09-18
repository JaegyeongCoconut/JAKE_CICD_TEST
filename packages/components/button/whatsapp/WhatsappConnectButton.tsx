import React from "react";

import { ReactComponent as WhatsappIcon } from "@repo/assets/icon/ic_whatsapp.svg";

import * as S from "./WhatsappConnectButton.styled";

interface WhatsappConnectButtonProps {
  className?: string;
  mobile: string;
}

const WhatsappConnectButton = ({
  className,
  mobile,
}: WhatsappConnectButtonProps) => {
  const handleWhatsappConnect =
    (mobile: string) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();

      window.open(`https://wa.me/${mobile}`);
    };

  return (
    <S.Button
      className={className}
      type="button"
      onClick={handleWhatsappConnect(mobile)}
    >
      <WhatsappIcon css={S.whatAppIcon} />
    </S.Button>
  );
};

export default WhatsappConnectButton;
