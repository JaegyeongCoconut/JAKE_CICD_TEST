import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ToastType } from "@repo/types";

interface ToastState {
  toasts: ToastType[];
  onDeleteToast: (id: string) => void;
  onPushToast: (toast: ToastType) => void;
}

const useToastStore = create<ToastState>()(
  immer((set) => ({
    toasts: [],
    onPushToast: (toast): void =>
      set((state) => {
        state.toasts.push(toast);
      }),
    onDeleteToast: (id): void =>
      set((state) => {
        state.toasts = state.toasts.filter((toast) => toast.id !== id);
      }),
  })),
);

export { useToastStore };
