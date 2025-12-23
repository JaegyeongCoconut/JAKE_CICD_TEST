import React from "react";

import { useToastStore } from "@repo/stores/toast";
import type { Languages, ToastType } from "@repo/types";

interface HeadlessToastProps<T extends Languages> {
  className?: string;
  ToastItem: React.FC<ToastType<T>>;
}

const HeadlessToast = <T extends Languages>({
  className,
  ToastItem,
}: HeadlessToastProps<T>) => {
  const toasts = useToastStore((state) => state.toasts) as ToastType<T>[];

  return (
    <div className={className}>
      {toasts.map(({ id, content, type }) => (
        <ToastItem key={id} id={id} content={content} type={type} />
      ))}
    </div>
  );
};

export default HeadlessToast;
