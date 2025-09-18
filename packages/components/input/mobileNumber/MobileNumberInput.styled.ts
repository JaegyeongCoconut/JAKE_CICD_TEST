import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MobileNumberInputWrapper = styled.div`
  position: relative;
`;

export const Dial = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    position: absolute;
    top: 50%;
    left: 11px;
    color: ${theme.color.gray_90};
    transform: translateY(-50%);
    user-select: none;
  `}
`;

export const mobileNumberInput = css`
  padding: 0 11px 0 56px;
`;
