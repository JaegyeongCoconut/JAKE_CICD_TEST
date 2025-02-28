import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
0% { transform: rotate(0deg) }
100% { transform: rotate(360deg) }
`;

export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Spinner = styled.div`
  ${({ theme }) => css`
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.color.white};
    border-top: 2px solid ${theme.color.blue_10};
    border-radius: 20px;
    animation: ${spin} 0.7s linear infinite;
  `}
`;
