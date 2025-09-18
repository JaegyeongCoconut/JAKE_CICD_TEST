import type { ReactElement } from "react";
import React from "react";

import * as S from "./QueryFilterRow.styled";
import type QueryFilterField from "./containers/field/QueryFilterField";

type SingleChildrenQueryFilterRowProps = {
  className?: string;
  hasPartition: boolean;
  children: ReactElement<typeof QueryFilterField>;
};

type MultipleChildrenQueryFilterRowProps = {
  className?: string;
  hasPartition?: never;
  children: ReactElement<typeof QueryFilterField>[];
};

type QueryFilterRowProps =
  | SingleChildrenQueryFilterRowProps
  | MultipleChildrenQueryFilterRowProps;

const QueryFilterRow = ({
  className,
  children,
  hasPartition,
}: QueryFilterRowProps) => {
  const partition = hasPartition || Array.isArray(children) ? 2 : 1;

  return (
    <S.QueryFilterRow className={className} partition={partition}>
      {children}
    </S.QueryFilterRow>
  );
};

export default QueryFilterRow;
