import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const AccountIdForm = styled.form<{ isVerifyDone: boolean }>`
  ${({ theme, isVerifyDone }) => css`
    background-color: ${isVerifyDone && theme.color.gray_10};
  `}
`;

export const EmailVerifyButton = styled.button`
  ${({ theme }) => css`
    ${theme.button.outlined};
    position: absolute;
    right: 0px;
    bottom: 8px;
  `}
`;

export const HideSubmitButton = styled.button`
  display: none;
`;

export const alertMessage = css`
  margin-top: 8px;
`;

export const AccountInputWrapper = styled.div`
  position: relative;
`;
