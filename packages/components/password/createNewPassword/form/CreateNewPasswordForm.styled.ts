import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CreateNewPasswordSection = styled.section`
  ${({ theme }) => css`
    ${theme.layout.auth}
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.font.bold_24};
    margin-bottom: 32px;
  `}
`;

export const HideSubmitButton = styled.button`
  display: none;
`;

export const createPasswordButton = (theme: Theme) => css`
  ${theme.font.medium_16}
  width: 100%;
  height: 52px;
`;

export const accountLabelInput = css`
  margin-bottom: 12px;
`;

export const newPasswordCondition = css`
  margin-bottom: 24px;
`;

export const confirmPasswordCondition = css`
  margin-bottom: 40px;
`;
