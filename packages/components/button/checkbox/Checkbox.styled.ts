import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { fillCheckboxSVG } from "@repo/utils/fill";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface LabelProps {
  disabled?: boolean;
  hasSubLabel: boolean;
}

export const Label = styled.label<LabelProps>`
  ${({ theme, disabled, hasSubLabel }) => css`
    ${theme.font.regular_14};
    display: flex;
    align-items: ${hasSubLabel ? "flex-start" : "center"};
    column-gap: 8px;
    color: ${theme.color.gray_90};
    z-index: ${theme.zIndex.CHECKBOX};

    & > span {
      width: max-content;
      color: ${disabled ? theme.color.gray_50 : theme.color.gray_90};
    }

    & > input[type="checkbox"] {
      display: none;
    }

    :hover {
      cursor: ${disabled ? "not-allowed" : "pointer"};

      input[type="checkbox"]:enabled + label {
        border: 1px solid ${theme.color.blue_60};
        cursor: pointer;
      }
    }

    input[type="checkbox"]:checked + label {
      border: 1px solid ${theme.color.blue_60};
      background: ${theme.color.blue_60} no-repeat center;
      background-image: url(${fillCheckboxSVG(theme.color.blue_60)});
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
      background: no-repeat center;
      background-color: ${theme.color.gray_10};
      background-image: url(${fillCheckboxSVG(theme.color.gray_40)});
    }
  `}
`;

export const Checkbox = styled.label`
  ${({ theme }) => css`
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid ${theme.color.gray_30};
    border-radius: 2px;
  `}
`;

export const CheckboxLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubLabel = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_11};
    color: ${theme.color.gray_80};
  `}
`;
