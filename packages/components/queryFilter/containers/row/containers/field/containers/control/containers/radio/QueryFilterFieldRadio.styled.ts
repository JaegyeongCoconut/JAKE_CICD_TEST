import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterFieldRadioWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 24px;
  max-width: fit-content;
  padding: 7px 20px;
`;

interface QueryFilterFieldRadioButtonProps {
  radioKey: string;
}

export const QueryFilterFieldRadioButton = styled.li<QueryFilterFieldRadioButtonProps>`
  ${({ theme, radioKey }) => css`
    ${theme.font.regular_14};

    label {
      display: inline-block;
      height: 100%;
      border-radius: 2px;
      padding: 6px 12px;
      color: ${theme.color.gray_50};
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      :hover {
        background-color: ${theme.color.gray_10};
        cursor: pointer;
      }
    }

    input {
      display: none;
    }

    input:checked + label {
      color: ${radioKey === "all" ? theme.color.gray_90 : theme.color.white_00};
      background-color: ${radioKey === "all"
        ? theme.color.gray_10
        : theme.color.blue_60};
    }
  `}
`;
