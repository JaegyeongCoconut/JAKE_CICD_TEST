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

  const handleModalClose = useModalStore((state) => state.handleModalClose);

  useKeyTrap(modalElement, handleModalClose);

  return { modalRef };
};

export default useModal;
