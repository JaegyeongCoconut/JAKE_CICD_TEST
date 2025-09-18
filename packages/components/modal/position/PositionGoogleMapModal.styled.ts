import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LatLngWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 8px;
    padding: 8px 24px;
    background-color: ${theme.color.gray_10};
  `}
`;

export const Label = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    display: block;
    margin-bottom: 2px;
    color: ${theme.color.gray_70};
  `}
`;

export const Content = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    color: ${theme.color.gray_90};
  `}
`;

export const GoogleMapWrapper = styled.div`
  width: 100%;
  height: 484px;
`;
