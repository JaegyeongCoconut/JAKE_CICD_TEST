import React, { useEffect } from "react";

import { FormProvider } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import useTab from "@repo/hooks/useTab";

import { INSPECTION_CHECKLIST_TABS } from "~assets";
import { Header } from "~components";
import { LANGUAGE_LABEL, PATH } from "~constants";
import { useServiceTranslation } from "~hooks";
import { useGetInspectionCarCheckList } from "~services";

import * as S from "./Layer.styled";
import useCheckListForm from "../hooks/useCheckListForm";
import EnginePanel from "./containers/panel/engine/EnginePanel";
import ExteriorPanel from "./containers/panel/exterior/ExteriorPanel";
import InteriorPanel from "./containers/panel/interior/InteriorPanel";
import UndersidePanel from "./containers/panel/underside/UndersidePanel";

const Layer = () => {
  const { inspectionId } = useParams();

  const { data } = useGetInspectionCarCheckList(inspectionId!);

  const { defaultLanguage } = useServiceTranslation();
  const { selectedTab } = useTab(INSPECTION_CHECKLIST_TABS);
  const { formMethod } = useCheckListForm({ data });

  const panelRender = {
    exterior: <ExteriorPanel />,
    interior: <InteriorPanel />,
    underside: <UndersidePanel />,
    engine: <EnginePanel />,
  };

  const tabCounter = {
    exterior: `(${formMethod.watch("exteriorCount")} / ${
      data?.exteriorChecklist?.length ?? 0
    })`,
    interior: `(${formMethod.watch("interiorCount")} / ${
      data?.interiorChecklist?.length ?? 0
    })`,
    underside: `(${formMethod.watch("undersideCount")} / ${
      data?.undersideChecklist?.length ?? 0
    })`,
    engine: `(${formMethod.watch("engineCount")} / ${
      data?.engineChecklist?.length ?? 0
    })`,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedTab]);

  return (
    <>
      <S.HeaderWrapper>
        <Header>
          <Header.BackLinkButton
            to={`/${PATH.INSPECTION}/${inspectionId}/${PATH.UPDATE}/${PATH.DEFAULT_INFO}`}
          />
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
                <span>{`${defaultLanguage({ text: label })}${tabCounter[key]}`}</span>
              </Link>
            </S.Tab>
          ))}
        </S.TabList>
      </S.HeaderWrapper>
      <div id={selectedTab} aria-labelledby={selectedTab} role="tabpanel">
        <FormProvider {...formMethod}>{panelRender[selectedTab]}</FormProvider>
      </div>
    </>
  );
};

export default Layer;
