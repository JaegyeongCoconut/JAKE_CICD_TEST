import React, { useState } from "react";

import "./ApiDebugPanel.styled.ts";

import { useApiDebugStore } from "@repo/stores/apiDebug";

import * as S from "./ApiDebugPanel.styled";

const ApiDebugPanel = () => {
  const logs = useApiDebugStore((state) => state.logs);
  const [height, setHeight] = useState(300);

  const handleMouseDown = (e: React.MouseEvent): void => {
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (moveEvent: MouseEvent): void => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = startHeight - deltaY;
      const clampedHeight = Math.min(
        Math.max(newHeight, 100),
        window.innerHeight * 0.8,
      );

      setHeight(clampedHeight);
    };

    const handleMouseUp = (): void => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const logObjects = Object.entries(logs);

  return (
    <S.ApiDebugPanel style={{ height }}>
      <S.ResizeHandle onMouseDown={handleMouseDown} />
      <S.Title>API Error</S.Title>
      {logObjects.length ? (
        logObjects.map(([path, errors], i) => (
          <details key={i}>
            <S.ApiSummary>{path ?? "-"}</S.ApiSummary>
            <S.ApiOl>
              <S.HeaderSpanWrapper>
                {["key", "expected type", "response value"].map((item) => (
                  <S.HeaderSpan key={item}>{item}</S.HeaderSpan>
                ))}
              </S.HeaderSpanWrapper>
              {errors.length ? (
                errors.map(({ path, expected, value }, i) => (
                  <S.ApiList key={i}>
                    <S.ApiListSpan>
                      {path
                        ? path.includes("$input.")
                          ? path.replace("$input.", "")
                          : path
                        : "-"}
                    </S.ApiListSpan>
                    <S.ApiListSpan>{expected ?? "-"}</S.ApiListSpan>
                    <S.ApiListSpan>
                      {typeof value === "undefined"
                        ? "undefined"
                        : JSON.stringify(value)}
                    </S.ApiListSpan>
                  </S.ApiList>
                ))
              ) : (
                <li>None</li>
              )}
            </S.ApiOl>
          </details>
        ))
      ) : (
        <div>None</div>
      )}
    </S.ApiDebugPanel>
  );
};

export default ApiDebugPanel;
