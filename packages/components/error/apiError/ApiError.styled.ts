import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const ApiError = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 425px;
`;

export const icon = (theme: Theme) => css`
  width: 78px;
  height: 78px;
  margin-bottom: 10px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    margin-bottom: 6px;
    color: ${theme.color.black};
    text-align: center;
  `}
`;

export const Desc = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    margin-bottom: 32px;
    color: ${theme.color.gray_70};
    text-align: center;
  `}
`;
