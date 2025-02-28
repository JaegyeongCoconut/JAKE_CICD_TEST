import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import type { Languages, TabType } from "@repo/types";

type Tabs<T> = T extends readonly TabType<Languages>[]
  ? { key: T[number]["key"]; label: T[number]["label"] }
  : never;

const useTab = <T extends readonly Tabs<T>[]>(tabs: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultTab = tabs[0].key;
  const currentTab = searchParams.get("tab") || defaultTab;
  const selectedTab =
    tabs.find((tab) => tab.key === searchParams.get("tab"))?.key || defaultTab;

  useEffect(() => {
    if (!selectedTab) return;

    const isExistTab = tabs.some((tab) => tab.key === currentTab);

    !isExistTab && setSearchParams({ tab: `${defaultTab}` }, { replace: true });
  }, [selectedTab]);

  return { selectedTab };
};

export default useTab;
