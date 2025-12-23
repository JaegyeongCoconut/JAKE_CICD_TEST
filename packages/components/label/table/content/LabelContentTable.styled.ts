import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { LabelContentType } from "./LabelContentTable";

interface LabelContentTableWrapperProps {
  hasDefaultMarginBottom: boolean;
  marginBottom: number;
}

export const LabelContentTableWrapper = styled.div<LabelContentTableWrapperProps>`
  ${({ hasDefaultMarginBottom, marginBottom }) => css`
    margin-bottom: ${hasDefaultMarginBottom ? 40 : marginBottom}px;
  `}
`;

export const SubjectComponentWrapper = styled.span`
  display: block;
  margin-bottom: 12px;
`;

export const SubjectWrapper = styled(SubjectComponentWrapper)`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    color: ${theme.color.gray_60};
  `}
`;

interface RowProps {
  variant: LabelContentType | undefined;
  hasError: boolean;
  hasPartition: boolean;
  marginTop: number;
}

export const Row = styled.div<RowProps>`
  ${({ theme, variant, hasPartition, marginTop, hasError }) => css`
    display: grid;
    grid-template-columns: repeat(${hasPartition ? 2 : 1}, 1fr);
    margin-top: ${marginTop && `${marginTop}px`};
    border: ${variant === "bg" && `1px solid ${theme.color.gray_20}`};
    border-bottom: ${hasError
      ? `1px solid ${theme.color.red_50}`
      : variant === "underline" && `1px solid ${theme.color.gray_20}`};

    :not(:first-of-type) {
      border-top: ${marginTop ? `1px solid ${theme.color.gray_20}` : "0"};
    }
  `}
`;

export const ContentWrapper = styled.div<{ labelWidth: number }>`
  ${({ theme, labelWidth }) => css`
    ${theme.font.regular_14};
    display: grid;
    grid-template-columns: ${labelWidth}px 1fr;
    word-break: break-all;
  `}
`;

export const NameWrapper = styled.div`
  height: 100%;
`;

interface NameLabelProps {
  variant: LabelContentType | undefined;
  hasError: boolean;
}

export const Name = styled.div<NameLabelProps>`
  ${({ theme, variant, hasError }) => css`
    ${variant === "bg" ? theme.font.medium_14 : theme.font.regular_14};
    display: flex;
    align-items: center;
    width: 100%;
    height: ${variant === "bg" || variant === "underline" ? "100%" : "60px"};
    padding: ${variant === "bg"
      ? "12px 20px"
      : variant === "underline" && "12px 16px 12px 0"};
    color: ${hasError
      ? theme.color.red_50
      : variant === "empty" || variant === "underline"
        ? theme.color.gray_90
        : theme.color.gray_60};
    word-break: break-all;
    background-color: ${hasError
      ? theme.color.red_20
      : variant === "bg" && theme.color.gray_10};
  `}
`;

export const Label = styled.span<NameLabelProps>`
  ${({ theme, variant, hasError }) => css`
    ${variant === "bg" ? theme.font.medium_14 : theme.font.regular_14};
    color: ${hasError
      ? theme.color.red_50
      : variant === "empty" || variant === "underline"
        ? theme.color.gray_90
        : theme.color.gray_60};
  `}
`;

export const Required = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    margin-left: 4px;
    color: ${theme.color.red_50};
  `}
`;

export const Content = styled.div<{ variant: LabelContentType | undefined }>`
  ${({ theme, variant }) => css`
    display: flex;
    align-items: center;
    padding: ${variant === "bg" ? "12px 20px" : "12px 0"};
    color: ${theme.color.gray_90};
  `}
`;

export const SkeletonWrapper = styled.div`
  width: 50%;
  height: 100%;
  max-width: 100px;
`;
