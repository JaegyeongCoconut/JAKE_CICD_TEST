import type { Languages } from "./language";

export type ToastType<T extends Languages = Languages> = {
  id: string;
  content: T;
  type: "success" | "warning";
};

export type ToastMessage<T extends Languages> = {
  SUCCESS: { [key: string]: { content: T; type: "success" } };
  WARNING: { [key: string]: { content: T; type: "warning" } };
};
