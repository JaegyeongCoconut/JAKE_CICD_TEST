import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useQueryPagination from "@packages/hooks/pagination/useQueryPagination";

// DESC: vi.mock()이 파일 상단으로 호이스팅되어 외부 변수를 참조할 수 없어 mock 선언을 위해 vi.hoisted() 사용
const hoisted = vi.hoisted(() => ({
  mockSearchParams: { get: vi.fn() },
  mockSetSearchParams: vi.fn(),
  mockGetPreviousPageNumber: vi.fn(),
  mockGetNextPageNumber: vi.fn(),
  mockGetAllQuery: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useSearchParams: vi.fn(() => [
    hoisted.mockSearchParams,
    hoisted.mockSetSearchParams,
  ]),
}));
vi.mock("@repo/utils/pagination", () => ({
  getPreviousPageNumber: hoisted.mockGetPreviousPageNumber,
  getNextPageNumber: hoisted.mockGetNextPageNumber,
}));
vi.mock("@repo/utils/queryFilter", () => ({
  getAllQuery: hoisted.mockGetAllQuery,
}));

// DESC: 테스트에 사용할 테스트 props 값 설정
const mockPagination = { maxPageCount: 10, totalPages: 50 };
const mockQuery = { category: ["name"] };

describe("useQueryPagination Test", () => {
  test("초기 page 쿼리가 없을 때, currentPage를 1로 초기화함.", () => {
    // GIVEN: searchParams의 page 값을 null로 설정
    hoisted.mockSearchParams.get.mockReturnValue(null);

    const { result } = renderHook(() => useQueryPagination(mockPagination));

    // THEN: currentPage가 1로 초기화 되었는지 확인
    expect(result.current.currentPage).toBe(1);
  });

  test("searchParams['page'] 변경 시, currentPage 값이 갱신됨.", () => {
    // GIVEN: 초기 searchParams['page'] 값 1로 설정
    const initSearchParamsPage = 1;

    // WHEN: hook을 초기 쿼리 값(1)으로 렌더링
    const { result, rerender } = renderHook(() =>
      useQueryPagination(mockPagination),
    );

    // THEN: currentPage가 1로 갱신되었는지 확인
    expect(result.current.currentPage).toBe(initSearchParamsPage);

    const newSearchParamsPage = 5;

    // GIVEN: 초기 searchParams['page'] 값 5로 설정
    hoisted.mockSearchParams.get.mockReturnValue(`${newSearchParamsPage}`);

    // WHEN: hook을 쿼리 값(5)으로 리렌더링
    rerender();

    // THEN: currentPage가 5로 갱신되었는지 확인
    expect(result.current.currentPage).toBe(newSearchParamsPage);
  });

  describe("handlePreviousPageClick Test", () => {
    test("currentPage가 1이면 setSearchParams를 호출하지 않고 함수를 종료함.", () => {
      const searchParamsPage = 1;

      // GIVEN: searchParams['page'] 값 1로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handlePreviousPageClick 함수 호출
      act(() => result.current.handlePreviousPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 확인
      expect(hoisted.mockSetSearchParams).not.toHaveBeenCalled();
    });

    test("currentPage가 1이 아니면, setSearchParams를 호출함.", () => {
      const searchParamsPage = 2;
      const previousPageNumber = 1;

      // GIVEN: searchParams의 page 값을 2로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);
      // GIVEN: getPreviousPageNumber의 결과값을 1로 설정
      hoisted.mockGetPreviousPageNumber.mockReturnValue(previousPageNumber);
      // GIVEN: getAllQuery 결과 값을 mockQuery로 설정
      hoisted.mockGetAllQuery.mockReturnValue(mockQuery);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handlePreviousPageClick 함수 호출
      act(() => result.current.handlePreviousPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: getPreviousPageNumber 호출 여부 및 인자 검증
      expect(hoisted.mockGetPreviousPageNumber).toHaveBeenCalledOnce();
      expect(hoisted.mockGetPreviousPageNumber).toHaveBeenCalledWith({
        currentPage: searchParamsPage,
        maxPageCount: mockPagination.maxPageCount,
      });
      // THEN: mockSetSearchParams 호출 여부 및 인자 검증
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledOnce();
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledWith({
        ...mockQuery,
        page: `${previousPageNumber}`,
      });
    });
  });

  describe("handleFirstPageClick Test", () => {
    test("currentPage가 1이면 setSearchParams를 호출하지 않고 함수를 종료함.", () => {
      const searchParamsPage = 1;

      // GIVEN: searchParams의 page 값을 1로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleFirstPageClick 함수 호출
      act(() => result.current.handleFirstPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 검증
      expect(hoisted.mockSetSearchParams).not.toHaveBeenCalled();
    });

    test("currentPage가 1이 아니면, setSearchParams를 호출함.", () => {
      const searchParamsPage = 2;

      // GIVEN: searchParams의 page 값을 2로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);
      // GIVEN: getAllQuery 결과 값을 mockQuery로 설정
      hoisted.mockGetAllQuery.mockReturnValue(mockQuery);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleFirstPageClick 함수 호출
      act(() => result.current.handleFirstPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 및 인자 검증
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledOnce();
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledWith({
        ...mockQuery,
        page: "1",
      });
    });
  });

  describe("handleNextPageClick Test", () => {
    test("currentPage와 totalPages가 같으면, setSearchParams를 호출하지 않고 함수를 종료함.", () => {
      const searchParamsPage = 50;

      // GIVEN: searchParams의 page 값을 50으로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleNextPageClick 함수 호출
      act(() => result.current.handleNextPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 검증
      expect(hoisted.mockSetSearchParams).not.toHaveBeenCalled();
    });

    test("currentPage와 totalPages가 같지 않으면, setSearchParams를 호출함.", () => {
      const searchParamsPage = 1;
      const nextPageNumber = 11;

      // GIVEN: searchParams의 page 값을 1로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);
      // GIVEN: getNextPageNumber 결과값을 11로 설정
      hoisted.mockGetNextPageNumber.mockReturnValue(nextPageNumber);
      // GIVEN: getAllQuery 결과 값을 mockQuery로 설정
      hoisted.mockGetAllQuery.mockReturnValue(mockQuery);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleNextPageClick 함수 호출
      act(() => result.current.handleNextPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: getNextPageNumber 호출 여부 및 인자 검증
      expect(hoisted.mockGetNextPageNumber).toHaveBeenCalledOnce();
      expect(hoisted.mockGetNextPageNumber).toHaveBeenCalledWith({
        currentPage: 1,
        ...mockPagination,
      });
      // THEN: mockSetSearchParams 호출 여부 및 인자 검증
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledOnce();
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledWith({
        ...mockQuery,
        page: "11",
      });
    });
  });

  describe("handleLastPageClick Test", () => {
    test("currentPage와 totalPages가 같으면, setSearchParams를 호출하지 않고 함수를 종료함.", () => {
      const searchParamsPage = 50;

      // GIVEN: searchParams의 page 값을 50으로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleLastPageClick 함수 호출
      act(() => result.current.handleLastPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 검증
      expect(hoisted.mockSetSearchParams).not.toHaveBeenCalled();
    });

    test("currentPage와 totalPages가 같지 않으면, setSearchParams를 호출함.", () => {
      const searchParamsPage = 1;

      // GIVEN: searchParams의 page 값을 1로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);
      // GIVEN: getAllQuery 결과 값을 mockQuery로 설정
      hoisted.mockGetAllQuery.mockReturnValue(mockQuery);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleLastPageClick 함수 호출
      act(() => result.current.handleLastPageClick());

      // THEN: currentPage 값 검증
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 및 인자 검증
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledOnce();
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledWith({
        ...mockQuery,
        page: `${mockPagination.totalPages}`,
      });
    });
  });

  describe("handleNumberClick Test", () => {
    test("클릭한 페이지 번호로 setSearchParams를 호출함.", () => {
      // GIVEN: 클릭한 페이지 번호의 값을 10으로 설정
      const searchParamsPage = 1;
      const clickedPageNumber = 10;

      // GIVEN: searchParams의 page 값을 1로 설정
      hoisted.mockSearchParams.get.mockReturnValue(`${searchParamsPage}`);
      // GIVEN: getAllQuery 결과 값을 mockQuery로 설정
      hoisted.mockGetAllQuery.mockReturnValue(mockQuery);

      const { result } = renderHook(() => useQueryPagination(mockPagination));

      // WHEN: hook 렌더링 후 handleNumberClick 함수 호출
      act(() => result.current.handleNumberClick(clickedPageNumber)());

      // THEN: currentPage 값 확인
      expect(result.current.currentPage).toBe(searchParamsPage);
      // THEN: mockSetSearchParams 호출 여부 및 인자 확인
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledOnce();
      expect(hoisted.mockSetSearchParams).toHaveBeenCalledWith({
        ...mockQuery,
        page: `${clickedPageNumber}`,
      });
    });
  });
});
