import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { calcTableWidth } from "@repo/utils/table";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";

export const ListHeader = styled.div`
  ${({ theme }) => css`
    position: sticky;
    display: grid;
    grid-template-columns: ${calcTableWidth({
      tableHeaderInfos: INSPECTION_TABLE_HEADER_INFOS,
    })};
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 12px;
    background-color: ${theme.color.gray_10};
    z-index: ${theme.zIndex.HEADER};
  `}
`;

export const ListHeaderItem = styled.div`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    padding: 10px 12px;
    color: ${theme.color.gray_60};
    background-color: ${theme.color.gray_10};
  `}
`;
