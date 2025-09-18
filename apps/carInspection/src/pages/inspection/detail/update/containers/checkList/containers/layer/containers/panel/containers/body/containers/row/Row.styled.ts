import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { calcTableWidth } from "@repo/utils/table";

import { INSPECTION_CHECKLIST_TABLE_HEADER_INFOS } from "~assets";

export const ListBodyRow = styled.li`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: ${calcTableWidth({
      tableHeaderInfos: INSPECTION_CHECKLIST_TABLE_HEADER_INFOS,
    })};
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 12px;

    &:last-of-type {
      border-bottom: 0px;
    }
  `}
`;

export const ListItem = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    padding: 12px;
    color: ${theme.color.gray_90};
  `}
`;
