import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const VerificationSection = styled.section`
  margin-top: 24px;
`;

export const HideSubmitButton = styled.button`
  display: none;
`;

export const alertMessage = css`
  margin-top: 8px;
`;

export const NextStepButton = styled.button`
  ${({ theme }) => css`
    ${theme.button.primary};
    ${theme.font.medium_16};
    width: 100%;
    height: 52px;
    margin-top: 40px;
  `}
`;

export const timer = css`
  margin-top: 8px;
`;
