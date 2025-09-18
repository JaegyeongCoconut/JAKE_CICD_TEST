import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { calcTableWidth } from "@repo/utils/table";

import { INSPECTION_CHECKLIST_TABLE_HEADER_INFOS } from "~assets";

export const ListHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: ${calcTableWidth({
      tableHeaderInfos: INSPECTION_CHECKLIST_TABLE_HEADER_INFOS,
    })};
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 12px;
    background-color: ${theme.color.gray_10};
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
