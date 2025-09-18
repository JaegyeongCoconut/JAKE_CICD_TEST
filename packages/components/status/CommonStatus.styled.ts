import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface LabelProps {
  hasBg?: boolean;
}

export const Status = styled.span<LabelProps>`
  ${({ theme, hasBg }) => css`
    ${hasBg ? theme.font.regular_13 : theme.font.regular_13};
    border-radius: ${hasBg && "2px"};
    padding: ${hasBg && "3px 12px"};
  `}
`;

export const OrangeLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.yellow_60};
    background-color: ${hasBg && theme.color.yellow_10};
  `}
`;

export const GreenLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.green_50};
    background-color: ${hasBg && theme.color.green_10};
  `}
`;

export const BlueLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.blue_60};
    background-color: ${hasBg && theme.color.blue_60_10};
  `}
`;

export const GrayLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.gray_60};
    background-color: ${hasBg && theme.color.gray_20};
  `}
`;

export const RedLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.red_50};
    background-color: ${hasBg && theme.color.red_20};
  `}
`;
