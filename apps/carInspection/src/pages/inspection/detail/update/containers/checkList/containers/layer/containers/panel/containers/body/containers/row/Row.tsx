import React from "react";

import type { ChecklistType } from "~types";

import * as S from "./Row.styled";
import StatusDropdown from "./containers/dropdown/StatusDropdown";
import RemarkIcons from "./containers/remark/RemarkIcons";

interface RowProps {
  label: string;
  listId: string;
  type: ChecklistType;
}

const Row = ({ listId, label, type }: RowProps) => {
  return (
    <S.ListBodyRow>
      <S.ListItem>{listId}</S.ListItem>
      <S.ListItem>{label}</S.ListItem>
      <StatusDropdown listId={listId} type={type} />
      <RemarkIcons listId={listId} type={type} />
    </S.ListBodyRow>
  );
};

export default Row;
