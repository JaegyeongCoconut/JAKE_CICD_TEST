import { useCallback, useEffect } from "react";

const useKeyTrap = (element: HTMLElement | null, handleClose: () => void) => {
  const handleKeyTrap = useCallback(
    (e: KeyboardEvent): void => {
      if (!element) return;

      const focusableNodeList = element.querySelectorAll(
        "[href], [tabIndex], button, input:not([disabled]), textarea, select",
      );

      const firstFocusableNode = focusableNodeList[0] as HTMLElement;
      const lastFocusableNode = focusableNodeList[
        focusableNodeList.length - 1
      ] as HTMLElement;
      const isFirstFocusableNode = Object.is(e.target, firstFocusableNode);
      const isLastFocusableNode = Object.is(e.target, lastFocusableNode);

      if (e.shiftKey && element !== e.target) {
        lastFocusableNode.focus();

        return;
      }

      if (e.shiftKey && isFirstFocusableNode) {
        e.preventDefault();
        lastFocusableNode.focus();

        return;
      }

      if (!e.shiftKey && isLastFocusableNode) {
        e.preventDefault();
        firstFocusableNode.focus();

        return;
      }
    },
    [element],
  );

  useEffect(() => {
    if (!element) return;
    element.focus();

    const keyListenerMap = new Map([
      ["Escape", handleClose],
      ["Tab", handleKeyTrap],
    ]);

    const handleKeyListener = (e: KeyboardEvent): void => {
      const listener = keyListenerMap.get(e.key);
      typeof listener === "function" && listener(e);
    };

    window.addEventListener("keydown", handleKeyListener);

    return () => {
      window.removeEventListener("keydown", handleKeyListener);
    };
  }, [element, handleClose, handleKeyTrap]);
};

export default useKeyTrap;
