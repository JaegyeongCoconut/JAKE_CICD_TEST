import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    & > svg {
      width: 64px;
      height: 64px;

      & > path {
        fill: ${theme.color.gray_40};
      }
    }
  `}
`;

export const ContentWrapper = styled.div``;

export const Content = styled.p`
  ${({ theme }) => css`
    ${theme.font.medium_15};
    color: ${theme.color.gray_50};
    text-align: center;
  `}
`;

export const icon = (theme: Theme) => css`
  width: 54px;
  height: 54px;

  path {
    fill: ${theme.color.gray_50};
  }
`;
