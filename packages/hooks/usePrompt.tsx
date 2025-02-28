/**
 * NOTE: 노션 url: https://www.notion.so/coconutsilo/usePrompt-a30093065dcf4045bad99880e759817a?pvs=4
 */
import React, { useCallback, useEffect, useState } from "react";

import {
  Location,
  useBlocker,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { usePromptStore } from "@repo/stores/prompt";

import useModal from "./modal/useModal";
import PromptModal from "../components/modal/prompt/PromptModal";

/**
 * @source https://reactrouter.com/en/main/hooks/use-blocker#proceed
 * @source https://1ilsang.dev/posts/js/use-prevet-leave
 */

const usePrompt = (when: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();

  const setIsOpen = usePromptStore((state) => state.setIsOpen);
  const isOpen = usePromptStore((state) => state.isOpen);

  const [destinationLocation, setDestinationLocation] = useState(location);
  const [isConfirmedNavigation, setIsConfirmedNavigation] = useState(false);

  const { handleModalOpen, handleModalClose, modalRef } = useModal();

  const handleBeforeUnload = (event: Event) => {
    event.preventDefault();
    event.returnValue = false;
  };

  const handlePopstate = () => {
    handleModalOpen(
      <PromptModal ref={modalRef} callbackFn={handleConfirmNavigation} />,
    )();
  };

  const handleConfirmNavigation = useCallback(() => {
    setIsConfirmedNavigation(true);
    handleModalClose();
  }, []);

  interface NavigationBlockerParams {
    currentLocation: Location;
    nextLocation: Location;
  }

  const handleNavigationBlock = useCallback(
    ({ currentLocation, nextLocation }: NavigationBlockerParams) => {
      if (isConfirmedNavigation) return false; //NOTE: 이동허용

      const currentLocationPath = `${currentLocation.pathname}${currentLocation.search}`;
      const nextLocationPath = `${nextLocation.pathname}${nextLocation.search}`;

      if (isOpen && currentLocationPath !== nextLocationPath) {
        setDestinationLocation(nextLocation);
        handlePopstate();
        return true; //NOTE: 이동차단
      }

      return false;
    },
    [isConfirmedNavigation, handlePopstate, when],
  );

  useBlocker(handleNavigationBlock);

  const onPreventLeave = () => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  };

  const offPreventLeave = () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };

  useEffect(() => {
    setIsOpen(when);

    if (when) onPreventLeave();
    return () => offPreventLeave();
  }, [when]);

  // NOTE: 페이지 이동시 prompt 끄기
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  useEffect(() => {
    if (!isConfirmedNavigation) return;
    else {
      navigate(`${destinationLocation.pathname}${destinationLocation.search}`);
    }
  }, [isConfirmedNavigation, destinationLocation, navigate]);
};

export default usePrompt;
