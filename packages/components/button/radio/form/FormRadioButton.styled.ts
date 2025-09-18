import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { content, label, radioButton } from "../RadioButton.styled";

export const RadioWrapper = styled.div`
  ${radioButton}
`;

interface LabelProps {
  disabled?: boolean;
}

export const Label = styled.label<LabelProps>`
  ${({ theme, disabled }) => css`
    ${content(disabled)(theme)}
  `}
`;

export const RadioButton = styled.label`
  ${({ theme }) => css`
    ${label(theme)}
  `}
`;
