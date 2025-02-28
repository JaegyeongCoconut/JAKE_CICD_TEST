import React from "react";

import { useToastStore } from "@repo/stores/toast";

import * as S from "./Toast.styled";
import ToastItem from "./item/ToastItem";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <S.Toast>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </S.Toast>
  );
};

export default Toast;
