import React from "react";

import { css } from "@emotion/react";
import type { Meta, StoryObj } from "@storybook/react";

import { theme } from "@repo/styles/themes";
import type { Languages } from "@repo/types";
import { filterTableColumns } from "@repo/utils/table";

import Table from "./Table";

const tableHeaderInfos = [
  { key: "column1", label: "Column 1" as Languages, columnWidth: "160px" },
  { key: "column2", label: "Column 2" as Languages, columnWidth: "160px" },
  {
    key: "column3",
    label: "Column 3" as Languages,
    columnWidth: "",
    secondDepthes: [
      { key: "column4", label: "Column 4" as Languages, columnWidth: "160px" },
      { key: "column5", label: "Column 5" as Languages, columnWidth: "160px" },
    ],
  },
];

const table = css`
  height: 210px;
  border-bottom: 1px solid ${theme.color.gray_20};

  & > thead {
    position: static;
  }
`;

const meta = {
  title: "KOKKOK/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component: "데이터를 표 형태로 표시하고 구성하는 UI 컴포넌트",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isLoading: false,
    isInitQueryFilter: false,
    children: Array.from({ length: 3 }, (_, i) => (
      <Table.Row key={i}>
        {filterTableColumns(tableHeaderInfos).map((item, j) => (
          <Table.Td key={item.key}>
            <span>
              {item.label} data {j}
            </span>
          </Table.Td>
        ))}
      </Table.Row>
    )),
    title: "List",
    tableHeaderInfos: tableHeaderInfos,
  },
  argTypes: {
    className: {
      description: "`Table` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    isLoading: {
      description: "`Table` 데이터가 로딩 중인지 여부를 나타냅니다.",
    },
    isInitQueryFilter: {
      description:
        "초기 QueryFilter 상태 여부를 나타냅니다. `true`인 경우 `<Table.InitData />`를 렌더링합니다.",
    },
    children: {
      description:
        "<Table.Row />, <Table.SelectRowMovePage />와 같은 컴포넌트를 전달받습니다.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
    },
    title: {
      description:
        "`Table` 제목입니다. ally를 위해 사용되며, 화면에는 표시되지 않습니다.",
    },
    tableHeaderInfos: {
      description:
        "`Table` 헤더 구성 정보입니다. 각 컬럼의 라벨, 너비, 정렬 방식 등을 정의합니다.",
      table: {
        type: {
          summary:
            "{ key: string, label: string, columnWidth: string, secondDepthes?: { key: string, label: string, columnWidth: string }[] }[]",
        },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Table {...args} css={table} />,
};
