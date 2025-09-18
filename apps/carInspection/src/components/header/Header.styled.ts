import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 774px;
  width: 100%;
  height: 44px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    ${theme.font.bold_18};
  `}
`;

export const icon = css`
  width: 24px;
`;
