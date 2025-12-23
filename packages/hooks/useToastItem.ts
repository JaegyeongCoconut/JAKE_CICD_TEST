import { useEffect, useState } from "react";

import { useToastStore } from "@repo/stores/toast";

interface useToastItemProps {
  id: string;
  toastDuration: number;
  transitionDuration: number;
}

const useToastItem = ({
  id,
  toastDuration,
  transitionDuration,
}: useToastItemProps) => {
  const removeToast = useToastStore((state) => state.deleteToast);

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const existTimeout = setTimeout(() => {
      setIsClosing(true);
    }, toastDuration);

    const expireToastTimeout = setTimeout(() => {
      removeToast(id);
    }, toastDuration + transitionDuration);

    return () => {
      clearTimeout(existTimeout);
      clearTimeout(expireToastTimeout);
    };
  }, []);

  return { isClosing };
};

export default useToastItem;
