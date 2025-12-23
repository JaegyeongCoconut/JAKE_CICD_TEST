import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { StatusColorType } from "@repo/types";

interface LabelProps {
  variant: StatusColorType;
  hasBg: boolean;
}

export const Status = styled.span<LabelProps>`
  ${({ theme, hasBg }) => css`
    ${hasBg ? theme.font.regular_13 : theme.font.regular_13};
    border-radius: ${hasBg && "2px"};
    padding: ${hasBg && "3px 12px"};
  `}
`;

const statusColor: {
  [key: string]: {
    color: keyof Theme["color"];
    backgroundColor: keyof Theme["color"];
  };
} = {
  orange: { color: "yellow_60", backgroundColor: "yellow_10" },
  green: { color: "green_50", backgroundColor: "green_10" },
  blue: { color: "blue_60", backgroundColor: "blue_60_10" },
  gray: { color: "gray_60", backgroundColor: "gray_20" },
  red: { color: "red_50", backgroundColor: "red_20" },
};

export const Label = styled(Status)<LabelProps>`
  ${({ theme, hasBg, variant }) => css`
    color: ${theme.color[statusColor[variant].color]};
    background-color: ${hasBg &&
    theme.color[statusColor[variant].backgroundColor]};
  `}
`;
