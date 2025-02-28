import React, { useState, useEffect } from "react";

import { ErrorIcon, SuccessIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useToast from "@repo/hooks/useToast";
import type { Toast } from "@repo/types";

import * as S from "./ToastItem.styled";

interface ToastItemProps extends Toast {
  id: string;
}

const TRANSITION_DURATION = 1000;
const TOAST_DURATION = 3000;

const ToastItem = ({ type, id, content }: ToastItemProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const [isClosing, setIsClosing] = useState(false);
  const { removeToast } = useToast();

  useEffect(() => {
    const existTimeout = setTimeout(() => {
      setIsClosing(true);
    }, TOAST_DURATION);

    const expireToastTimeout = setTimeout(() => {
      removeToast(id);
    }, TOAST_DURATION + TRANSITION_DURATION);

    return () => {
      clearTimeout(existTimeout);
      clearTimeout(expireToastTimeout);
    };
  }, []);

  return (
    <S.ToastItem isClosing={isClosing}>
      <S.Item data-type={type} toastType={type}>
        <div>{type === "success" ? <SuccessIcon /> : <ErrorIcon />}</div>
        <p>{defaultLanguage(content)}</p>
      </S.Item>
    </S.ToastItem>
  );
};

export default ToastItem;
