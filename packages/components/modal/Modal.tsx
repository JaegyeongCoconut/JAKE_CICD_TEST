import React from "react";

import { useModalStore } from "@repo/stores/modal";

import * as S from "./Modal.styled";
import Portal from "../portal/Portal";

const Modal = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <Portal container="#modal-root" mounted={modals.length > 0}>
      {modals.map((compo, i) => (
        <S.Dim key={i}>{compo}</S.Dim>
      ))}
    </Portal>
  );
};

export default Modal;
