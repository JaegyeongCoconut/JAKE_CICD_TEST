import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { fillCheckboxSVG } from "@repo/utils/fill";

import type { LabelContentType } from "./LabelContentTable";

export const LabelContentTableWrapper = styled.div<{ marginBottom?: number }>`
  ${({ marginBottom }) => css`
    margin-bottom: ${marginBottom ?? 40}px;
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

export const Row = styled.div<{
  variant?: LabelContentType;
  partition: number;
  marginTop?: number;
  hasError?: boolean;
}>`
  ${({ theme, variant, partition, marginTop, hasError }) => css`
    display: grid;
    grid-template-columns: repeat(${partition}, 1fr);
    margin-top: ${marginTop && `${marginTop}px`};
    border: ${variant === "bg" && `1px solid ${theme.color.gray_20}`};
    border-bottom: ${hasError
      ? `1px solid ${theme.color.red_20}`
      : variant === "underline" && `1px solid ${theme.color.gray_20}`};

    :not(:first-of-type) {
      border-top: ${marginTop ? `1px solid ${theme.color.gray_20}` : "0"};
    }
  `}
`;

export const ContentWrapper = styled.div<{
  variant?: LabelContentType;
  labelWidth?: number;
}>`
  ${({ theme, variant, labelWidth }) => css`
    ${theme.font.regular_14};
    display: grid;
    grid-template-columns: ${labelWidth
        ? `${labelWidth}px`
        : variant === "empty"
          ? "200px"
          : "210px"} 1fr;
    word-break: break-all;
  `}
`;

export const NameWrapper = styled.div`
  height: 100%;
`;

const mixin_name =
  (variant?: LabelContentType, hasError?: boolean) => (theme: Theme) => css`
    ${variant === "bg" ? theme.font.medium_14 : theme.font.regular_14};
    display: flex;
    align-items: center;
    width: 100%;
    height: ${variant === "bg" || variant === "underline" ? "100%" : "60px"};
    padding: ${variant === "bg"
      ? "12px 20px"
      : variant === "underline" && "12px 16px 12px 0"};
    background-color: ${hasError
      ? theme.color.red_10
      : variant === "bg" && theme.color.gray_10};
    color: ${hasError
      ? theme.color.red_20
      : variant === "empty" || variant === "underline"
        ? theme.color.black
        : theme.color.gray_60};
    word-break: break-all;
  `;

export const Name = styled.span<{
  variant?: LabelContentType;
  hasError?: boolean;
}>`
  ${({ theme, variant, hasError }) => css`
    ${mixin_name(variant, hasError)(theme)}
  `}
`;

export const CheckboxLabel = styled.label<{
  variant?: LabelContentType;
  hasError?: boolean;
  disabled?: boolean;
}>`
  ${({ theme, variant, hasError, disabled }) => css`
    ${mixin_name(variant, hasError)(theme)};

    & > input[type="checkbox"] {
      display: none;
    }

    :hover {
      cursor: ${disabled ? "not-allowed" : "pointer"};

      input[type="checkbox"]:enabled + label {
        border: 1px solid ${theme.color.blue_10};
        cursor: pointer;
      }
    }

    input[type="checkbox"]:checked + label {
      border: 1px solid ${theme.color.blue_10};
      background: ${theme.color.blue_10} no-repeat center;
      background-image: url(${fillCheckboxSVG(theme.color.blue_10)});
    }

    input[type="checkbox"]:disabled + label {
      :hover {
        cursor: not-allowed;
      }
    }

    input[type="checkbox"]:disabled + label {
      border: 1px solid ${theme.color.gray_30};
      background-color: ${theme.color.gray_10};
    }

    input[type="checkbox"]:checked:disabled + label {
      border: 1px solid ${theme.color.gray_30};
      background-color: ${theme.color.gray_10};
      background: no-repeat center;
      background-image: url(${fillCheckboxSVG(theme.color.gray_40)});
    }
  `}
`;

export const Checkbox = styled.label`
  ${({ theme }) => css`
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border: 1px solid ${theme.color.gray_30};
    border-radius: 2px;
  `}
`;

export const Required = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    margin-left: 4px;
    color: ${theme.color.red_20};
  `}
`;

export const TooltipWrapper = styled.div`
  margin-left: 4px;
`;

export const Content = styled.div<{ variant?: LabelContentType }>`
  ${({ theme, variant }) => css`
    display: flex;
    align-items: center;
    padding: ${variant === "bg" ? "12px 20px" : "12px 0"};
    color: ${theme.color.black};
  `}
`;

export const SkeletonWrapper = styled.div`
  width: 50%;
  max-width: 100px;
  height: 100%;
`;
