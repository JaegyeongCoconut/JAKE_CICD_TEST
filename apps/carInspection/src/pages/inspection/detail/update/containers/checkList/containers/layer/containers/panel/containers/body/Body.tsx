import React from "react";

import { useFormContext } from "react-hook-form";

import type { ChecklistType } from "~types";

import Row from "./containers/row/Row";
import type { CheckListFormSchema } from "../../../../../schema/checkListForm.schema";

interface BodyProps {
  type: ChecklistType;
}

const Body = ({ type }: BodyProps) => {
  const { watch } = useFormContext<CheckListFormSchema>();

  return (
    <ul>
      {watch(`${type}Checklist`).map(({ no, titleLo }, i) => (
        <Row key={i} label={titleLo} listId={`${no}`} type={type} />
      ))}
    </ul>
  );
};

export default Body;
