import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BaseModal = styled.dialog`
  ${({ theme }) => css`
    position: relative;
    display: block;
    margin: 0 auto;
    border: 0;
    border-radius: 5px;
    box-shadow: ${theme.boxShadow.shadow_regular};
    background-color: ${theme.color.white_00};
  `}
`;
