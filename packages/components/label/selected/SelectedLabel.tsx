import React from "react";

import { CloseIcon } from "@repo/assets/icon";

import * as S from "./SelectedLabel.styled";
import Button from "../../button/Button";

interface SelectedLabelProps {
  children: React.ReactNode;
  handleLabelDelete: () => void;
}

const SelectedLabel = ({ children, handleLabelDelete }: SelectedLabelProps) => {
  return (
    <S.SearchLabel>
      {children}
      <Button
        css={S.closeButton}
        Icon={CloseIcon}
        variant="iconOnly"
        disabled={false}
        handleButtonClick={handleLabelDelete}
      />
    </S.SearchLabel>
  );
};

export default SelectedLabel;
