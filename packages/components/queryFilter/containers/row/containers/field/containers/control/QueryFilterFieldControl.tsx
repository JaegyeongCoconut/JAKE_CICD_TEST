import type { ReactElement } from "react";
import React, { useContext } from "react";

import * as S from "./QueryFilterFieldControl.styled";
import type QueryFilterFieldCalendar from "./containers/calendar/QueryFilterFieldCalendar";
import type QueryFilterFieldCheckbox from "./containers/checkbox/QueryFilterFieldCheckbox";
import type QueryFilterFieldDropdown from "./containers/dropdown/QueryFilterFieldDropdown";
import type QueryFilterFieldInput from "./containers/input/QueryFilterFieldInput";
import type QueryFilterFieldRadio from "./containers/radio/QueryFilterFieldRadio";
import { QueryFilterFieldStateContext } from "../../context/QueryFilterFieldStateContext";

interface QueryFilterFieldControlProps {
  children: ReactElement<
    | typeof QueryFilterFieldCalendar
    | typeof QueryFilterFieldCheckbox
    | typeof QueryFilterFieldDropdown
    | typeof QueryFilterFieldRadio
    | typeof QueryFilterFieldInput
  >;
}

const QueryFilterFieldControl = ({
  children,
}: QueryFilterFieldControlProps) => {
  const { isFocused, hasError } = useContext(QueryFilterFieldStateContext);

  return (
    <S.QueryFilterFieldControl hasError={hasError} isFocused={isFocused}>
      {children}
    </S.QueryFilterFieldControl>
  );
};

export default QueryFilterFieldControl;
