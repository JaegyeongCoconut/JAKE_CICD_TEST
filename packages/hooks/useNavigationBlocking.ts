/**
 * NOTE: 노션 url: https://www.notion.so/coconutsilo/useNavigationBlocking-a30093065dcf4045bad99880e759817a?pvs=4
 */
import { useCallback, useEffect, useState } from "react";

import type { Location } from "react-router-dom";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";

import { useCheckIsDirtyStore } from "@repo/stores/checkIsDirty";

import useNavigationBlockingModal from "./modal/useNavigationBlockingModal";

/**
 * @source https://reactrouter.com/en/main/hooks/use-blocker#proceed
 * @source https://1ilsang.dev/posts/js/use-prevet-leave
 */

const useNavigationBlocking = (isDirty: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();

  const setIsDirty = useCheckIsDirtyStore((state) => state.setIsDirty);

  const [destinationLocation, setDestinationLocation] = useState(location);
  const [isConfirmedNavigation, setIsConfirmedNavigation] = useState(false);

  const { handleNavigationBlockingModalOpen } = useNavigationBlockingModal();

  const handleBeforeUnload = (event: Event): void => {
    event.preventDefault();
    event.returnValue = false;
  };

  const handleConfirmNavigation = (): void => {
    setIsConfirmedNavigation(true);
  };

  interface NavigationBlockerParams {
    currentLocation: Location;
    nextLocation: Location;
  }

  const handleNavigationBlock = useCallback(
    ({ currentLocation, nextLocation }: NavigationBlockerParams): boolean => {
      if (!isDirty) return false;

      if (isConfirmedNavigation) return false; //NOTE: 이동허용

      const currentLocationPath = `${currentLocation.pathname}${currentLocation.search}`;
      const nextLocationPath = `${nextLocation.pathname}${nextLocation.search}`;

      if (currentLocationPath !== nextLocationPath) {
        setDestinationLocation(nextLocation);
        handleNavigationBlockingModalOpen(handleConfirmNavigation)();
        return true; //NOTE: 이동차단
      }

      return false;
    },
    [
      isConfirmedNavigation,
      handleConfirmNavigation,
      isDirty,
      handleNavigationBlockingModalOpen,
    ],
  );

  const onPreventLeave = (): void => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  };

  const offPreventLeave = (): void => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };

  useBlocker(isDirty ? handleNavigationBlock : false);

  useEffect(() => {
    setIsDirty(isDirty);

    if (isDirty) onPreventLeave();
    return () => offPreventLeave();
  }, [isDirty]);

  // NOTE: 페이지 이동시 navigationBlocking 끄기
  useEffect(() => {
    return () => {
      setIsDirty(false);
    };
  }, []);

  useEffect(() => {
    if (!isConfirmedNavigation) return;
    else {
      navigate(`${destinationLocation.pathname}${destinationLocation.search}`);
    }
  }, [isConfirmedNavigation, destinationLocation, navigate]);
};

export default useNavigationBlocking;
