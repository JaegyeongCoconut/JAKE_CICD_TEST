import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.button`
  display: flex;
  align-items: center;
`;

export const whatAppIcon = (theme: Theme) => css`
  width: 16px;
  height: 16px;

  & > path {
    fill: ${theme.color.green_40};
  }
`;
