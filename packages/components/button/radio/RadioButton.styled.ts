import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const radioButton = css`
  display: flex;
  column-gap: 20px;
`;

export const label = (theme: Theme) => css`
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme.color.gray_30};
  border-radius: 50%;
`;

const fillRadioSVG = (color: string) => {
  const svgPrefix =
    "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Ccircle cx='9' cy='9' r='8.5' fill='white' stroke='%23D9DEE2' /%3E%3Ccircle cx='9' cy='9' r='5' fill='%23";
  const colorWithoutHash = color.replace("#", "");
  const svgSuffix = "' /%3E%3C/svg%3E%0A";

  return '"' + svgPrefix + colorWithoutHash + svgSuffix + '"';
};

export const content = (disabled?: boolean) => (theme: Theme) => css`
  ${theme.font.regular_14};
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: ${theme.color.gray_90};

  & > input[type="radio"] {
    display: none;
  }

  :hover {
    cursor: ${disabled ? "not-allowed" : "pointer"};

    input[type="radio"]:enabled + label {
      border: 1px solid ${theme.color.blue_60};
      cursor: pointer;
    }
  }

  input[type="radio"]:checked + label {
    border: 1px solid ${theme.color.gray_30};
    background: ${theme.color.blue_60} no-repeat center;
    background-image: url(${fillRadioSVG(theme.color.blue_60)});
  }

  input[type="radio"]:disabled + label {
    :hover {
      cursor: not-allowed;
    }
  }

  input[type="radio"]:disabled + label {
    border: 1px solid ${theme.color.gray_30};
    background-color: ${theme.color.gray_10};
  }

  input[type="radio"]:checked:disabled + label {
    border: 1px solid ${theme.color.gray_30};
    background: no-repeat center;
    background-color: ${theme.color.gray_10};
    background-image: url(${fillRadioSVG(theme.color.gray_40)});
  }

  & > label {
    ${label(theme)}
  }
`;
