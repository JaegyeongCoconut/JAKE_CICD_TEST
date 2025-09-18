import type { RefObject } from "react";
import { useEffect } from "react";

interface UseOnClickOutSideProps<T extends HTMLElement> {
  ref: RefObject<T>;
  exceptEl: HTMLElement | null | undefined;
  handler: () => void;
}

const useOnClickOutside = <T extends HTMLElement>({
  ref,
  handler,
  exceptEl,
}: UseOnClickOutSideProps<T>) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref?.current;
      const isIncludeEl = !el || el.contains(e?.target as HTMLElement);
      const isIncludeExceptEl =
        exceptEl && exceptEl?.contains(e?.target as HTMLElement);

      if (isIncludeEl || isIncludeExceptEl) return;
      handler();
    };

    window.addEventListener("mousedown", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
    };
  }, [handler]);
};

export default useOnClickOutside;
