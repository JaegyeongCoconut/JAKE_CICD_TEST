import { useEffect, useState } from "react";

import useToast from "@repo/hooks/useToast";

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
  const [isClosing, setIsClosing] = useState(false);
  const { removeToast } = useToast();

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
