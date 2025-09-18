import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Profile = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const skeleton = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Name = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_15};
    margin-bottom: 4px;
    color: ${theme.color.gray_90};
  `}
`;

export const clientIcon = (isLoading: boolean) => css`
  display: ${isLoading && "none"};
  width: 56px;
`;

export const image = (isLoading: boolean) => css`
  display: ${isLoading ? "none" : "block"};
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
