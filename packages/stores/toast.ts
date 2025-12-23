import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ToastType } from "@repo/types";

interface ToastState {
  addToast: (toast: Omit<ToastType, "id">) => void;
  deleteToast: (id: string) => void;
  toasts: ToastType[];
}

const useToastStore = create<ToastState>()(
  immer((set) => ({
    toasts: [],
    addToast: (toast): void => {
      const id = uuidv4();

      set((state) => {
        state.toasts.push({ ...toast, id });
      });
    },
    deleteToast: (id): void =>
      set((state) => {
        state.toasts = state.toasts.filter((toast) => toast.id !== id);
      }),
  })),
);

export { useToastStore };
