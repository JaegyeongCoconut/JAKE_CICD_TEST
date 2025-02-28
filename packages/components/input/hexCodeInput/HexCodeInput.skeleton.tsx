import React from "react";

import Input from "../Input";
import * as S from "./HexCodeInput.styled";

interface HexCodeInputProps {
  className?: string;
}

const HexCodeInputSkeleton = ({ className }: HexCodeInputProps) => {
  return (
    <S.HexCodeInputWrapper className={className}>
      <S.BackgroundColorBox color="FFFFFF" hasColor={true} />
      <S.HexCodeInputContent>
        <S.HexCodeUnit>#</S.HexCodeUnit>
        <Input
          css={S.input}
          maxLength={6}
          placeholder="Enter hex color codes (6 characters)"
        />
      </S.HexCodeInputContent>
    </S.HexCodeInputWrapper>
  );
};

export default HexCodeInputSkeleton;
