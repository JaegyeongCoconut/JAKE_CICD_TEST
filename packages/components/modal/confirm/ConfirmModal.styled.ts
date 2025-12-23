import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const baseModal = css`
  width: 416px;
  padding: 24px 28px;
`;

export const ConfirmHeader = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    margin-bottom: 4px;
  `}
`;

export const Description = styled.pre`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    margin-bottom: 20px;
    color: ${theme.color.gray_60};
    white-space: break-spaces;
  `}
`;

export const ConfirmFooter = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: flex;
    justify-content: flex-end;
    column-gap: 32px;
  `}
`;
