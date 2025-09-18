import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Dim = styled.div`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${theme.zIndex.MODAL};
  `}
`;
