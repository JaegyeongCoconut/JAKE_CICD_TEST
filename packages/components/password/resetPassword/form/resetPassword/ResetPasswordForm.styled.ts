import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ResetPasswordSection = styled.section`
  ${({ theme }) => css`
    ${theme.layout.auth}
    width: 528px;
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.font.bold_24};
    margin-bottom: 12px;
  `}
`;

export const DescriptionWrapper = styled.div`
  margin-bottom: 32px;
`;

export const Description = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_60};
  `}
`;
