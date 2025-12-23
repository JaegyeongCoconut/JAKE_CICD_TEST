import type { ComponentProps } from "react";
import React from "react";

import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import QueryFilterRow from "@packages/queryFilter/containers/row/QueryFilterRow";
import type * as StyledType from "@packages/queryFilter/containers/row/QueryFilterRow.styled";

vi.mock("@packages/queryFilter/containers/row/QueryFilterRow.styled", () => {
  const MockStyledQueryFilterRow = (
    props: ComponentProps<typeof StyledType.QueryFilterRow>,
  ) => {
    // GIVEN: 렌더링 결과 (className 및 partition 확인용 data-attribute)
    return (
      <div className={props.className} data-partition={props.partition}>
        {props.children}
      </div>
    );
  };

  return { QueryFilterRow: MockStyledQueryFilterRow };
});

describe("QueryFilterRow Test", () => {
  test("QueryFilterRow 렌더 시, children이 하나이고 hasPartition=false이면 partition=1로 렌더됨", () => {
    // GIVEN: 자식 요소 1개, hasPartition=false (기본)
    const { container } = render(
      <QueryFilterRow hasPartition={false}>
        <div data-testid="test-child-1" />
      </QueryFilterRow>,
    );

    // THEN: 1. 루트 요소는 하나여야 함
    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 2. children이 1개이고 hasPartition=false이므로 partition은 1로 설정됨
    expect(wrapper).toHaveAttribute("data-partition", "1");
    // THEN: 3. 자식 요소가 올바르게 렌더링되었는지 확인
    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.children[0]).toHaveAttribute("data-testid", "test-child-1");
  });

  test("QueryFilterRow 렌더 시, children이 하나일 때 hasPartition=true이면 partition=2로 렌더됨", () => {
    // GIVEN: 자식 요소 1개, hasPartition=true
    const { container } = render(
      <QueryFilterRow hasPartition>
        <div data-testid="test-child-1" />
      </QueryFilterRow>,
    );

    // THEN: 1. 루트 요소는 하나여야 함
    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 2. children이 1개이지만 hasPartition=true이므로 partition은 2로 설정됨
    expect(wrapper).toHaveAttribute("data-partition", "2");
    // THEN: 3. 자식 요소 개수 확인
    expect(wrapper.children).toHaveLength(1);
  });

  test("QueryFilterRow 렌더 시, children이 배열이면 partition=2로 렌더됨", () => {
    // GIVEN: 자식 요소가 2개의 배열 형태로 전달됨 (children.length > 1)
    const { container } = render(
      <QueryFilterRow>
        {[
          <div key="1" data-testid="test-child-1" />,
          <div key="2" data-testid="test-child-2" />,
        ]}
      </QueryFilterRow>,
    );

    const wrapper = container.children[0];

    // THEN: 1. children이 배열(2개)이므로 partition은 2로 설정됨
    expect(wrapper).toHaveAttribute("data-partition", "2");
    // THEN: 2. 모든 자식 요소가 올바르게 렌더링되었는지 확인
    expect(wrapper.children).toHaveLength(2);
    expect(wrapper.children[0]).toHaveAttribute("data-testid", "test-child-1");
    expect(wrapper.children[1]).toHaveAttribute("data-testid", "test-child-2");
  });

  test("QueryFilterRow 렌더 시, className의 props가 올바르게 전달됨", () => {
    // GIVEN: className prop을 포함하여 렌더링
    const { container } = render(
      <QueryFilterRow className="test-class">
        {[
          <div key="1" data-testid="test-child-1" />,
          <div key="2" data-testid="test-child-2" />,
        ]}
      </QueryFilterRow>,
    );

    const wrapper = container.children[0];

    // THEN: 1. className이 Styled Component Wrapper에 올바르게 적용되었는지 확인
    expect(wrapper).toHaveClass("test-class");
  });
});
