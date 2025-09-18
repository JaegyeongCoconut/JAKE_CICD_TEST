import type { MouseEvent } from "react";
import React, { useCallback, useState } from "react";

import { useCheckIsDirtyStore } from "@repo/stores/checkIsDirty";
import { useNavigationBlockingModalStore } from "@repo/stores/navigationBlockingModal";

import useKeyTrap from "./useKeyTrap";
import NavigationBlockingModal from "../../components/modal/navigationBlocking/NavigationBlockingModal";

const useNavigationBlockingModal = () => {
  const [navigationBlockingModalElement, setNavigationBlockingModalElement] =
    useState<HTMLDialogElement | null>(null);

  const navigationBlockingModalRef = useCallback(
    (element: HTMLDialogElement | null) => {
      setNavigationBlockingModalElement(element);
    },
    [],
  );

  const openNavigationBlockingModal = useNavigationBlockingModalStore(
    (state) => state.handleNavigationBlockingModalAdd,
  );
  const closeNavigationBlockingModal = useNavigationBlockingModalStore(
    (state) => state.handleNavigationBlockingModalRemove,
  );
  const isDirty = useCheckIsDirtyStore((state) => state.isDirty);

  const handleNavigationBlockingModalOpen = useCallback(
    (callbackFn: () => void) =>
      (e?: MouseEvent<Element>): void => {
        if (!isDirty) {
          callbackFn();
          return;
        }

        e?.stopPropagation();

        openNavigationBlockingModal(
          <NavigationBlockingModal callbackFn={callbackFn} />,
        );
      },
    [isDirty, openNavigationBlockingModal],
  );

  const handleNavigationBlockingModalClose = (): void => {
    closeNavigationBlockingModal();
  };

  useKeyTrap(
    navigationBlockingModalElement,
    handleNavigationBlockingModalClose,
  );

  return {
    navigationBlockingModalRef,
    handleNavigationBlockingModalOpen,
    handleNavigationBlockingModalClose,
  };
};

export default useNavigationBlockingModal;
