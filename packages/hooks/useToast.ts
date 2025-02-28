import { v4 as uuidv4 } from "uuid";

import { useToastStore } from "@repo/stores/toast";
import type { Toast } from "@repo/types";

const useToast = () => {
  const pushToast = useToastStore((state) => state.pushToast);
  const deleteToast = useToastStore((state) => state.deleteToast);

  const addToast = (toast: Omit<Toast, "id">): void => {
    const id = uuidv4();

    pushToast({ id, ...toast });
  };

  const removeToast = (id: string): void => {
    deleteToast(id);
  };

  return { addToast, removeToast };
};

export default useToast;
