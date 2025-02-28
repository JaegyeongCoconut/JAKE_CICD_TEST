import React from "react";

import { WhatsappImg } from "@repo/assets/image";

import * as S from "./WhatsappConnectButton.styled";

interface WhatsappConnectButtonProps {
  mobile: string;
  callbackFunction?: () => void;
}

const WhatsappConnectButton = ({
  mobile,
  callbackFunction,
}: WhatsappConnectButtonProps) => {
  const handleWhatsappConnect =
    (mobile: string) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      callbackFunction && callbackFunction();

      window.open(`whatsapp://send?phone=${mobile}`);
    };

  return (
    <S.Button type="button" onClick={handleWhatsappConnect(mobile)}>
      <S.WhatsappImg src={WhatsappImg} alt="whatsapp icon" />
    </S.Button>
  );
};

export default WhatsappConnectButton;
