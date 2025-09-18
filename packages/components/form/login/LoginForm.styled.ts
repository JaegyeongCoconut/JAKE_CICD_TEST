import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LoginSection = styled.section`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    ${theme.layout.auth}
    margin-top: 40px;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  margin-bottom: 20px;
`;

export const loginButton = (theme: Theme) => css`
  ${theme.font.medium_15};
  width: 100%;
  height: 52px;
  margin-top: 20px;
`;

export const resetPasswordLink = (theme: Theme) => css`
  ${theme.button.ghost};
  width: max-content;
  margin-top: 20px;
`;
