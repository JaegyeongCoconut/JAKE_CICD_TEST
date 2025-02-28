import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./ImagesFormatInfo.styled";

interface ImagesFormatInfoProps {
  fileFormatLabel?: Languages;
  ratioLabel?: Languages;
}

const ImagesFormatInfo = ({
  fileFormatLabel,
  ratioLabel,
}: ImagesFormatInfoProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.FormatInfo>
      {fileFormatLabel && <li>ㆍ{defaultLanguage(fileFormatLabel)}</li>}
      {ratioLabel && <li>ㆍ{defaultLanguage(ratioLabel)}</li>}
    </S.FormatInfo>
  );
};

export default ImagesFormatInfo;
