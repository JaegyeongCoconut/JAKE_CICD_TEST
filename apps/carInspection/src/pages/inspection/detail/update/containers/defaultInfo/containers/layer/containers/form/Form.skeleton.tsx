import React from "react";

import Dropdown from "@repo/components/dropdown";
import DisabledInput from "@repo/components/input/disabled";
import LabelContentTable from "@repo/components/label/table";

import { LANGUAGE_LABEL } from "~constants";
import type { CarInspectionLanguages } from "~types";

import * as S from "./Form.styled";

const FormSkeleton = () => {
  return (
    <LabelContentTable variant="empty" hasDefaultMarginBottom subject={null}>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.INSPECTION_CODE}
          labelWidth={210}
        >
          <DisabledInput
            value=""
            placeholder={LANGUAGE_LABEL.ENTER_THE_INSPECTION_CODE}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.INSPECTED_BY}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.INSPECTED_DATE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.FRAME_NUMBER}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.ENGINE_NUMBER}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.BRAND}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.MODEL}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.CAR_TYPE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.COLOR}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.YEAR}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.MILEAGE}
          labelWidth={210}
        >
          <DisabledInput value="" placeholder={"" as CarInspectionLanguages} />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.FUEL_TYPE}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
      <LabelContentTable.Row
        hasError={false}
        hasPartition={false}
        marginTop={0}
      >
        <LabelContentTable.Content
          hasError={false}
          isRequired={false}
          label={LANGUAGE_LABEL.TRANSMISSON}
          labelWidth={210}
        >
          <Dropdown
            css={S.dropdown}
            disabled
            placeholder={LANGUAGE_LABEL.SELECT_THE_OPTION}
          />
        </LabelContentTable.Content>
      </LabelContentTable.Row>
    </LabelContentTable>
  );
};

export default FormSkeleton;
