import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";

import { Link } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useTab from "@repo/hooks/useTab";
import { useQueryFilterStore } from "@repo/stores/queryFilter";
import type { Languages, TabType } from "@repo/types";

import * as S from "./Tab.styled";

const TabContentContext = createContext<{
  selectedTab: string;
  tabs: readonly TabType<Languages>[];
}>({
  tabs: [],
  selectedTab: "",
});
interface TabProps {
  className?: string;
  tabs: readonly TabType<Languages>[];
  children: ReactNode;
}

const Tab = ({ className, tabs, children }: TabProps) => {
  const { selectedTab } = useTab(tabs);

  return (
    <TabContentContext.Provider value={{ tabs, selectedTab }}>
      <section className={className}>{children}</section>
    </TabContentContext.Provider>
  );
};

interface TabHeaderProps {
  className?: string;
}

const TabHeader = ({ className }: TabHeaderProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { tabs, selectedTab } = useContext(TabContentContext);
  const isInitQueryFilter = useQueryFilterStore(
    (state) => state.isInitQueryFilter,
  );
  const setIsInitQueryFilter = useQueryFilterStore(
    (state) => state.setIsInitQueryFilter,
  );

  const handleTabClick = (): void => {
    if (isInitQueryFilter) return;

    setIsInitQueryFilter(true);
  };

  return (
    <S.TabHeader className={className} role="tablist">
      {tabs.map(({ key, label }) => (
        <S.Tab key={key} role="tab" ariaSelected={selectedTab === key}>
          <Link
            css={S.link(selectedTab === key)}
            id={key}
            role="tab"
            replace
            to={`?tab=${key}`}
            onClick={handleTabClick}
          >
            <span>{defaultLanguage({ text: label })}</span>
          </Link>
        </S.Tab>
      ))}
    </S.TabHeader>
  );
};

interface TabPanelProps {
  className?: string;
  tabPanelRender: Record<string, ReactNode>;
}

const TabPanel = ({ className, tabPanelRender }: TabPanelProps) => {
  const { selectedTab } = useContext(TabContentContext);

  return (
    <div className={className} id={selectedTab} role="tabpanel">
      {tabPanelRender[selectedTab]}
    </div>
  );
};

Tab.TabHeader = TabHeader;
Tab.TabPanel = TabPanel;

export default Tab;
