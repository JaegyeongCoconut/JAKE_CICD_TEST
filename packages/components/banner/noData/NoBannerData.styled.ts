import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const NoBannerData = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
    border-top: 1px solid ${theme.color.gray_20};
  `}
`;

export const errorIcon = (theme: Theme) => css`
  width: 52px;
  height: 52px;
  margin-bottom: 8px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    margin-bottom: 36px;
    color: ${theme.color.gray_60};
  `}
`;

export const gotoCreateBanner = (theme: Theme) => css`
  ${theme.button.secondary};
`;
