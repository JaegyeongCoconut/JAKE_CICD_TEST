import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    & > label {
      position: absolute;
      top: 50%;
      right: 11px;
      color: ${theme.color.gray_50};
      transform: translateY(-50%);
    }
  `}
`;
