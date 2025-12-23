import type { ComponentProps } from "react";
import React, { forwardRef } from "react";

import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { Languages, QueryFilterStateUnion } from "@repo/types";

import QueryFilterTagBox from "@packages/queryFilter/containers/box/QueryFilterTagBox";
import type * as StyledType from "@packages/queryFilter/containers/box/QueryFilterTagBox.styled";
import type QueryFilterTag from "@packages/queryFilter/containers/box/containers/tag/QueryFilterTag";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// GIVEN: useDefaultLanguage Hook Mocking
vi.mock("@repo/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));
// GIVEN: useQueryFilterStateStore mock 상태 정의
const mockUseQueryFilterStateStore = {
  queryFilters: {} as Record<string, QueryFilterStateUnion> | undefined,
  onUpdateInputValue: vi.fn(),
  onUpdateTagValue: vi.fn(),
};
// DESC: useQueryFilterStateStore hook을 mock하여 selector 기반 반환
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));
// GIVEN: Styled Component Mocking (ref 전달 및 구조 확인용)
vi.mock("@packages/queryFilter/containers/box/QueryFilterTagBox.styled", () => {
  const MockStyledQueryFilterTagBoxWrapper = forwardRef<
    HTMLDivElement,
    ComponentProps<typeof StyledType.QueryFilterTagBoxWrapper>
  >((props, ref) => <div ref={ref}>{props.children}</div>); // DESC: ref를 전달받는 Wrapper Mock
  const MockStyledQueryFilterTagBox = (
    props: ComponentProps<typeof StyledType.QueryFilterTagBox>,
  ) => <div>{props.children}</div>;

  MockStyledQueryFilterTagBoxWrapper.displayName =
    "MockStyledQueryFilterTagBoxWrapper";
  MockStyledQueryFilterTagBox.displayName = "MockStyledQueryFilterTagBox";

  return {
    QueryFilterTagBoxWrapper: MockStyledQueryFilterTagBoxWrapper,
    QueryFilterTagBox: MockStyledQueryFilterTagBox,
  };
});

// GIVEN: QueryFilterTag에 전달되는 props를 수집하기 위한 배열
const queryFilterTagProps: ComponentProps<typeof QueryFilterTag>[] = [];
// GIVEN: QueryFilterTag 컴포넌트 Mocking (전달된 props 검증용)
vi.mock(
  "@packages/queryFilter/containers/box/containers/tag/QueryFilterTag",
  () => ({
    default: (props: ComponentProps<typeof QueryFilterTag>) => {
      // 렌더링 시 props를 배열에 저장
      queryFilterTagProps.push(props);

      return <div data-testid="test-query-filter-tag" />;
    },
  }),
);

beforeEach(() => {
  // GIVEN: ResizeObserver Mocking (DOM 관련 에러 방지) 및 초기화
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );

  // GIVEN: 각 테스트 전 Mock 상태 및 Props 배열 초기화
  queryFilterTagProps.length = 0;
  mockUseQueryFilterStateStore.queryFilters = {};
  mockUseQueryFilterStateStore.onUpdateTagValue.mockClear();
  mockUseQueryFilterStateStore.onUpdateInputValue.mockClear();
});

afterEach(() => {
  // GIVEN: 전역 Mock 해제
  vi.unstubAllGlobals();
});

