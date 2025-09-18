import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import TableSkeleton from "@repo/components/table/tableSkeleton";
import useTab from "@repo/hooks/useTab";

import {
  INSPECTION_CHECKLIST_TABLE_HEADER_INFOS,
  INSPECTION_CHECKLIST_TABS,
} from "~assets";
import { Header } from "~components";
import { LANGUAGE_LABEL } from "~constants";

import * as S from "./Layer.styled";

const LayerSkeleton = () => {
  const { t } = useTranslation();

  const { selectedTab } = useTab(INSPECTION_CHECKLIST_TABS);

  return (
    <S.HeaderWrapper>
      <Header>
        <Header.Title title={LANGUAGE_LABEL.CAR_INSPECTION} />
      </Header>
      <S.TabList role="tablist">
        {INSPECTION_CHECKLIST_TABS.map(({ key, label }) => (
          <S.Tab key={key} role="tab" isSelected={selectedTab === key}>
            <Link
              css={S.link(selectedTab === key)}
              id={key}
              aria-controls={label}
              role="tab"
              replace
              to={`?tab=${key}`}
            >
              <span>{`${t(label)}(0 / 0)`}</span>
            </Link>
          </S.Tab>
        ))}
      </S.TabList>
      <TableSkeleton
        tableHeaderInfos={INSPECTION_CHECKLIST_TABLE_HEADER_INFOS}
      />
    </S.HeaderWrapper>
  );
};

export default LayerSkeleton;
