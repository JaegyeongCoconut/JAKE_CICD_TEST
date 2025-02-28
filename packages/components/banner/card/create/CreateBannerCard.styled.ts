import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const addBanner = (dataCount: number) => (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 413px;
  width: ${!dataCount && "413px"};
  height: 232px;
  border: 1px solid ${theme.color.gray_30};
  padding: 0px 32px;

  & > svg {
    margin-bottom: 32px;
    & > path {
      width: 56px;
      height: 56px;
    }
  }

  &:hover {
    box-shadow: ${theme.boxShadow.shadow_medium};
  }

  @media ${theme.breakPoint.device.banner} {
    justify-content: center;
    min-width: 321px;
    width: ${!dataCount && "413px"};
    padding: ${dataCount ? "0 69px" : "0 32px"};
  }
`;

export const plusIcon = (theme: Theme) => css`
  width: 56px;
  height: 56px;

  & > path {
    fill: ${theme.color.gray_30};
  }
`;

export const Text = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_18};
    margin-bottom: 4px;
    color: ${theme.color.black};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.gray_60};
    text-align: center;
  `}
`;

// NOTE: css 에러가 발생해서 빈 스타일드 생성
export const CreateBannerSkeletonWrapper = styled.div``;
