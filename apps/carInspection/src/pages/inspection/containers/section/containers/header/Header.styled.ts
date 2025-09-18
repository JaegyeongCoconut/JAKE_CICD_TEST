import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HeaderWapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

export const HeaderTitle = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_18};
    margin-right: 8px;
  `}
`;

export const HeaderSubTitle = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    margin-right: 4px;
    color: ${theme.color.gray_60};
  `}
`;

export const UpdatedDate = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    margin-right: 2px;
    color: ${theme.color.gray_80};
  `}
`;

export const UpdateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;

  & > svg {
    width: 12px;
    height: 12px;
  }
`;

export const resetIcon = (theme: Theme) => css`
  & > path {
    fill: ${theme.color.gray_70};
  }
`;
