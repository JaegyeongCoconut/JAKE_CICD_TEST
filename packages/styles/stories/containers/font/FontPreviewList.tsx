import React from "react";

import * as S from "./FontPreviewList.styled";
import { font } from "../../../themes";

const FontPreviewList = () => {
  return (
    <S.FontList>
      {Object.entries(font).map(([fontKey, fontValue]) => {
        const styles = fontValue.styles;
        const fontFamily =
          styles.match(/font-family:\s*([^;]+)/)?.[1] || "inherit";
        const fontSize = styles.match(/font-size:\s*([^;]+)/)?.[1] || "16px";
        const fontWeight =
          styles.match(/font-weight:\s*([^;]+)/)?.[1] || "normal";
        const lineHeight =
          styles.match(/line-height:\s*([^;]+)/)?.[1] || "normal";

        return (
          <li key={fontKey}>
            <p style={{ fontFamily, fontSize, fontWeight, lineHeight }}>
              <strong>{fontKey}</strong>
            </p>
            <p style={{ fontFamily, fontSize, fontWeight, lineHeight }}>
              Lorem ipsum dolor sit amet
            </p>
          </li>
        );
      })}
    </S.FontList>
  );
};

export default FontPreviewList;
