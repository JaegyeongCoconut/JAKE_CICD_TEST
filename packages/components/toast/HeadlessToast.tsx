import React from "react";

import { useToastStore } from "@repo/stores/toast";
import type { ToastType } from "@repo/types";

interface HeadlessToastProps {
  className?: string;
  ToastItem: React.FC<ToastType>;
}

const HeadlessToast = ({ className, ToastItem }: HeadlessToastProps) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={className}>
      {toasts.map(({ id, content, type }) => (
        <ToastItem key={id} id={id} content={content} type={type} />
      ))}
    </div>
  );
};

export default HeadlessToast;
