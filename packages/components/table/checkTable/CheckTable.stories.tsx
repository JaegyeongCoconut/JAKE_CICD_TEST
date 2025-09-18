import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react";

import useCheckTableWithCondition from "@repo/hooks/table/useCheckTableWithCondition";
import type { Languages } from "@repo/types";
import { renderDefault } from "@repo/utils/render";

import CheckTable from "./CheckTable";
import Checkbox from "../../button/checkbox/Checkbox";
import GhostButton from "../../button/ghost/GhostButton";

const table = css`
  height: 170px;

  & > thead {
    position: static;
  }
`;

const CheckTableWrapper = styled.div`
  & > div {
    position: static;
  }
`;

const tableHeaderInfos = [
  { key: "column1", label: "Column 1" as Languages, columnWidth: "160px" },
  { key: "column2", label: "Column 2" as Languages, columnWidth: "160px" },
  { key: "column3", label: "Column 3" as Languages, columnWidth: "160px" },
] as const;

const meta = {
  title: "KOKKOK/Table/CheckTable",
  component: CheckTable,
  parameters: {
    docs: {
      description: {
        component: "사용자가 특정 데이터를 선택할 수 있는 표 형태 UI 컴포넌트",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    tableHeaderInfos: tableHeaderInfos,
    isLoading: false,
    isInitQueryFilter: false,
    toolButtons: (
      <>
        <GhostButton variant="ghost" label="Pin" handleButtonClick={() => {}} />
        <GhostButton
          variant="ghost"
          label="Unpin"
          handleButtonClick={() => {}}
        />
        <GhostButton
          variant="ghost_red"
          label="Delete"
          handleButtonClick={() => {}}
        />
      </>
    ),
    title: "List",
    selectedCount: 0,
    isAllChecked: false,
    handleAllCheck: () => {},
    handleAllUnCheck: () => {},
  },
  argTypes: {
    className: {
      description: "`CheckTable` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    tableHeaderInfos: {
      description:
        "`CheckTable` 헤더 구성 정보입니다. 각 컬럼의 라벨, 너비, 정렬 방식 등을 정의합니다.",
      control: false,
      table: {
        type: {
          summary:
            "{ key: string, label: string, columnWidth: string, secondDepthes?: { key: string, label: string, columnWidth: string }[] }[]",
        },
      },
    },
    children: {
      description:
        "<CheckTable.Row />, <CheckTable.SelectRow />와 같은 컴포넌트를 전달받습니다.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
    },
    isLoading: {
      description: "`CheckTable` 데이터 로딩 상태를 나타냅니다.",
    },
    isInitQueryFilter: {
      description:
        "초기 QueryFilter 상태 여부를 나타냅니다. `true`인 경우 `<CheckTable.InitData />`를 렌더링합니다.",
    },
    toolButtons: {
      description:
        "`CheckTable` 상단 도구 버튼 영역에 표시할 컴포넌트를 전달합니다.",
      control: false,
    },
    title: {
      description:
        "`CheckTable` 제목입니다. ally를 위해 사용되며, 화면에는 표시되지 않습니다.",
    },
    selectedCount: {
      description: "`CheckTable`에서 현재 선택된 행(Row)의 개수를 의미합니다.",
      control: false,
    },
    isAllChecked: {
      description: "`CheckTable`의 전체 선택 체크박스 상태를 나타냅니다.",
      control: false,
    },
    handleAllCheck: {
      description:
        "`CheckTable`에서 전체 행을 선택할 때 호출되는 handler 함수입니다.",
    },
    handleAllUnCheck: {
      description:
        "`CheckTable`에서 전체 행 선택을 해제할 때 호출되는 handler 함수입니다.",
    },
  },
  decorators: [
    (Story) => {
      return (
        <CheckTableWrapper>
          <Story />
        </CheckTableWrapper>
      );
    },
  ],
} satisfies Meta<typeof CheckTable>;

export default meta;
type Story = StoryObj<typeof CheckTable>;

export const Default: Story = {
  render: (args) => {
    const dummyTableData = [
      {
        id: "1",
        column1: "Column 1 data 1",
        column2: "Column 1 data 2",
        column3: "Column 1 data 3",
        isSelected: false,
      },
      {
        id: "2",
        column1: "Column 2 data 1",
        column2: "Column 2 data 2",
        column3: "Column 2 data 3",
        isSelected: false,
      },
      {
        id: "3",
        column1: "Column 3 data 1",
        column2: "Column 3 data 2",
        column3: "Column 3 data 3",
        isSelected: false,
      },
    ];

    const {
      isChecked,
      isAllChecked,
      checkedIds,
      handleCheck,
      handleAllCheck,
      handleAllUnCheck,
    } = useCheckTableWithCondition({ tableDatas: dummyTableData ?? [] });

    return (
      <CheckTable
        {...args}
        css={table}
        isAllChecked={isAllChecked()}
        selectedCount={checkedIds?.length}
        handleAllCheck={handleAllCheck}
        handleAllUnCheck={handleAllUnCheck}
      >
        {dummyTableData.map((item, i) => (
          <CheckTable.Row key={i}>
            <CheckTable.CheckTd>
              <Checkbox
                isChecked={isChecked(item?.id)}
                handleCheck={handleCheck(item?.id)}
              />
            </CheckTable.CheckTd>
            {tableHeaderInfos.map(({ key }) => (
              <CheckTable.Td key={key}>
                {renderDefault(item[key])}
              </CheckTable.Td>
            ))}
          </CheckTable.Row>
        ))}
      </CheckTable>
    );
  },
};
