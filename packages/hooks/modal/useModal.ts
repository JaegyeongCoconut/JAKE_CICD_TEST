import type { ReactNode, MouseEvent } from "react";
import { useCallback, useState } from "react";

import { useModalStore } from "@repo/stores/modal";

import useKeyTrap from "./useKeyTrap";

const useModal = () => {
  const [modalElement, setModalElement] = useState<HTMLDialogElement | null>(
    null,
  );

  const modalRef = useCallback((element: HTMLDialogElement | null) => {
    setModalElement(element);
  }, []);

  const handleModalAdd = useModalStore((state) => state.handleModalAdd);
  const handleModalRemove = useModalStore((state) => state.handleModalRemove);
  const handleModalClear = useModalStore((state) => state.handleModalClear);

  const handleModalOpen = useCallback(
    (compo: ReactNode) =>
      (e?: MouseEvent<Element>): void => {
        e?.stopPropagation();
        handleModalAdd(compo);
      },
    [],
  );

  const handleModalClose = (): void => {
    handleModalRemove();
  };

  const handleModalAllClose = useCallback((): void => {
    handleModalClear();
  }, []);

  useKeyTrap(modalElement, handleModalClose);

  return {
    modalRef,
    handleModalOpen,
    handleModalClose,
    handleModalAllClose,
  };
};

export default useModal;
