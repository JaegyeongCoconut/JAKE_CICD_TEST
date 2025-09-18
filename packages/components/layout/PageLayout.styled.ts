import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PageLayout = styled.section`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    max-width: ${theme.size.SECTION_MAX_WIDTH};
    margin: 0 auto;
  `}
`;

export const skeleton = css`
  margin-top: 8px;
`;
