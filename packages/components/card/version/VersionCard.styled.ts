import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    border: 1px solid ${theme.color.gray_30};
    border-radius: 2px;
    padding: 23px 31px;

    &:hover {
      box-shadow: ${theme.boxShadow.shadow_medium};
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding-bottom: 12px;
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_16};
  `}
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  padding-top: 16px;
`;

export const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    border-radius: 8px;
    padding: 16px;
    background-color: ${theme.color.gray_10};
  `}
`;

export const Name = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: inline-block;
    color: ${theme.color.gray_60};
  `}
`;

export const link = (theme: Theme) => css`
  display: flex;
  align-items: center;

  & > span {
    ${theme.button.ghost_blue};
  }

  &:not(:disabled):hover {
    & > span {
      color: ${theme.color.blue_30};

      &::before {
        background-color: ${theme.color.blue_30};
      }
    }

    & > svg > path {
      fill: ${theme.color.blue_30};
    }
  }
`;

export const icon = (theme: Theme) => css`
  width: 16px;
  height: 16px;
  transform: rotate(-90deg);

  & > path {
    fill: ${theme.color.blue_10};
  }
`;

export const VersionContent = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_15};
    word-break: break-all;
  `}
`;
