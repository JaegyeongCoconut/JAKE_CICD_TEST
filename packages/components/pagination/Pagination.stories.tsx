import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

const meta = {
  title: "KOKKOK/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          "페이지 이동 및 현재 페이지를 사용자에게 보여주는 UI 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    currentPage: 1,
    totalPages: 20,
    maxPageCount: 10,
    handlePreviousPageClick: () => {},
    handleFirstPageClick: () => {},
    handleNextPageClick: () => {},
    handleLastPageClick: () => {},
    handleNumberClick: () => () => {},
  },
  argTypes: {
    className: {
      description: "`Pagination` 스타일을 커스텀하기 위해 사용합니다.",
      control: false,
    },
    currentPage: {
      description: "현재 페이지 번호를 의미합니다.",
      control: false,
    },
    totalPages: { description: "전체 페이지 수를 나타냅니다." },
    maxPageCount: {
      description:
        "`Pagination`에서 한 번에 표시할 최대 페이지 번호 버튼 개수를 지정합니다.",
    },
    handlePreviousPageClick: {
      description:
        "`<` 버튼 클릭 시 이전 페이지로 이동하는 handler 함수입니다.",
      control: false,
    },
    handleFirstPageClick: {
      description:
        "`<<` 버튼 클릭 시 첫번째 페이지로 이동하는 handler 함수입니다.",
      control: false,
    },
    handleNextPageClick: {
      description:
        "`>` 버튼 클릭 시 다음 페이지로 이동하는 handler 함수입니다.",
      control: false,
    },
    handleLastPageClick: {
      description:
        "`>>` 버튼 클릭 시 마지막 페이지로 이동하는 handler 함수입니다.",
      control: false,
    },
    handleNumberClick: {
      description:
        "페이지 번호 클릭 시 해당 페이지로 이동하는 handler 함수입니다.",
      control: false,
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState<number>(args.currentPage);

    const handlePreviousPageClick = (): void =>
      setCurrentPage((prev) => prev - 1);
    const handleFirstPageClick = (): void => setCurrentPage(1);
    const handleNextPageClick = (): void => setCurrentPage((prev) => prev + 1);
    const handleLastPageClick = (): void => setCurrentPage(args.totalPages);
    const handleNumberClick = (idx: number) => (): void => setCurrentPage(idx);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        handleFirstPageClick={handleFirstPageClick}
        handleLastPageClick={handleLastPageClick}
        handleNextPageClick={handleNextPageClick}
        handleNumberClick={handleNumberClick}
        handlePreviousPageClick={handlePreviousPageClick}
      />
    );
  },
};
