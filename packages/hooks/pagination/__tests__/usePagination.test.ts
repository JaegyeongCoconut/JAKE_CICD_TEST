import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";

import * as paginationUtils from "@repo/utils/pagination";

import usePagination from "@packages/hooks/pagination/usePagination";

describe("usePagination Test", () => {
  // DESC: isPreviousNumberDisabled(이전 페이지 이동 버튼 비활성화) true 테스트
  test("currentPage가 maxPageCount 보다 작거나 같으면 isPreviousNumberDisabled는 true가 됨.", () => {
    // GIVEN: currentPage(1)가 maxPageCount(10)보다 작거나 같은 초기 상태 설정
    const mockPagination = { currentPage: 1, maxPageCount: 10, totalPages: 0 };

    const { result } = renderHook(() => usePagination(mockPagination));

    // THEN: isPreviousNumberDisabled 값이 예상 값과 일치하는지 확인
    expect(result.current.isPreviousNumberDisabled).toBe(true);
  });

  // DESC: isPreviousNumberDisabled(이전 페이지 이동 버튼 비활성화) false 테스트
  test("currentPage가 maxPageCount 보다 크면 isPreviousNumberDisabled는 false가 됨.", () => {
    // GIVEN: currentPage(10)가 maxPageCount(1)보다 큰 초기 상태 설정
    const mockPagination = { currentPage: 10, maxPageCount: 1, totalPages: 0 };

    const { result } = renderHook(() => usePagination(mockPagination));

    // THEN: isPreviousNumberDisabled 값이 예상 값과 일치하는지 확인
    expect(result.current.isPreviousNumberDisabled).toBe(false);
  });

  // WHEN: isNextNumberDisabled(다음 페이지 이동 버튼 비활성화) true 테스트
  it.each([
    {
      pagination: { currentPage: 0, maxPageCount: 10, totalPages: 10 },
      description: "maxPageCount가 totalPages와 같으면",
    },
    {
      pagination: { currentPage: 11, maxPageCount: 10, totalPages: 15 },
      description:
        "Math.floor((currentPage + maxPageCount - 1) / maxPageCount) 값이 Math.floor(totalPages / maxPageCount) 보다 크면",
    },
  ])("$description isNextNumberDisabled는 true가 됨.", ({ pagination }) => {
    const { result } = renderHook(() => usePagination(pagination));

    // THEN: isNextNumberDisabled 값이 예상 값과 일치하는지 확인
    expect(result.current.isNextNumberDisabled).toBe(true);
  });

  // WHEN: isNextNumberDisabled(다음 페이지 이동 버튼 비활성화) false 테스트
  it.each([
    {
      pagination: { currentPage: 0, maxPageCount: 10, totalPages: 50 },
      description: "maxPageCount가 totalPages와 다르면",
    },
    {
      pagination: { currentPage: 1, maxPageCount: 10, totalPages: 20 },
      description:
        "Math.floor((currentPage + maxPageCount - 1) / maxPageCount) 값이 Math.floor(totalPages / maxPageCount) 보다 작으면",
    },
  ])("$description isNextNumberDisabled는 false가 됨.", ({ pagination }) => {
    const { result } = renderHook(() => usePagination(pagination));

    // THEN: isNextNumberDisabled 값이 예상 값과 일치하는지 확인
    expect(result.current.isNextNumberDisabled).toBe(false);
  });

  test("currentPage, maxPageCount, totalPages 중 하나라도 변경되면 createPages 함수가 다시 호출되고 pageNumbers가 갱신됨.", async () => {
    // GIVEN: createPages 함수를 spyOn하고 초기 Props 설정
    const mockCreatePages = vi.spyOn(paginationUtils, "createPages");
    const initPagination = { currentPage: 1, maxPageCount: 5, totalPages: 10 };

    // WHEN: hook을 초기 Props로 렌더링 (1차 실행)
    const { rerender, result } = renderHook((props) => usePagination(props), {
      initialProps: initPagination,
    });

    // THEN: 초기 렌더링 시 createPages 함수 호출 및 반환값 검증
    expect(mockCreatePages).toHaveBeenCalledTimes(1);
    expect(mockCreatePages).toHaveBeenCalledWith(initPagination);
    // THEN: useEffect에 의한 상태 갱신은 비동기적으로 스케줄링되므로 waitFor를 사용해 pageNumbers 값 갱신 검증
    await waitFor(() =>
      expect(result.current.pageNumbers).toEqual([1, 2, 3, 4, 5]),
    );

    // GIVEN: 이전 Props에서 currentPage만 변경
    const currentPagePagination = {
      currentPage: 6,
      maxPageCount: 5,
      totalPages: 10,
    };

    // WHEN: hook을 새 Props로 렌더링 (2차 실행)
    rerender(currentPagePagination);

    // THEN: Props 변경에 따른 createPages 함수 재호출 및 반환값 검증
    expect(mockCreatePages).toHaveBeenCalledTimes(2);
    expect(mockCreatePages).toHaveBeenCalledWith(currentPagePagination);
    // THEN: useEffect에 의한 상태 갱신은 비동기적으로 스케줄링되므로 waitFor를 사용해 pageNumbers 값 갱신 검증
    await waitFor(() =>
      expect(result.current.pageNumbers).toEqual([6, 7, 8, 9, 10]),
    );

    // GIVEN: 이전 Props에서 maxPageCount만 변경
    const maxPageCountPagination = {
      currentPage: 6,
      maxPageCount: 10,
      totalPages: 10,
    };

    // WHEN: hook을 새 Props로 렌더링 (3차 실행)
    rerender(maxPageCountPagination);

    // THEN: Props 변경에 따른 createPages 함수 재호출 및 반환값 검증
    expect(mockCreatePages).toHaveBeenCalledTimes(3);
    expect(mockCreatePages).toHaveBeenCalledWith(maxPageCountPagination);
    // THEN: useEffect에 의한 상태 갱신은 비동기적으로 스케줄링되므로 waitFor를 사용해 pageNumbers 값 갱신 검증
    await waitFor(() =>
      expect(result.current.pageNumbers).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]),
    );

    // GIVEN: 이전 Props에서 totalPages만 변경
    const totalPagesPagination = {
      currentPage: 6,
      maxPageCount: 10,
      totalPages: 15,
    };

    // WHEN: hook을 새 Props로 렌더링 (4차 실행)
    rerender(totalPagesPagination);

    // THEN: Props 변경에 따른 createPages 함수 재호출 및 반환값 검증
    expect(mockCreatePages).toHaveBeenCalledTimes(4);
    expect(mockCreatePages).toHaveBeenCalledWith(totalPagesPagination);
    // THEN: useEffect에 의한 상태 갱신은 비동기적으로 스케줄링되므로 waitFor를 사용해 pageNumbers 값 갱신 검증
    await waitFor(() =>
      expect(result.current.pageNumbers).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]),
    );
  });
});
