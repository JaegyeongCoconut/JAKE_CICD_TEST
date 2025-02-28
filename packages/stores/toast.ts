import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Toast } from "@repo/types";

interface ToastState {
  toasts: Toast[];
  pushToast: (toast: Toast) => void;
  deleteToast: (id: string) => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastState>()(
  immer((set) => ({
    toasts: [],
    pushToast: (toast): void =>
      set((state) => {
        state.toasts.push(toast);
      }),
    deleteToast: (id): void =>
      set((state) => {
        state.toasts = state.toasts.filter((toast) => toast.id !== id);
      }),
    clearToasts: (): void =>
      set((state) => {
        state.toasts = [];
      }),
  })),
);

export { useToastStore };
