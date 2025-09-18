import { css } from "@emotion/react";

interface ImageProps {
  isLoading: boolean;
  height: number;
  width: number;
}

export const image = ({ isLoading, width, height }: ImageProps) => css`
  display: ${isLoading ? "none" : "block"};
  width: ${width}px;
  height: ${height}px;
`;

//NOTE: 어떤 방법으로 스켈레톤 표현할지에 따라 삭제 예정
export const skeleton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
