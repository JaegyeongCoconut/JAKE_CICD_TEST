import React, { createContext, useContext, ReactNode } from "react";

import { isUndefined } from "lodash-es";
import { Link } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useTab from "@repo/hooks/useTab";
import { useFilterStore } from "@repo/stores/filter";
import type { Languages, TabType } from "@repo/types";

import * as S from "./Tab.styled";

const TabContentContext = createContext<{
  tabs: readonly TabType<Languages>[];
  selectedTab: string;
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

interface TabListProps {
  className?: string;
  tabCount?: { [key: string]: number };
}

Tab.TabList = function TablList({ className, tabCount }: TabListProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const { tabs, selectedTab } = useContext(TabContentContext);
  const isInitFilter = useFilterStore((state) => state.isInitFilter);
  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);

  const handleTabClick = () => {
    if (isInitFilter) return;

    setIsInitFilter(true);
  };

  return (
    <S.TabList role="tablist" className={className}>
      {tabs.map(({ key, label }) => (
        <S.Tab key={key} role="tab" ariaSelected={selectedTab === key}>
          <Link
            css={S.link(selectedTab === key)}
            id={key}
            role="tab"
            aria-controls={label}
            to={`?tab=${key}`}
            replace
            onClick={handleTabClick}
          >
            <span>{defaultLanguage(label)}</span>
            {tabCount && (
              <span>
                {!isUndefined(tabCount[key]) ? `(${tabCount[key]})` : ""}
              </span>
            )}
          </Link>
        </S.Tab>
      ))}
    </S.TabList>
  );
};

interface TabPanelProps {
  render: { [key: string]: ReactNode };
  className?: string;
}

Tab.TabPanel = function TabPanel({ render, className }: TabPanelProps) {
  const { selectedTab } = useContext(TabContentContext);

  return (
    <div
      id={selectedTab}
      role="tabpanel"
      aria-labelledby={selectedTab}
      className={className}
    >
      {render[selectedTab]}
    </div>
  );
};

export default Tab;
