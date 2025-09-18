import React from "react";

import { useNavigationBlockingModalStore } from "@repo/stores/navigationBlockingModal";

import * as S from "./ModalPortal.styled";
import Portal from "../portal/Portal";

const NavigationBlockingModalPortal = () => {
  const navigationBlockingModal = useNavigationBlockingModalStore(
    (state) => state.navigationBlockingModal,
  );

  return (
    <Portal
      container="#navigation-blocking-modal-root"
      mounted={!!navigationBlockingModal}
    >
      <S.Dim>{navigationBlockingModal}</S.Dim>
    </Portal>
  );
};

export default NavigationBlockingModalPortal;