describe("QueryFilterTagBox Test", () => {
  test("queryFilters가 undefined이면 아무 것도 렌더되지 않음", () => {
    // GIVEN: queryFilters 상태가 undefined인 경우
    mockUseQueryFilterStateStore.queryFilters = undefined;

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <QueryFilterTagBox />,
    });

    // THEN: 아무런 DOM 요소도 렌더링되지 않았는지 확인
    expect(container.firstChild).toBeNull();
    expect(queryFilterTagProps).toHaveLength(0);
  });

  describe("초기 렌더 및 구조 검증", () => {
    describe("type=QUERY_FILTER_TYPE.CALENDAR", () => {
      const baseCalendarFilter = {
        type: QUERY_FILTER_TYPE.CALENDAR,
        queryKey: "created" as const,
        label: "Created" as Languages,
        placeholder: "날짜" as Languages,
      };

      test("tagValue가 비어있으면 렌더되지 않음", () => {
        mockUseQueryFilterStateStore.queryFilters = {
          created: {
            ...baseCalendarFilter,
            calendarType: "free",
            tagValue: [],
          },
        };

        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryFilterTagProps).toHaveLength(0);
        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
      });

      test(`isExpanded=false는 항상 false이고, 
            calendarType=free일 때 start/end가 모두 있으면 
            'start ~ end'로 content가 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          created: {
            ...baseCalendarFilter,
            calendarType: "free",
            tagValue: ["2024-02-01", "2024-02-05"],
          },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Created");
        expect(props.isExpanded).toBe(false);
        expect(props.content).toBe("2024-02-01 ~ 2024-02-05");
      });

      test(`isExpanded=false는 항상 false이고, 
            calendarType=date일 때 start만 존재하면 start만 content로 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          created: {
            ...baseCalendarFilter,
            calendarType: "date",
            tagValue: ["2024-03-10"],
          },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(props.content).toBe("2024-03-10");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });
    });

    describe("type=QUERY_FILTER_TYPE.CHECKBOX", () => {
      // GIVEN: CHECKBOX 필터 생성자 정의
      const selections = [
        { key: "client", label: "Client" as Languages },
        { key: "customer", label: "Customer" as Languages },
        { key: "driver", label: "Driver" as Languages },
      ] as const;
      const baseCheckboxFilter = {
        type: QUERY_FILTER_TYPE.CHECKBOX,
        queryKey: "status",
        label: "Status" as Languages,
        selections,
      };

      test("tagValue가 없다면, 아무 것도 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryFilterTagProps).toHaveLength(0);
        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
      });

      test(`hasAllCheckButton=false이면, 올바른 props가 전달되고 
            content는 콤마(,)가 포함된 문자열이 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          status: {
            ...baseCheckboxFilter,
            hasAllCheckButton: false,
            tagValue: ["client", "customer"],
          },
        };

        const { container } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        const queryFilterTag = container.children[0];

        expect(queryFilterTag).toBeInTheDocument();

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Status");
        expect(props.isExpanded).toBe(true);
        expect(props.content).toBe("Client, Customer");
        expect(typeof props.handleTagDeleteButtonClick).toBe("function");
        expect(props.wrapperWidth).toBe(0);
      });

      test(`hasAllCheckButton=true이고 tagValue.length=selections.length이면 
            올바른 props가 전달되고 content는 'All' 문자열이 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          status: {
            ...baseCheckboxFilter,
            hasAllCheckButton: true,
            tagValue: ["client", "customer", "driver"],
          },
        };

        const { container } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        const queryFilterTag = container.children[0];

        expect(queryFilterTag).toBeInTheDocument();

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Status");
        expect(props.isExpanded).toBe(true);
        expect(props.content).toBe(LANGUAGE_LABEL.ALL);
        expect(typeof props.handleTagDeleteButtonClick).toBe("function");
        expect(props.wrapperWidth).toBe(0);
      });

      test(`hasAllCheckButton=true이어도 
            tagValue 길이가 selections보다 짧으면 
            'All'이 아닌 실제 선택 라벨들이 content로 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          status: {
            ...baseCheckboxFilter,
            hasAllCheckButton: true,
            tagValue: ["client", "customer"],
          },
        };

        const { container } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        const queryFilterTag = container.children[0];

        expect(queryFilterTag).toBeInTheDocument();

        const [props] = queryFilterTagProps;

        expect(props.content).toBe("Client, Customer");
        expect(props.isExpanded).toBe(true);
      });
    });

    describe("type=QUERY_FILTER_TYPE.DROPDOWN", () => {
      const baseDropdownFilter = {
        type: QUERY_FILTER_TYPE.DROPDOWN,
        queryKey: "type",
        label: "Type" as Languages,
        placeholder: "선택" as Languages,
        selections: [
          { key: "type-a", label: "Type A" as Languages },
          { key: "type-b", label: "Type B" as Languages },
        ],
      };

      test("tagValue가 없다면, 아무 것도 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
        expect(queryFilterTagProps).toHaveLength(0);
      });

      test(`isExpanded=false는 false이고, 
            tagValue가 selections에 포함된 경우, 라벨이 content로 전달됨`, () => {
        mockUseQueryFilterStateStore.queryFilters = {
          type: { ...baseDropdownFilter, tagValue: "type-b" },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Type");
        expect(props.content).toBe("Type B");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });

      test("tagValue가 selections에 없는 값이면 렌더되지 않음", () => {
        mockUseQueryFilterStateStore.queryFilters = {
          type: { ...baseDropdownFilter, tagValue: "type-c" },
        };

        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
        expect(queryFilterTagProps).toHaveLength(0);
      });
    });

    describe("type=QUERY_FILTER_TYPE.INPUT", () => {
      const baseInputFilter = {
        type: QUERY_FILTER_TYPE.INPUT,
        queryKey: "code",
        label: "Code" as Languages,
        placeholder: "코드를 입력하세요" as Languages,
        maxLength: 10,
        inputValue: "",
      };

      test("tagValue가 빈 문자열이면 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
        expect(queryFilterTagProps).toHaveLength(0);
      });

      test("isExpanded=false이고, tagValue가 존재하면 content로 전달됨", () => {
        mockUseQueryFilterStateStore.queryFilters = {
          code: {
            ...baseInputFilter,
            tagValue: "ABC-123",
            inputValue: "ABC-123",
          },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Code");
        expect(props.content).toBe("ABC-123");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });
    });

    describe("type=QUERY_FILTER_TYPE.INPUT_REGEXP", () => {
      const baseInputFilter = {
        type: QUERY_FILTER_TYPE.INPUT_REGEXP,
        queryKey: "code",
        label: "Code" as Languages,
        placeholder: "코드를 입력하세요" as Languages,
        maxLength: 10,
        regExp: /[^0-9]/g,
        inputValue: "",
      };

      test("tagValue가 빈 문자열이면 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
        expect(queryFilterTagProps).toHaveLength(0);
      });

      test("isExpanded=false이고, tagValue가 존재하면 content로 전달됨", () => {
        mockUseQueryFilterStateStore.queryFilters = {
          code: {
            ...baseInputFilter,
            tagValue: "ABC",
            inputValue: "ABC-123",
          },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Code");
        expect(props.content).toBe("ABC");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });
    });

    describe("type=QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH", () => {
      const baseInputFilter = {
        type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
        queryKey: "code",
        label: "Code" as Languages,
        placeholder: "코드를 입력하세요" as Languages,
        maxLength: 10,
        regExp: /[^0-9]/g,
        inputValue: "",
      };

      test("tagValue가 빈 문자열이면 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
        expect(queryFilterTagProps).toHaveLength(0);
      });

      test("isExpanded=false이고, tagValue가 존재하면 content로 전달됨", () => {
        mockUseQueryFilterStateStore.queryFilters = {
          code: {
            ...baseInputFilter,
            tagValue: "ABC",
            inputValue: "ABC-123",
          },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Code");
        expect(props.content).toBe("ABC");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });
    });

    describe("type=QUERY_FILTER_TYPE.RADIO", () => {
      const baseRadioFilter = {
        type: QUERY_FILTER_TYPE.RADIO,
        queryKey: "status",
        label: "Status" as Languages,
        selections: [{ key: "approved", label: "Approved" as Languages }],
      };

      test("tagValue가 없다면, 아무 것도 렌더되지 않음", () => {
        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
      });

      test("isExpanded=false이고, tagValue가 selections에 포함된 경우, 라벨이 content로 전달됨", () => {
        // GIVEN: 유효한 tagValue가 있는 상태
        mockUseQueryFilterStateStore.queryFilters = {
          status: { ...baseRadioFilter, tagValue: "approved" },
        };

        renderComponent({ ui: <QueryFilterTagBox /> });

        const [props] = queryFilterTagProps;

        // THEN: TagProps 확인
        expect(queryFilterTagProps).toHaveLength(1);
        expect(props.label).toBe("Status");
        expect(props.content).toBe("Approved");
        expect(props.isExpanded).toBe(false);
        expect(props.wrapperWidth).toBe(0);
      });

      test("tagValue가 selections에 없는 값이면 렌더되지 않음", () => {
        // GIVEN: selections에 없는 무효한 tagValue가 있는 상태
        mockUseQueryFilterStateStore.queryFilters = {
          status: { ...baseRadioFilter, tagValue: "rejected" },
        };

        const { queryByTestId } = renderComponent({
          ui: <QueryFilterTagBox />,
        });

        // THEN: Tag 컴포넌트가 렌더링되지 않았는지 확인
        expect(queryByTestId("test-query-filter-tag")).not.toBeInTheDocument();
      });
    });

    describe("handleTagDeleteButtonClick 동작 검증", () => {
      // DESC: tagValue가 배열인 타입 (CHECKBOX, CALENDAR) 테스트
      it.each([
        {
          type: QUERY_FILTER_TYPE.CHECKBOX,
          expectedOptions: "array" as const,
          queryKey: "status",
          label: "Status" as Languages,
          setupFilter: () => ({
            status: {
              type: QUERY_FILTER_TYPE.CHECKBOX,
              queryKey: "status",
              label: "Status" as Languages,
              selections: [{ key: "a", label: "A" as Languages }],
              hasAllCheckButton: false,
              tagValue: ["a"],
            },
          }),
          expectedSelectedKey: [],
        },
        {
          type: QUERY_FILTER_TYPE.CALENDAR,
          expectedOptions: "array" as const,
          queryKey: "created",
          label: "Created" as Languages,
          setupFilter: () => ({
            created: {
              type: QUERY_FILTER_TYPE.CALENDAR,
              queryKey: "created" as const,
              label: "Created" as Languages,
              placeholder: "날짜" as Languages,
              calendarType: "free" as const,
              tagValue: ["2024-01-01", "2024-01-02"],
            },
          }),
          expectedSelectedKey: [],
        },
      ])(
        "$type 타입에서 tagValue는 빈 배열이 되고 inputValue를 빈 문자열로 초기화됨",
        ({ setupFilter, queryKey, expectedSelectedKey, expectedOptions }) => {
          // GIVEN: 필터 상태 설정
          mockUseQueryFilterStateStore.queryFilters = setupFilter();

          renderComponent({ ui: <QueryFilterTagBox /> });

          const [props] = queryFilterTagProps;

          expect(props).toBeDefined();

          // WHEN: 삭제 버튼 클릭
          props.handleTagDeleteButtonClick();

          // THEN: 1. onUpdateTagValue가 빈 배열로 호출되었는지 확인
          expect(
            mockUseQueryFilterStateStore.onUpdateTagValue,
          ).toHaveBeenCalledWith({
            options: expectedOptions,
            queryKey,
            selectedKey: expectedSelectedKey,
          });
          // THEN: 2. onUpdateInputValue가 빈 문자열로 호출되었는지 확인
          expect(
            mockUseQueryFilterStateStore.onUpdateInputValue,
          ).toHaveBeenCalledWith({ queryKey, inputValue: "" });
        },
      );

      // DESC: tagValue가 단일 값인 타입 (RADIO, DROPDOWN, INPUT 계열) 테스트
      it.each([
        {
          type: QUERY_FILTER_TYPE.RADIO,
          queryKey: "status",
          setupFilter: () => ({
            status: {
              type: QUERY_FILTER_TYPE.RADIO,
              queryKey: "status",
              label: "Status" as Languages,
              selections: [{ key: "approved", label: "Approved" as Languages }],
              tagValue: "approved",
            },
          }),
        },
        {
          type: QUERY_FILTER_TYPE.DROPDOWN,
          queryKey: "type",
          setupFilter: () => ({
            type: {
              type: QUERY_FILTER_TYPE.DROPDOWN,
              queryKey: "type",
              label: "Type" as Languages,
              placeholder: "선택" as Languages,
              selections: [{ key: "type-a", label: "Type A" as Languages }],
              tagValue: "type-a",
            },
          }),
        },
        {
          type: QUERY_FILTER_TYPE.INPUT,
          queryKey: "code",
          setupFilter: () => ({
            code: {
              type: QUERY_FILTER_TYPE.INPUT,
              queryKey: "code",
              label: "Code" as Languages,
              placeholder: "코드" as Languages,
              maxLength: 10,
              inputValue: "ABC",
              tagValue: "ABC",
            },
          }),
        },
        {
          type: QUERY_FILTER_TYPE.INPUT_REGEXP,
          queryKey: "pattern",
          setupFilter: () => ({
            pattern: {
              type: QUERY_FILTER_TYPE.INPUT_REGEXP,
              queryKey: "pattern",
              label: "Pattern" as Languages,
              placeholder: "정규식" as Languages,
              maxLength: 10,
              regExp: /./,
              inputValue: "XYZ",
              tagValue: "XYZ",
            },
          }),
        },
        {
          type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
          queryKey: "full",
          setupFilter: () => ({
            full: {
              type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
              queryKey: "full",
              label: "Full" as Languages,
              placeholder: "전체 길이" as Languages,
              maxLength: 10,
              regExp: /./,
              inputValue: "FULL",
              tagValue: "FULL",
            },
          }),
        },
      ])(
        "$type 타입에서 tagValue와 inputValue 둘다 빈 문자열로 초기화됨",
        ({ setupFilter, queryKey }) => {
          // GIVEN: 필터 상태 설정
          mockUseQueryFilterStateStore.queryFilters = setupFilter();

          renderComponent({ ui: <QueryFilterTagBox /> });
          const [props] = queryFilterTagProps;

          expect(props).toBeDefined();

          // WHEN: 삭제 버튼 클릭
          props.handleTagDeleteButtonClick();

          // THEN: 1. onUpdateTagValue가 빈 문자열로 호출되었는지 확인
          expect(
            mockUseQueryFilterStateStore.onUpdateTagValue,
          ).toHaveBeenCalledWith({
            options: "single", // 단일 값 타입
            queryKey,
            selectedKey: "",
          });
          // THEN: 2. onUpdateInputValue가 빈 문자열로 호출되었는지 확인
          expect(
            mockUseQueryFilterStateStore.onUpdateInputValue,
          ).toHaveBeenCalledWith({ queryKey, inputValue: "" });
        },
      );
    });

    test(`ResizeObserver가 width 변화를 감지해 
          wrapperWidth를 업데이트하고 언마운트 시 disconnect를 호출함`, () => {
      type MockResizeObserverCallback = () => void;

      // GIVEN: ResizeObserver의 observe, disconnect 함수 Mock 및 콜백 캡처
      const mockObserve = vi.fn();
      const mockDisconnect = vi.fn();
      let resizeObserverCallback: MockResizeObserverCallback | undefined;

      vi.stubGlobal(
        "ResizeObserver",
        vi.fn((callback: MockResizeObserverCallback) => {
          resizeObserverCallback = callback; // DESC: 콜백 함수 저장
          return { observe: mockObserve, disconnect: mockDisconnect };
        }),
      );

      // GIVEN: 필터 상태 설정 (태그가 렌더링되도록)
      mockUseQueryFilterStateStore.queryFilters = {
        code: {
          type: QUERY_FILTER_TYPE.INPUT,
          queryKey: "code",
          label: "Code" as Languages,
          placeholder: "코드" as Languages,
          maxLength: 10,
          inputValue: "ABC",
          tagValue: "ABC",
        },
      };

      // WHEN: 컴포넌트 마운트
      const { container, unmount } = renderComponent({
        ui: <QueryFilterTagBox />,
      });

      const wrapper = container.firstElementChild;

      // THEN: 1. 마운트 시 observe가 Wrapper 요소와 함께 호출되었는지 확인
      expect(mockObserve).toHaveBeenCalledWith(wrapper);

      // GIVEN: Wrapper의 offsetWidth를 Mock (크기 변화 시뮬레이션)
      Object.defineProperty(wrapper, "offsetWidth", {
        configurable: true,
        value: 480,
      });

      // WHEN: ResizeObserver 콜백 함수 호출 (크기 변경 이벤트 발생 시뮬레이션)
      act(() => resizeObserverCallback?.());

      const latestProps = queryFilterTagProps.at(-1);

      // THEN: 2. ResizeObserver의 결과값 (480)이 QueryFilterTag의 wrapperWidth prop에 전달되었는지 확인
      expect(latestProps?.wrapperWidth).toBe(480);

      // WHEN: 컴포넌트 언마운트
      unmount();

      // THEN: 3. 언마운트 시 disconnect가 호출되었는지 확인
      expect(mockDisconnect).toHaveBeenCalledOnce();
    });
  });
});
