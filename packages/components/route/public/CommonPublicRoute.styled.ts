import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PublicMain = styled.main<{ paddingTop: string }>`
  ${({ theme, paddingTop }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: ${paddingTop};
    background-color: ${theme.color.gray_10};
  `}
`;
