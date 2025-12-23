import { describe, expect, it, test } from "vitest";

import { INIT_PAGE_INFO } from "@repo/constants/pagination";

import {
  createPages,
  getPreviousPageNumber,
  getNextPageNumber,
  generateDefaultPagination,
  mockPaginatedResponse,
} from "@packages/utils/pagination";

describe("pagination Test", () => {
  describe("createPages Test", () => {
    test("currentPage=1 일 때, (1-10) 첫 번째 페이지 그룹이 생성됨. (maxPageCount=10, totalPages=50)", () => {
      // GIVEN: 첫 번째 페이지 그룹의 시작점 옵션을 준비
      // WHEN: createPages 함수를 호출
      const result = createPages({
        currentPage: 1,
        maxPageCount: 10,
        totalPages: 50,
      });

      // THEN: [1, 2, ..., 10] 배열이 반환되는지 확인
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("currentPage=11 일 때, (11-20) 두 번째 페이지 그룹을 생성됨. (maxPageCount=10, totalPages=50)", () => {
      // GIVEN: 두 번째 페이지 그룹에 속하는 currentPage 옵션을 준비
      // WHEN: createPages 함수를 호출
      const result = createPages({
        currentPage: 11,
        maxPageCount: 10,
        totalPages: 50,
      });

      // THEN: [11, 12, ..., 20] 배열이 반환되는지 확인
      expect(result).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    test("currentPage=45 일 때, 마지막 페이지 그룹이 maxPageCount보다 적을 때 totalPages까지 그룹을 생성 (maxPageCount=10, totalPages=47)", () => {
      // GIVEN: 총 페이지 수(47)보다 maxPageCount(10)가 더 큰, 마지막 그룹에 속하는 옵션을 준비
      // WHEN: createPages 함수를 호출
      const result = createPages({
        currentPage: 45,
        maxPageCount: 10,
        totalPages: 47,
      });

      // THEN: 페이지 그룹의 시작점(41)부터 totalPages(47)까지만 반환되는지 확인
      expect(result).toEqual([41, 42, 43, 44, 45, 46, 47]);
    });

    describe("다양한 경계 그룹 Test", () => {
      // GIVEN: maxPageCount의 경계 지점에서 페이지 그룹이 올바르게 전환되는지 확인하는 케이스를 준비
      it.each([
        // NOTE: 첫 번째 그룹 시작
        {
          currentPage: 1,
          maxPageCount: 5,
          totalPages: 10,
          expected: [1, 2, 3, 4, 5],
        },
        // NOTE: 첫 번째 그룹 끝
        {
          currentPage: 5,
          maxPageCount: 5,
          totalPages: 10,
          expected: [1, 2, 3, 4, 5],
        },
        // NOTE: 두 번째 그룹 시작
        {
          currentPage: 6,
          maxPageCount: 5,
          totalPages: 10,
          expected: [6, 7, 8, 9, 10],
        },
        // NOTE: 두 번째 그룹 끝
        {
          currentPage: 10,
          maxPageCount: 5,
          totalPages: 10,
          expected: [6, 7, 8, 9, 10],
        },
      ])(
        "currentPage가 $currentPage일 때 올바른 페이지 범위 $expected가 반환됨.",
        ({ currentPage, maxPageCount, totalPages, expected }) => {
          // WHEN: createPages 함수를 호출
          const result = createPages({ currentPage, maxPageCount, totalPages });

          // THEN: 예상되는 페이지 배열과 일치하는지 확인
          expect(result).toEqual(expected);
        },
      );

      test("totalPages가 maxPageCount보다 적을 때, totalPages만큼 반환됨.", () => {
        // GIVEN: totalPages(5) < maxPageCount(10)인 경우를 준비
        // WHEN: createPages 함수를 호출
        const result = createPages({
          currentPage: 5,
          maxPageCount: 10,
          totalPages: 5,
        });

        // THEN: [1, 2, 3, 4, 5]가 반환되는지 확인
        expect(result).toEqual([1, 2, 3, 4, 5]);
      });

      test("totalPages=maxPageCount 일 때, totalPages만큼 반환됨.", () => {
        // GIVEN: totalPages(10) = maxPageCount(10)인 경우를 준비
        // WHEN: createPages 함수를 호출
        const result = createPages({
          currentPage: 1,
          maxPageCount: 10,
          totalPages: 10,
        });

        // THEN: [1, 2, ..., 10]이 반환되는지 확인
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      test("페이지가 1개만 있을 때는 1만 반환됨.", () => {
        // GIVEN: totalPages=1인 경우를 준비
        // WHEN: createPages 함수를 호출
        const result = createPages({
          currentPage: 1,
          maxPageCount: 10,
          totalPages: 1,
        });

        // THEN: [1]만 반환되는지 확인
        expect(result).toEqual([1]);
      });
    });

    describe("다양한 maxPageCount 값 Test", () => {
      // GIVEN: 다양한 maxPageCount에 따른 페이지 그룹 시작점을 확인하는 케이스를 준비
      it.each([
        {
          maxPageCount: 5,
          currentPage: 1,
          totalPages: 20,
          expected: [1, 2, 3, 4, 5],
        },
        {
          maxPageCount: 3,
          currentPage: 4, // NOTE: 1~3 그룹을 지나 4~6 그룹 시작
          totalPages: 20,
          expected: [4, 5, 6],
        },
        {
          maxPageCount: 7,
          currentPage: 8, // NOTE: 1~7 그룹을 지나 8~14 그룹 시작
          totalPages: 20,
          expected: [8, 9, 10, 11, 12, 13, 14],
        },
      ])(
        "maxPageCount가 $maxPageCount일 때 올바른 페이지 배열 $expected가 반환됨.",
        ({ maxPageCount, currentPage, totalPages, expected }) => {
          // WHEN: createPages 함수를 호출
          const result = createPages({ currentPage, maxPageCount, totalPages });
          // THEN: 예상되는 페이지 배열과 일치하는지 확인
          expect(result).toEqual(expected);
        },
      );
    });
  });

  describe("getPreviousPageNumber Test (maxPageCount=10으로 고정)", () => {
    describe("첫 번째 그룹에서의 동작 Test", () => {
      // GIVEN: 첫 번째 페이지 그룹에 속하는 currentPage들을 준비
      it.each([
        { currentPage: 1, maxPageCount: 10 },
        { currentPage: 5, maxPageCount: 10 },
        { currentPage: 10, maxPageCount: 10 },
      ])(
        "%#. 번째 그룹(currentPage: $currentPage)에서는 항상 1이 반환됨.",
        ({ currentPage, maxPageCount }) => {
          // WHEN: getPreviousPageNumber 함수를 호출
          const result = getPreviousPageNumber({ currentPage, maxPageCount });

          // THEN: 첫 번째 그룹에서는 이전 그룹이 없으므로, 페이지 1을 반환하는지 확인
          expect(result).toBe(1);
        },
      );
    });

    test("두 번째 그룹(11)에서 첫 번째 그룹(1)으로 이동.", () => {
      // WHEN: 두 번째 그룹의 시작 페이지(11)를 입력
      const result = getPreviousPageNumber({
        currentPage: 11,
        maxPageCount: 10,
      });

      // THEN: 이전 그룹의 시작 페이지(1)가 반환되는지 확인
      expect(result).toBe(1);
    });

    test("세 번째 그룹(21)에서 두 번째 그룹(11)으로 이동.", () => {
      // WHEN: 세 번째 그룹의 시작 페이지(21)를 입력
      const result = getPreviousPageNumber({
        currentPage: 21,
        maxPageCount: 10,
      });

      // THEN: 이전 그룹의 시작 페이지(11)가 반환되는지 확인
      expect(result).toBe(11);
    });

    test("네 번째 그룹(35)에서 세 번째 그룹(21)으로 이동.", () => {
      // WHEN: 네 번째 그룹 내의 페이지(35)를 입력
      const result = getPreviousPageNumber({
        currentPage: 35,
        maxPageCount: 10,
      });

      // THEN: 이전 그룹의 시작 페이지(21)가 반환되는지 확인
      expect(result).toBe(21);
    });

    describe("다양한 maxPageCount 값 Test", () => {
      // GIVEN: 다양한 maxPageCount 값에 따른 이전 그룹 시작 페이지를 준비
      it.each([
        { currentPage: 6, maxPageCount: 5, expected: 1 }, // NOTE: (6-1)/5 * 5 + 1 = 1
        { currentPage: 11, maxPageCount: 5, expected: 6 }, // NOTE: (11-1)/5 * 5 + 1 = 6
        { currentPage: 4, maxPageCount: 3, expected: 1 }, // NOTE: (4-1)/3 * 3 + 1 = 1
        { currentPage: 7, maxPageCount: 3, expected: 4 }, // NOTE: (7-1)/3 * 3 + 1 = 4
        { currentPage: 10, maxPageCount: 3, expected: 7 }, // NOTE: (10-1)/3 * 3 + 1 = 7
      ])(
        "maxPageCount가 $maxPageCount, currentPage가 $currentPage일 때 $expected가 반환됨.",
        ({ currentPage, maxPageCount, expected }) => {
          // WHEN: getPreviousPageNumber 함수를 호출
          const result = getPreviousPageNumber({ currentPage, maxPageCount });

          // THEN: 예상되는 이전 페이지 번호와 일치하는지 확인
          expect(result).toBe(expected);
        },
      );
    });
  });

  describe("getNextPageNumber Test (maxPageCount=10, totalPages=50으로 고정)", () => {
    test("첫 번째 그룹(1)에서 두 번째 그룹(11)으로 이동.", () => {
      // WHEN: 첫 번째 그룹의 시작 페이지(1)를 입력
      const result = getNextPageNumber({
        currentPage: 1,
        maxPageCount: 10,
        totalPages: 50,
      });

      // THEN: 다음 그룹의 시작 페이지(11)가 반환되는지 확인
      expect(result).toBe(11);
    });

    test("두 번째 그룹(11)에서 세 번째 그룹(21)으로 이동.", () => {
      // WHEN: 두 번째 그룹의 시작 페이지(11)를 입력
      const result = getNextPageNumber({
        currentPage: 11,
        maxPageCount: 10,
        totalPages: 50,
      });

      // THEN: 다음 그룹의 시작 페이지(21)가 반환되는지 확인
      expect(result).toBe(21);
    });

    test("그룹 중간 페이지(15)에서 다음 그룹(21)으로 이동.", () => {
      // WHEN: 그룹 중간 페이지(15)를 입력
      const result = getNextPageNumber({
        currentPage: 15,
        maxPageCount: 10,
        totalPages: 50,
      });

      // THEN: 다음 그룹의 시작 페이지(21)가 반환되는지 확인
      expect(result).toBe(21);
    });

    describe("마지막 그룹에서의 동작 Test", () => {
      // GIVEN: 마지막 그룹에 속하는 currentPage들을 준비 (totalPages=50)
      it.each([
        { currentPage: 41, maxPageCount: 10, totalPages: 50, expected: 50 }, // NOTE: 마지막 그룹 시작
        { currentPage: 45, maxPageCount: 10, totalPages: 50, expected: 50 }, // NOTE: 마지막 그룹 중간
        { currentPage: 50, maxPageCount: 10, totalPages: 50, expected: 50 }, // NOTE: 마지막 페이지
      ])(
        "마지막 그룹(currentPage: $currentPage)에서는 totalPages($totalPages)가 반환됨.",
        ({ currentPage, maxPageCount, totalPages, expected }) => {
          // WHEN: getNextPageNumber 함수를 호출
          const result = getNextPageNumber({
            currentPage,
            maxPageCount,
            totalPages,
          });

          // THEN: 다음 그룹으로 이동할 수 없으므로 totalPages(50)가 반환되는지 확인
          expect(result).toBe(expected);
        },
      );
    });

    describe("다양한 maxPageCount 값 Test", () => {
      // GIVEN: 다양한 maxPageCount와 totalPages 값에 따른 다음 그룹 시작 페이지를 준비
      it.each([
        { currentPage: 1, maxPageCount: 5, totalPages: 20, expected: 6 }, // NOTE: 1~5 그룹 -> 6 시작
        { currentPage: 6, maxPageCount: 5, totalPages: 20, expected: 11 }, // NOTE: 6~10 그룹 -> 11 시작
        { currentPage: 16, maxPageCount: 5, totalPages: 20, expected: 20 }, // NOTE: 16~20 그룹 -> 마지막 페이지(20) 반환
        { currentPage: 1, maxPageCount: 3, totalPages: 20, expected: 4 }, // NOTE: 1~3 그룹 -> 4 시작
        { currentPage: 4, maxPageCount: 3, totalPages: 20, expected: 7 }, // NOTE: 4~6 그룹 -> 7 시작
      ])(
        "maxPageCount가 $maxPageCount, currentPage가 $currentPage일 때 $expected가 반환됨.",
        ({ currentPage, maxPageCount, totalPages, expected }) => {
          // WHEN: getNextPageNumber 함수를 호출
          const result = getNextPageNumber({
            currentPage,
            maxPageCount,
            totalPages,
          });

          // THEN: 예상되는 다음 페이지 번호와 일치하는지 확인
          expect(result).toBe(expected);
        },
      );
    });
  });

  describe("generateDefaultPagination Test", () => {
    describe("pageInfo가 제공된 경우", () => {
      test("모든 값이 제공되면 그대로 반환됨.", () => {
        // GIVEN: 모든 필드가 채워진 pageInfo 객체를 준비
        const pageInfo = {
          currentPage: 5,
          dataPerPage: 20,
          startRow: 80,
          totalData: 200,
          totalPages: 10,
        };

        // WHEN: generateDefaultPagination 함수를 호출
        const result = generateDefaultPagination(pageInfo);

        // THEN: 입력된 객체와 동일한 객체가 반환되는지 확인
        expect(result).toEqual(pageInfo);
      });

      // GIVEN: 일부 필드만 제공된 다양한 입력 케이스를 준비
      it.each([
        { input: { currentPage: 2 }, description: "currentPage만 제공" },
        { input: { dataPerPage: 50 }, description: "dataPerPage만 제공" },
        { input: { startRow: 100 }, description: "startRow만 제공" },
        { input: { totalData: 500 }, description: "totalData만 제공" },
        { input: { totalPages: 25 }, description: "totalPages만 제공" },
      ])(
        "$description된 경우 나머지는 INIT_PAGE_INFO 객체 내의 기본값을 사용함.",
        ({ input }) => {
          // WHEN: generateDefaultPagination 함수를 호출
          const result = generateDefaultPagination(input);

          // THEN: 제공된 필드는 입력값, 누락된 필드는 INIT_PAGE_INFO의 기본값으로 채워졌는지 확인
          expect(result).toMatchObject({
            currentPage: input.currentPage ?? INIT_PAGE_INFO.currentPage,
            dataPerPage: input.dataPerPage ?? INIT_PAGE_INFO.dataPerPage,
            startRow: input.startRow ?? INIT_PAGE_INFO.startRow,
            totalData: input.totalData ?? INIT_PAGE_INFO.totalData,
            totalPages: input.totalPages ?? INIT_PAGE_INFO.totalPages,
          });
        },
      );
    });

    describe("pageInfo가 제공되지 않은 경우", () => {
      test("undefined가 전달되면 INIT_PAGE_INFO가 반환됨.", () => {
        // WHEN: undefined를 입력
        const result = generateDefaultPagination(undefined);

        // THEN: 전체가 INIT_PAGE_INFO 기본값으로 채워졌는지 확인
        expect(result).toEqual(INIT_PAGE_INFO);
      });

      test("빈 객체가 전달되면 INIT_PAGE_INFO가 반환됨.", () => {
        // WHEN: 빈 객체를 입력
        const result = generateDefaultPagination({});

        // THEN: 전체가 INIT_PAGE_INFO 기본값으로 채워졌는지 확인
        expect(result).toEqual(INIT_PAGE_INFO);
      });
    });
  });

  interface MakeMockDataProps {
    dataKey: string;
    dataPerPage: number;
    mockData: { id: number; name: string }[];
    page: string;
  }

  describe("mockPaginatedResponse Test", () => {
    const makeMockData = (length: number): MakeMockDataProps => {
      const mockData = Array.from({ length }, (_, i) => ({
        id: i + 1,
        name: `item ${i + 1}`,
      }));
      const dataPerPage = 20;
      const dataKey = "items";
      const page = "1";

      return { mockData, dataPerPage, dataKey, page };
    };

    test("올바른 데이터가 제공되면 그대로 반환함", () => {
      // GIVEN: 데이터가 채워진 객체를 준비
      const { mockData, dataPerPage, dataKey } = makeMockData(65);

      // WHEN: mockPaginatedResponse 함수를 호출
      const result = mockPaginatedResponse({
        data: mockData,
        dataKey,
        dataPerPage,
        page: "2",
      });

      // THEN: 예상되는 결과와 일치하는지 확인
      expect(result).toEqual({
        items: mockData.slice(20, 40),
        pageInfo: {
          currentPage: 2,
          dataPerPage,
          totalData: 65,
          totalPages: 4,
          startRow: 20,
        },
      });
    });

    test("페이지 번호가 전체 페이지 수를 초과하면 마지막 페이지 데이터를 반환함", () => {
      // GIVEN: 데이터가 채워진 객체를 준비
      const { mockData, dataPerPage, dataKey } = makeMockData(65);

      // WHEN: mockPaginatedResponse 함수를 호출
      const result = mockPaginatedResponse({
        data: mockData,
        dataKey,
        dataPerPage,
        page: "99",
      });

      // THEN: 예상되는 결과와 일치하는지 확인
      expect(result).toEqual({
        items: mockData.slice(60),
        pageInfo: {
          currentPage: 4,
          dataPerPage,
          totalData: 65,
          totalPages: 4,
          startRow: 60,
        },
      });
    });

    test("페이지 번호가 1보다 작으면 첫 번째 페이지 데이터를 반환함", () => {
      // GIVEN: 데이터가 채워진 객체를 준비
      const { mockData, dataPerPage, dataKey } = makeMockData(65);

      // WHEN: mockPaginatedResponse 함수를 호출
      const result = mockPaginatedResponse({
        data: mockData,
        dataKey,
        dataPerPage,
        page: "-5",
      });

      // THEN: 예상되는 결과와 일치하는지 확인
      expect(result).toEqual({
        items: mockData.slice(0, 20),
        pageInfo: {
          currentPage: 1,
          dataPerPage,
          totalData: 65,
          totalPages: 4,
          startRow: 0,
        },
      });
    });

    it.each([{ dataPerPage: 0 }, { dataPerPage: -10 }])(
      "dataPerPage가 $dataPerPage이면 10으로 초기화된 객체를 반환함",
      ({ dataPerPage }) => {
        // GIVEN: 데이터가 채워진 객체를 준비
        const { mockData, dataKey, page } = makeMockData(65);

        // WHEN: mockPaginatedResponse 함수를 호출
        const result = mockPaginatedResponse({
          data: mockData,
          dataKey,
          dataPerPage,
          page,
        });

        // THEN: 예상되는 결과와 일치하는지 확인
        expect(result).toEqual({
          items: mockData.slice(0, 10),
          pageInfo: {
            currentPage: 1,
            dataPerPage: 10,
            totalData: 65,
            totalPages: 7,
            startRow: 0,
          },
        });
      },
    );

    test("data가 없으면 기본값으로 채워진 객체를 반환함", () => {
      // GIVEN: 데이터가 빈 배열인 객체를 준비
      const { dataPerPage, dataKey, page } = makeMockData(0);

      // WHEN: mockPaginatedResponse 함수를 호출
      const result = mockPaginatedResponse({
        data: [],
        dataKey,
        dataPerPage,
        page,
      });

      // THEN: 예상되는 결과와 일치하는지 확인
      expect(result).toEqual({
        items: [],
        pageInfo: {
          currentPage: 1,
          dataPerPage: 20,
          totalData: 0,
          totalPages: 1,
          startRow: 0,
        },
      });
    });

    test("전달된 dataKey 값에 따라 결과 객체의 키 이름이 결정됨", () => {
      // GIVEN: 기존 mockData 객체와 다른 dataKey를 가진 객체를 준비
      const mocks = {
        data: [],
        dataKey: "newDatas",
        dataPerPage: 20,
        page: "1",
      };

      // WHEN: mockPaginatedResponse 함수를 호출
      const result = mockPaginatedResponse(mocks);

      // THEN: 예상되는 결과와 일치하는지 확인 (변수가 아닌 명확한 값으로 검증)
      expect(result).toEqual({
        newDatas: [],
        pageInfo: {
          currentPage: 1,
          dataPerPage: 20,
          totalData: 0,
          totalPages: 1,
          startRow: 0,
        },
      });
    });
  });
});
