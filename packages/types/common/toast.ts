import type { Languages } from "./language";

export interface Toast {
  id: string;
  type?: "success" | "warning";
  content: Languages;
}
