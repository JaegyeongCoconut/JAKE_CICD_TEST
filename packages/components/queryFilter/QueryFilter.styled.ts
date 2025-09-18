import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilter = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin: 40px 0 12px;
    border: 1px solid ${theme.color.gray_20};
    border-bottom: 0;
  `}
`;
