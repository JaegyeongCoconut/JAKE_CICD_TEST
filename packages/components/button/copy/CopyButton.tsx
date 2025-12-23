import React from "react";

import { ReactComponent as CopyIcon } from "@repo/assets/icon/ic_copy.svg";
import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import { useToastStore } from "@repo/stores/toast";

import * as S from "./CopyButton.styled";
import Button from "../Button";

const serviceType = {
  CAR: "car",
  KOKKOK_SUPPORT: "kokkok_support",
  KOKKOK_FOOD: "kokkok_food",
  KOKKOK_MART: "kokkok_mart",
  MOVE: "move",
  PASSWORD: "password",
} as const;

interface CopyButtonProps {
  className?: string;
  copyText: string;
  serviceType: (typeof serviceType)[keyof typeof serviceType];
}

const CopyButton = ({ className, copyText, serviceType }: CopyButtonProps) => {
  const addToast = useToastStore((state) => state.addToast);

  const handleTextCopy =
    (copyText: string) =>
    async (e: React.MouseEvent): Promise<void> => {
      e.stopPropagation();

      try {
        await navigator.clipboard.writeText(copyText);
        switch (serviceType) {
          case "car":
          case "move":
          case "kokkok_food":
          case "kokkok_mart":
            addToast(COMMON_TOAST_MESSAGE.SUCCESS.COPY_MOBILE);
            break;
          case "kokkok_support":
            addToast(COMMON_TOAST_MESSAGE.SUCCESS.COPY_LINK);
            break;
          case "password":
            addToast(COMMON_TOAST_MESSAGE.SUCCESS.PASSWORD_COPIED);
            break;
        }
      } catch {
        if (serviceType === "car" || serviceType == "move") {
          addToast(COMMON_TOAST_MESSAGE.WARNING.COPY_DRIVER_MOBILE_FAIL);
        }
      }
    };

  return (
    <Button
      css={S.copyButton}
      className={className}
      variant="iconOnly"
      disabled={false}
      Icon={CopyIcon}
      handleButtonClick={handleTextCopy(copyText)}
    />
  );
};

export default CopyButton;
