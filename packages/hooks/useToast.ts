import { v4 as uuidv4 } from "uuid";

import { useToastStore } from "@repo/stores/toast";
import type { ToastType } from "@repo/types";

const useToast = () => {
  const pushToast = useToastStore((state) => state.onPushToast);
  const deleteToast = useToastStore((state) => state.onDeleteToast);

  const addToast = (toast: Omit<ToastType, "id">): void => {
    const id = uuidv4();

    pushToast({ id, ...toast });
  };

  const removeToast = (id: string): void => {
    deleteToast(id);
  };

  return { addToast, removeToast };
};

export default useToast;
