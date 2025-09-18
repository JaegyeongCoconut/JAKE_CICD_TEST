import React from "react";

import { ReactComponent as CloseIcon } from "@repo/assets/icon/ic_close.svg";

import * as S from "./SelectedLabel.styled";
import Button from "../../button/Button";

interface SelectedLabelProps {
  className?: string;
  handleLabelDelete: () => void;
  children: React.ReactNode;
}

const SelectedLabel = ({
  className,
  children,
  handleLabelDelete,
}: SelectedLabelProps) => {
  return (
    <S.SearchLabel css={className}>
      {children}
      <Button
        css={S.closeButton}
        variant="iconOnly"
        disabled={false}
        Icon={CloseIcon}
        handleButtonClick={handleLabelDelete}
      />
    </S.SearchLabel>
  );
};

export default SelectedLabel;
