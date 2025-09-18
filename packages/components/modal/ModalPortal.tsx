import React from "react";

import { useModalStore } from "@repo/stores/modal";

import * as S from "./ModalPortal.styled";
import Portal from "../portal/Portal";

const ModalPortal = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <Portal container="#modal-root" mounted={modals.length > 0}>
      {modals.map((compo, i) => (
        <S.Dim key={i}>{compo}</S.Dim>
      ))}
    </Portal>
  );
};

export default ModalPortal;
