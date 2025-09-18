import React from "react";

import { ReactComponent as CheckCircleIcon } from "@repo/assets/icon/ic_check_circle.svg";
import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useToastItem from "@repo/hooks/useToastItem";
import type { ToastType } from "@repo/types";

import * as S from "./ToastItem.styled";

interface ToastItemProps extends ToastType {}

const TRANSITION_DURATION = 1000;
const TOAST_DURATION = 3000;

const ToastItem = ({ type, id, content }: ToastItemProps) => {
  const { defaultLanguage } = useDefaultLanguage();
  const { isClosing } = useToastItem({
    id,
    toastDuration: TOAST_DURATION,
    transitionDuration: TRANSITION_DURATION,
  });

  return (
    <S.ToastItem isClosing={isClosing}>
      <S.Item data-type={type} toastType={type}>
        <div>{type === "success" ? <CheckCircleIcon /> : <WarningIcon />}</div>
        <p>{defaultLanguage(content)}</p>
      </S.Item>
    </S.ToastItem>
  );
};

export default ToastItem;
