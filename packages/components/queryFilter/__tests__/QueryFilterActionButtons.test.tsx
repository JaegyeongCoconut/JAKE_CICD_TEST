import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";
import { describe, expect, test, vi } from "vitest";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import type Button from "@packages/button/Button";
import QueryFilterActionButtons from "@packages/queryFilter/containers/actionButtons/QueryFilterActionButtons";
import type * as StyledType from "@packages/queryFilter/containers/actionButtons/QueryFilterActionButtons.styled";

import renderComponent from "@tests/renderComponent";

// GIVEN: react-router-dom의 useSearchParams Hook Mocking
const mockSearchParams = new URLSearchParams(); // DESC: URLSearchParams 인스턴스 Mock
const mockSetSearchParams = vi.fn(); // DESC: setSearchParams 함수 Mock (호출 검증용)
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    // DESC: useSearchParams를 Mock하여 제어된 인스턴스와 함수를 반환
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

// GIVEN: useQueryFilterStateStore의 mock 상태 정의 및 함수 추적
const mockUseQueryFilterStateStore = {
  queryFilters: {}, // DESC: 각 테스트에서 필터 상태 주입
  onResetAllValues: vi.fn(), // DESC: Reset 버튼 클릭 시 호출 검증용 Mock
};
// GIVEN: useQueryFilterStateStore hook을 mock
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));

// GIVEN: useQueryFilterStore: 초기화 상태 (isInitQueryFilter) Mock
const mockUseQueryFilterStore = {
  isInitQueryFilter: false,
  setIsInitQueryFilter: vi.fn(), // DESC: Apply 버튼 클릭 시 호출 검증용 Mock
};
// GIVEN: useQueryFilterStore Mocking
vi.mock("@repo/stores/queryFilter", () => ({
  useQueryFilterStore: (
    selector: (store: typeof mockUseQueryFilterStore) => unknown,
  ) => selector(mockUseQueryFilterStore),
}));

// GIVEN: Styled Component Mocking (Wrapper의 props 확인용)
vi.mock(
  "@packages/queryFilter/containers/actionButtons/QueryFilterActionButtons.styled",
  () => {
    const MockStyledQueryFilterActionButtonsWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterActionButtonsWrapper>,
    ) => (
      // DESC: className과 marginButton prop이 전달되었는지 확인하기 위한 data-* 속성 사용
      <div className={props.className} data-margin-button={props.marginButton}>
        {props.children}
      </div>
    );

    return {
      QueryFilterActionButtonsWrapper:
        MockStyledQueryFilterActionButtonsWrapper,
    };
  },
);
// GIVEN: Button 컴포넌트 Mocking (클릭 이벤트, props 확인용)
vi.mock("@packages/button/Button", () => {
  const MockButton = (props: ComponentProps<typeof Button>) => (
    <button
      data-is-loading={!!props.isLoading}
      data-testid={`test-button-${props.variant}`} // variant로 버튼 구별
      disabled={props.disabled}
      onClick={props.handleButtonClick}
    >
      {props.label}
    </button>
  );

  return { default: MockButton };
});

