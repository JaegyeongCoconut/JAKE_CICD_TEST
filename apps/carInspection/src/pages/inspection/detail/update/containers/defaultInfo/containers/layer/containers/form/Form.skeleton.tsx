import React from "react";

import Dropdown from "@repo/components/dropdown";
import DisabledInput from "@repo/components/input/disabled";
import LabelContentTable from "@repo/components/label/table";

import { LANGUAGE_LABEL } from "~constants";
import type { CarInspectionLanguages } from "~types";

import * as S from "./Form.styled";

const FormSkeleton = () => {
  const defaultDropdownItem = {
    key: "",
    label: "" as CarInspectionLanguages,
  };

  return (
    <LabelContentTable variant="empty">
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTION_CODE}
          labelWidth={210}
        >
          <DisabledInput
            value=""
            placeholder={LANGUAGE_LABEL.ENTER_THE_INSPECTION_CODE}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTED_BY}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.INSPECTED_DATE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.FRAME_NUMBER}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.ENGINE_NUMBER}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.BRAND}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.MODEL}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.CAR_TYPE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.COLOR}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            options={[]}
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
            selectedOption={defaultDropdownItem}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content label={LANGUAGE_LABEL.YEAR} labelWidth={210}>
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.MILEAGE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.FUEL_TYPE}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            options={[]}
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
            selectedOption={defaultDropdownItem}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row>
        <LabelContentTable.Content
          label={LANGUAGE_LABEL.TRANSMISSON}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            options={[]}
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
            selectedOption={defaultDropdownItem}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    </LabelContentTable>
  );
};

export default FormSkeleton;
