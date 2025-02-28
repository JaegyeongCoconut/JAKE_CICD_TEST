import React from "react";

import { CopyIcon } from "@repo/assets/icon";
import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import useToast from "@repo/hooks/useToast";

import * as S from "./CopyButton.styled";
import Button from "../Button";

interface CopyButtonProps {
  className?: string;
  copyText: string;
  callbackFunction?: () => void;
}

const CopyButton = ({
  className,
  copyText,
  callbackFunction,
}: CopyButtonProps) => {
  const { addToast } = useToast();

  const handleTextCopy =
    (copyText: string) =>
    async (e: React.MouseEvent): Promise<void> => {
      e.stopPropagation();
      callbackFunction && callbackFunction();

      try {
        await navigator.clipboard.writeText(copyText);
        addToast(COMMON_TOAST_MESSAGE.SUCCESS.COPY_DRIVER_MOBILE);
      } catch {
        addToast(COMMON_TOAST_MESSAGE.WARNING.COPY_DRIVER_MOBILE_FAIL);
      }
    };

  return (
    <Button
      className={className}
      css={S.copyButton}
      variant="iconOnly"
      disabled={false}
      Icon={CopyIcon}
      handleButtonClick={handleTextCopy(copyText)}
    />
  );
};

export default CopyButton;