describe("QueryFilterActionButtons Test", () => {
  const user = userEvent.setup();

  test(`QueryFilterActionButtons 렌더 시, 
        S.QueryFilterActionButtonsWrapper에 className, marginButton props가 전달되고
        children으로 Button 컴포넌트가 렌더됨`, async () => {
    // GIVEN: Reset/Apply 버튼 활성화를 위해 값이 있는 필터 상태 Mock
    mockUseQueryFilterStateStore.queryFilters = {
      code: {
        inputValue: "",
        queryKey: "code",
        tagValue: "1234",
        type: "input",
      },
    };

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterActionButtons
          className="test-class"
          isLoadingApplyButton={false}
          marginButton={10}
        />
      ),
    });

    // THEN: 1. Wrapper의 Props 확인
    const wrapper = container.children[0];

    expect(wrapper).toHaveClass("test-class");
    expect(wrapper).toHaveAttribute("data-margin-button", "10");
    expect(wrapper.children).toHaveLength(2);

    // THEN: 2. Reset 버튼 (Secondary) 렌더링 확인
    const resetButton = wrapper.children[0];

    expect(resetButton).toHaveAttribute("data-testid", "test-button-secondary");
    expect(resetButton).toHaveAttribute("data-is-loading", "false");
    expect(resetButton).toBeEnabled();
    expect(resetButton).toHaveTextContent(LANGUAGE_LABEL.RESET);

    // WHEN: Reset 버튼 클릭
    await user.click(resetButton);

    // THEN: Reset 버튼 클릭 시 onResetAllValues 함수 호출 확인
    expect(
      mockUseQueryFilterStateStore.onResetAllValues,
    ).toHaveBeenCalledOnce();

    // THEN: 3. Apply 버튼 (Primary) 렌더링 확인
    const applyButton = wrapper.children[1];

    expect(applyButton).toHaveAttribute("data-testid", "test-button-primary");
    expect(applyButton).toHaveAttribute("data-is-loading", "false");
    expect(applyButton).toBeEnabled();
    expect(applyButton).toHaveTextContent(LANGUAGE_LABEL.APPLY);

    // WHEN: Apply 버튼 클릭
    await user.click(applyButton);

    // THEN: Apply 버튼 클릭 시 URL 업데이트 함수 호출 확인
    expect(mockSetSearchParams).toHaveBeenCalledOnce();
  });

  describe("버튼 disabled 로직 검증", () => {
    test("모든 필터의 tagValue가 비어있을 때 (length=0), Reset 버튼이 disabled 상태인지 확인", () => {
      // GIVEN: 모든 필터의 tagValue가 빈 값인 상태
      mockUseQueryFilterStateStore.queryFilters = {
        code: { tagValue: "", type: "input", queryKey: "code" },
        status: { tagValue: [], type: "radio", queryKey: "status" },
      };

      // WHEN: 컴포넌트 렌더링
      const { getByTestId } = renderComponent({
        ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
      });

      const resetButton = getByTestId("test-button-secondary");

      // THEN: Reset 버튼이 disabled 상태인지 확인
      expect(resetButton).toBeDisabled();
    });

    test("하나라도 tagValue에 값이 있을 때 (length > 0), Reset 버튼이 abled 상태인지 확인", () => {
      // GIVEN: 하나 이상의 필터에 tagValue가 있는 상태
      mockUseQueryFilterStateStore.queryFilters = {
        activeFilter: {
          tagValue: "some_value", // DESC: 필수가 아니면서 값이 있음 (활성화 조건 충족)
          isRequired: false,
          type: "input",
          queryKey: "active",
        },
        inactiveFilter: {
          tagValue: [],
          isRequired: false,
          type: "radio",
          queryKey: "inactive",
        },
      };

      // WHEN: 컴포넌트 렌더링
      const { getByTestId } = renderComponent({
        ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
      });

      const resetButton = getByTestId("test-button-secondary");

      // THEN: Reset 버튼이 활성화(abled) 상태인지 확인
      expect(resetButton).toBeEnabled();
    });

    test("필수(isRequired=true) 필터의 tagValue가 비어있을 때, Apply 버튼이 disabled 상태인지 확인", () => {
      // GIVEN: 필수 필터(requiredCode)의 tagValue가 빈 값인 상태
      mockUseQueryFilterStateStore.queryFilters = {
        requiredCode: {
          tagValue: "",
          isRequired: true, // DESC: 필수 필터의 값이 비어있음 (비활성화 조건)
          type: "input",
          queryKey: "required_code",
        },
        optionalStatus: {
          tagValue: ["tagValue"],
          isRequired: false,
          type: "radio",
          queryKey: "optional_status",
        },
      };

      // WHEN: 컴포넌트 렌더링
      const { getByTestId } = renderComponent({
        ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
      });

      const applyButton = getByTestId("test-button-primary");

      // THEN: Apply 버튼이 disabled 상태인지 확인
      expect(applyButton).toBeDisabled();
    });

    test("모든 필수 필터의 tagValue에 값이 있을 때, Apply 버튼이 abled 상태인지 확인", () => {
      // GIVEN: 모든 필수 필터의 tagValue에 값이 있는 상태
      mockUseQueryFilterStateStore.queryFilters = {
        requiredCode: {
          tagValue: "A123",
          isRequired: true, // DESC: 필수 필터 값 존재
          type: "input",
          queryKey: "requiredCode",
        },
        created: {
          tagValue: ["2025-01-01"],
          isRequired: true, // DESC: 필수 필터 값 존재
          type: "calendar",
          queryKey: "created",
        },
        status: {
          tagValue: "",
          isRequired: false,
          type: "radio",
          queryKey: "status",
        },
      };

      // WHEN: 컴포넌트 렌더링
      const { getByTestId } = renderComponent({
        ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
      });

      const applyButton = getByTestId("test-button-primary");

      // THEN: Apply 버튼이 활성화(abled) 상태인지 확인
      expect(applyButton).toBeEnabled();
    });
  });

  test("Reset 버튼 클릭 시, onResetAllValues 함수가 호출되는지 확인", async () => {
    // GIVEN: Reset 버튼을 활성화하기 위해 queryFilters에 값이 있는 상태를 Mocking
    mockUseQueryFilterStateStore.queryFilters = {
      activeFilter: {
        tagValue: "some_value",
        isRequired: false,
        type: "input",
        queryKey: "active",
      },
    };
    mockUseQueryFilterStateStore.onResetAllValues.mockClear();

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
    });

    const resetButton = getByTestId("test-button-secondary");

    // THEN: 버튼이 활성화되었는지 확인
    expect(resetButton).toBeEnabled();

    // WHEN: Reset 버튼 클릭
    await user.click(resetButton);

    // THEN: onResetAllValues 함수가 정확히 한 번 호출되었는지 확인 (전역 상태 초기화)
    expect(
      mockUseQueryFilterStateStore.onResetAllValues,
    ).toHaveBeenCalledOnce();
  });

  describe("Apply 버튼 클릭 및 URL 파라미터 적용 로직 검증", () => {
    const BASE_FILTER_MOCK = {
      tagValue: "A",
      isRequired: false,
      type: "input" as const,
      queryKey: "baseKey",
    };

    // DESC: 헬퍼 함수 정의
    const renderAndClickApply = async (
      filters: typeof mockUseQueryFilterStateStore.queryFilters,
      searchParamsMock: Record<string, string | null> = {},
    ): Promise<Mock> => {
      // GIVEN: searchParams.get() Mocking (기존 URL 파라미터 반환)
      vi.spyOn(mockSearchParams, "get").mockImplementation((key) => {
        return searchParamsMock[key] ?? null;
      });

      // GIVEN: Mock 상태 설정
      mockUseQueryFilterStateStore.queryFilters = filters;

      // WHEN: 컴포넌트 렌더링 및 Apply 버튼 클릭
      const { getByTestId } = renderComponent({
        ui: <QueryFilterActionButtons isLoadingApplyButton={false} />,
      });

      const applyButton = getByTestId("test-button-primary");

      expect(applyButton).toBeEnabled();

      await user.click(applyButton);

      // THEN: setSearchParams Mock 함수 반환
      return mockSetSearchParams;
    };

    test("Apply 버튼 클릭 시, tagValue가 있는 필터들만 사용하여 setSearchParams가 호출되는지 확인", async () => {
      // GIVEN: tagValue가 있는 필터 2개
      const filters = {
        filterA: { ...BASE_FILTER_MOCK, tagValue: "ValueA" },
        filterB: { ...BASE_FILTER_MOCK, tagValue: "ValueB" },
      };

      // WHEN: Apply 버튼 클릭
      const setSearchParams = await renderAndClickApply(filters);

      // THEN: setSearchParams가 필터 키와 값으로 호출됨
      expect(setSearchParams).toHaveBeenCalledWith(
        { filterA: "ValueA", filterB: "ValueB" },
        { replace: true },
      );
    });

    test("tagValue가 비어있는 필터는 setSearchParams 호출 시 제외되는지 확인", async () => {
      // GIVEN: tagValue가 있는 필터 1개와 비어있는 필터 1개
      const filters = {
        includedFilter: { ...BASE_FILTER_MOCK, tagValue: "IncludeMe" },
        excludedFilter: { ...BASE_FILTER_MOCK, tagValue: "" }, // DESC: 제외되어야 함
      };

      // WHEN: Apply 버튼 클릭
      const setSearchParams = await renderAndClickApply(filters);

      // THEN: excludedFilter는 제외되고 includedFilter만 포함되어 호출됨
      expect(setSearchParams).toHaveBeenCalledWith(
        { includedFilter: "IncludeMe" },
        { replace: true },
      );
    });

    test("기존 URL에 'tab', 'subTab' 파라미터가 있을 때, 적용 후에도 해당 파라미터들이 유지되는지 확인", async () => {
      // GIVEN: 필터 1개와 URL에 tab/subTab 파라미터 존재
      const filters = {
        filterKey: { ...BASE_FILTER_MOCK, tagValue: "AppliedValue" },
      };
      const existingParams = {
        tab: "users",
        subTab: "active",
        otherParam: "ignore", // DESC: 필터 로직이 아닌 파라미터는 무시됨
      };

      // WHEN: Apply 버튼 클릭 (기존 파라미터 유지 로직 검증)
      const setSearchParams = await renderAndClickApply(
        filters,
        existingParams,
      );

      // THEN: setSearchParams 호출 시, tab/subTab이 유지되고 필터가 추가됨
      expect(setSearchParams).toHaveBeenCalledWith(
        {
          tab: "users",
          subTab: "active",
          filterKey: "AppliedValue",
        },
        { replace: true },
      );
    });

    describe("Calendar 타입 필터 처리", () => {
      const CALENDAR_FILTER_TEMPLATE = {
        tagValue: [],
        isRequired: false,
        type: "calendar" as const,
        queryKey: "dateRangeKey", // DESC: queryKey를 URL 파라미터 키로 사용
      };

      test("Calendar 타입의 tagValue가 2개일 때 (범위), '시작일 ~ 종료일' 형식으로 queryKey를 키로 전달하는지 확인", async () => {
        // GIVEN: tagValue가 2개인 Calendar 필터 (날짜 범위)
        const filters = {
          dateFilterKey: {
            ...CALENDAR_FILTER_TEMPLATE,
            tagValue: ["2025-01-01", "2025-01-31"],
          },
        };

        // WHEN: Apply 버튼 클릭
        const setSearchParams = await renderAndClickApply(filters);

        // THEN: queryKey (dateRangeKey)를 키로 '시작일 ~ 종료일' 형식의 값이 전달됨
        expect(setSearchParams).toHaveBeenCalledWith(
          { dateRangeKey: "2025-01-01 ~ 2025-01-31" },
          { replace: true },
        );
      });

      test("Calendar 타입의 tagValue가 1개일 때 (단일), '시작일 ~ 시작일' 형식으로 queryKey를 키로 전달하는지 확인", async () => {
        // GIVEN: tagValue가 1개인 Calendar 필터 (단일 날짜)
        const filters = {
          dateFilterKey: {
            ...CALENDAR_FILTER_TEMPLATE,
            tagValue: ["2025-02-15"],
          },
        };

        // WHEN: Apply 버튼 클릭
        const setSearchParams = await renderAndClickApply(filters);

        // THEN: 'queryKey'를 키로 '시작일 ~ 시작일' 형식의 값이 전달됨
        expect(setSearchParams).toHaveBeenCalledWith(
          { dateRangeKey: "2025-02-15 ~ 2025-02-15" },
          { replace: true },
        );
      });
    });

    test("Calendar 타입이 아닌 일반 필터는 필터의 key를 키로 사용하여 setSearchParams에 전달되는지 확인", async () => {
      // GIVEN: 일반(input) 필터
      const filters = {
        inputFilterKey: {
          tagValue: "UserQuery",
          isRequired: false,
          type: "input" as const,
          queryKey: "ignored",
        },
      };

      // WHEN: Apply 버튼 클릭
      const setSearchParams = await renderAndClickApply(filters);

      // THEN: 필터의 'inputFilterKey'를 키로 사용하여 값이 전달됨
      expect(setSearchParams).toHaveBeenCalledWith(
        { inputFilterKey: "UserQuery" },
        { replace: true },
      );
    });

    describe("초기화 상태 (isInitQueryFilter) 변경 로직", () => {
      test("isInitQueryFilter가 true일 때, Apply 클릭 후 setIsInitQueryFilter(false)가 호출되는지 확인", async () => {
        // GIVEN: isInitQueryFilter가 true인 상태 Mock
        mockUseQueryFilterStore.isInitQueryFilter = true;
        mockUseQueryFilterStore.setIsInitQueryFilter.mockClear();

        // WHEN: Apply 버튼 클릭 (필터 값은 유효해야 함)
        await renderAndClickApply({
          filter: { ...BASE_FILTER_MOCK, tagValue: "T" },
        });

        // THEN: setIsInitQueryFilter(false)가 호출됨 (초기화 상태 해제)
        expect(
          mockUseQueryFilterStore.setIsInitQueryFilter,
        ).toHaveBeenCalledWith(false);
        expect(
          mockUseQueryFilterStore.setIsInitQueryFilter,
        ).toHaveBeenCalledOnce();
      });

      test("isInitQueryFilter가 false일 때, Apply 클릭 후 setIsInitQueryFilter가 호출되지 않는지 확인", async () => {
        // GIVEN: isInitQueryFilter가 false인 상태 Mock
        mockUseQueryFilterStore.isInitQueryFilter = false;
        mockUseQueryFilterStore.setIsInitQueryFilter.mockClear();

        // WHEN: Apply 버튼 클릭
        await renderAndClickApply({
          filter: { ...BASE_FILTER_MOCK, tagValue: "F" },
        });

        // THEN: setIsInitQueryFilter 함수가 호출되지 않음
        expect(
          mockUseQueryFilterStore.setIsInitQueryFilter,
        ).not.toHaveBeenCalled();
      });
    });
  });
});
