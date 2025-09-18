import React from "react";

import HeadlessToast from "./HeadlessToast";
import * as S from "./Toast.styled";
import ToastItem from "./item/ToastItem";

const Toast = () => {
  return <HeadlessToast css={S.toast} ToastItem={ToastItem} />;
};

export default Toast;
