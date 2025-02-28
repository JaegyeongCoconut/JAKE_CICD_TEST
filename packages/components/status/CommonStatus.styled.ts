import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface LabelProps {
  hasBg?: boolean;
}

export const Status = styled.span<LabelProps>`
  ${({ theme, hasBg }) => css`
    ${hasBg ? theme.font.regular_13 : theme.font.regular_13};
    padding: ${hasBg && "3px 12px"};
    border-radius: ${hasBg && "2px"};
  `}
`;

export const OrangeLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.orange_20};
    background-color: ${hasBg && theme.color.orange_10};
  `}
`;

export const GreenLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.green_20};
    background-color: ${hasBg && theme.color.green_10};
  `}
`;

export const BlueLabel = styled(Status)<LabelProps>`
  ${({ theme, hasBg }) => css`
    color: ${theme.color.blue_10};
    background-color: ${hasBg && theme.color.blue_10_10};
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
    color: ${theme.color.red_20};
    background-color: ${hasBg && theme.color.red_10};
  `}
`;
