import React, { useRef, useCallback } from "react";

import { useModalStore } from "@repo/stores/modal";

import useKeyTrap from "./useKeyTrap";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const modals = useModalStore((state) => state.modals);
  const addModal = useModalStore((state) => state.addModal);
  const removeModal = useModalStore((state) => state.removeModal);
  const clearModals = useModalStore((state) => state.clearModals);

  const openModalComponent = useCallback((compo: React.ReactNode): void => {
    document.body.style.cssText = "overflow-y: hidden";
    addModal(compo);
  }, []);

  const handleModalOpen = useCallback(
    (compo: React.ReactNode) =>
      (e?: React.MouseEvent): void => {
        e?.stopPropagation();
        openModalComponent(compo);
      },
    [],
  );

  const handleModalClose = (): void => {
    removeModal();

    if (modals.length <= 1) {
      document.body.style.cssText = "overflow: auto";
    }
  };

  const handleModalAllClose = useCallback((): void => {
    clearModals();
    document.body.style.cssText = "overflow: auto";
  }, []);

  useKeyTrap(modalRef, handleModalClose);

  return {
    modalRef,
    handleModalOpen,
    handleModalClose,
    handleModalAllClose,
  };
};

export default useModal;
