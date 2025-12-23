import { describe, expect, it, test } from "vitest";

import { SUFFIX_DATE_QUERY_KEYS } from "@packages/assets/static/queryFilter";
import type { PageInfoQueryItem } from "@packages/types";
import {
  deleteQueryKeys,
  formatDateQueryFilter,
  formatDateTimeQueryFilter,
  formatQueryFilterDate,
  getAllQuery,
  getQueryFilterParams,
} from "@packages/utils/queryFilter";

// GIVEN: 문자열 searchParams를 URLSearchParams 객체로 변환하는 헬퍼 함수
const searchUrl = (searchParams: string): URLSearchParams =>
  new URL(`http://localhost/${searchParams}`).searchParams;

describe("queryFilter Test", () => {
  describe("getQueryFilterParams Test", () => {
    // GIVEN: 기본적으로 포함되어야 하는 페이지네이션 파라미터
    const defaultParams = { page: "1", pageSize: "20" };
    // GIVEN: 추출할 대상 키 목록
    const params = ["keyword"] as const;

    test(`빈 searchParams면 { page: "1", pageSize: "20" }만 반환됨.`, () => {
      // GIVEN: 추출할 키 목록은 빈 배열, searchParams도 빈 값
      const emptyParams = [] as const;

      // WHEN: getQueryFilterParams 함수를 호출
      const result = getQueryFilterParams<PageInfoQueryItem>({
        searchParams: searchUrl(""),
        params: emptyParams,
      });

      // THEN: 페이지네이션 기본값만 반환되는지 확인
      expect(result).toEqual(defaultParams);
    });

    test(`searchParams에 포함되는 키만 { page: "1", pageSize: "20" }에 포함되어 반환됨.`, () => {
      // WHEN: keyword와 무시되어야 할 ignore 키를 포함하는 searchParams로 호출
      const result = getQueryFilterParams<
        PageInfoQueryItem & { keyword: string }
      >({ searchParams: searchUrl("?keyword=car&ignore=999"), params });

      // THEN: page, pageSize 기본값과 keyword만 포함되는지 확인
      expect(result).toEqual({ page: "1", pageSize: "20", keyword: "car" });

      // THEN: params 목록에 없는 'ignore' 키는 결과에 포함되지 않았는지 확인
      expect(result).not.toHaveProperty("ignore");
    });

    test(`searchParams의 = 연산(예: keyword=)에 아무 것도 대입되지 않으면 { page: "1", pageSize: "20" }에 포함되어 빈 ''으로 반환됨.`, () => {
      // WHEN: 값이 빈 문자열인 키(keyword=)를 포함하는 searchParams로 호출
      const result = getQueryFilterParams<
        PageInfoQueryItem & { keyword: string }
      >({ searchParams: searchUrl("?keyword="), params });

      // THEN: 해당 키가 빈 문자열("") 값으로 포함되는지 확인
      expect(result).toEqual({ page: "1", pageSize: "20", keyword: "" });
    });

    test(`searchParams에 포함되는 키가 다중 값일 경우, { page: "1", pageSize: "20" }에 포함되어 배열로 반환됨.`, () => {
      // WHEN: 다중 값(keyword=open&keyword=hold)을 포함하는 searchParams로 호출
      const result = getQueryFilterParams<
        PageInfoQueryItem & { keyword: string }
      >({ searchParams: searchUrl("?keyword=open&keyword=hold"), params });

      // THEN: 해당 키의 값이 배열로 반환되는지 확인
      expect(result).toEqual({
        page: "1",
        pageSize: "20",
        keyword: ["open", "hold"],
      });
    });

    test("page, pageSize가 변경된다면, page, pageSize의 값은 변경된 값으로 반환됨.", () => {
      // GIVEN: page, pageSize를 추출 대상 키에 명시
      const customParams = ["page", "pageSize", "keyword"] as const;

      // WHEN: page와 pageSize가 기본값과 다르게 설정된 searchParams로 호출
      const result = getQueryFilterParams<
        PageInfoQueryItem & { keyword: string }
      >({
        searchParams: searchUrl("?page=3&pageSize=50&keyword=car"),
        params: customParams,
      });

      // THEN: 변경된 page, pageSize 값이 반영되었는지 확인
      expect(result).toEqual({ page: "3", pageSize: "50", keyword: "car" });
    });
  });

  describe("getAllQuery Test", () => {
    test("searchParams가 인자로 전달되지 않았다면 빈 객체로 반환됨.", () => {
      // WHEN: 빈 searchParams로 호출
      // THEN: 빈 객체를 반환하는지 확인
      expect(getAllQuery(searchUrl(""))).toEqual({});
    });

    test("searchParams가 단일 키라면 단일 배열로 반환됨.", () => {
      // WHEN: 단일 키-값 쌍으로 호출
      // THEN: 키의 값이 배열로 반환되는지 확인
      expect(getAllQuery(searchUrl("?keyword=hello"))).toEqual({
        keyword: ["hello"],
      });
    });

    test("searchParams가 단일 키이고 다중 값의 조합이라면 순서가 보장된 배열로 반환됨.", () => {
      // WHEN: 단일 키에 다중 값이 설정된 searchParams로 호출
      // THEN: 값이 순서대로 배열에 담겨 반환되는지 확인
      expect(
        getAllQuery(searchUrl("?status=open&status=hold&status=done")),
      ).toEqual({
        status: ["open", "hold", "done"],
      });
    });

    test("searchParams에 여러 키가 섞여 있다면, 키의 순서에 따라 key: []로 반환됨.", () => {
      // WHEN: 여러 키가 섞여 있고 중복 키도 포함된 searchParams로 호출
      // THEN: 모든 키-값이 배열 형태로 올바르게 그룹화되어 반환되는지 확인
      expect(getAllQuery(searchUrl("?order=1&invoice=2&order=3"))).toEqual({
        order: ["1", "3"],
        invoice: ["2"],
      });
    });

    test("searchParams에 빈 값이 대입된다면, 빈 '' 배열이 반환됨.", () => {
      // WHEN: 값이 없는 키(kw=)를 포함하는 searchParams로 호출
      // THEN: 해당 키의 값이 빈 문자열([""]) 배열로 반환되는지 확인
      expect(getAllQuery(searchUrl("?kw="))).toEqual({ kw: [""] });
    });
  });

  describe("deleteQueryKeys Test", () => {
    // GIVEN: Mock 요청 객체를 준비
    const mockReq = {
      query: { status: "Activated", keyword: "car", order: "1" },
    };

    test("req에 포함된 key를 전달하면, 해당 key들을 제외한 객체가 query 객체에 포함되어 반환됨.", () => {
      // GIVEN: 제거할 키 목록을 준비
      // WHEN: deleteQueryKeys 함수를 호출
      const result = deleteQueryKeys({
        req: mockReq,
        keys: ["status", "order"],
      });

      // THEN: 지정된 키가 제외되고 나머지 키만 포함된 객체가 반환되는지 확인
      expect(result).toEqual({ query: { keyword: "car" } });
      // THEN: status와 order가 실제로 제거되었는지 확인
      expect(result.query).not.toHaveProperty("status");
      expect(result.query).not.toHaveProperty("order");
    });

    test("중복 key가 있어도 해당 key들을 제외한 객체가 query 객체에 포함되어 반환됨.", () => {
      // GIVEN: 중복된 키를 포함하는 제거할 키 목록을 준비
      // WHEN: deleteQueryKeys 함수를 호출
      const result = deleteQueryKeys({
        req: mockReq,
        keys: ["status", "status"],
      });

      // THEN: status 키가 제거되고 나머지 키만 포함되었는지 확인
      expect(result).toEqual({ query: { keyword: "car", order: "1" } });
      // THEN: status가 제거되었는지 확인
      expect(result.query).not.toHaveProperty("status");
    });

    test("모든 key를 제거하면 빈 객체가 반환됨.", () => {
      // GIVEN: 모든 키를 포함하는 제거할 키 목록을 준비
      // WHEN: deleteQueryKeys 함수를 호출
      const result = deleteQueryKeys({
        req: mockReq,
        keys: ["status", "keyword", "order"],
      });

      // THEN: 빈 쿼리 객체가 반환되는지 확인
      expect(result.query).toEqual({});
    });
  });

  describe("formatDateTimeQueryFilter Test", () => {
    // GIVEN: 날짜 범위 값 (시작일 == 종료일)
    const sameValue = "29/09/2025 ~ 29/09/2025";
    // GIVEN: 날짜 범위 값 (시작일 != 종료일)
    const differentValue = "29/09/2025 ~ 30/09/2025";

    // GIVEN: 모든 날짜/시간 키 쌍(SUFFIX_DATE_QUERY_KEYS)에 대해 기본 구조 검증
    it.each(SUFFIX_DATE_QUERY_KEYS)(
      "$start 인자를 전달 받아 $start $end에 맞는 date format을 반환.",
      ({ start, end }) => {
        // WHEN: formatDateTimeQueryFilter 함수를 호출
        const result = formatDateTimeQueryFilter({
          key: start,
          value: sameValue,
          isLocalTime: false,
        });

        // THEN: 결과 객체의 키가 [start, end]로 올바르게 구성되었는지 확인
        expect(Object.keys(result)).toEqual([start, end]);
        expect(Object.keys(result)).toHaveLength(2);
      },
    );

    describe(`${sameValue} Test`, () => {
      // GIVEN: 로컬 시간 기준 시작/종료 시간 (종료일은 다음날 00:00:00.000Z)
      const localStartDate = "2025-09-29T00:00:00.000Z";
      const localEndDate = "2025-09-30T00:00:00.000Z";
      // GIVEN: Vientiane 시간(UTC+7) 기준 시작/종료 시간 (로컬 시간과 7시간 차이)
      const vientianeStartDate = "2025-09-28T17:00:00.000Z";
      const vientianeEndDate = "2025-09-29T17:00:00.000Z"; // 종료일은 +1일 00시 - 7시간

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `isLocalTime=false라면, $start 인자를 전달 받아 Vientiane 기준의 $start: ${vientianeStartDate} $end: ${vientianeEndDate} date format을 반환.`,
        ({ start, end }) => {
          // WHEN: isLocalTime: false (Vientiane Timezone)로 호출
          const result = formatDateTimeQueryFilter({
            key: start,
            value: sameValue,
            isLocalTime: false,
          });

          // THEN: Vientiane 기준으로 00:00:00Z(시작일)와 다음날 00:00:00Z(종료일)의 UTC 변환 결과와 일치하는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(vientianeStartDate);
          expect(result[end]).toBe(vientianeEndDate);
        },
      );

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `isLocalTime=true라면, $start 인자를 전달 받아 $start: ${localStartDate} $end: ${localEndDate} date format을 반환.`,
        ({ start, end }) => {
          // WHEN: isLocalTime: true (Local Timezone, UTC 기준)로 호출
          const result = formatDateTimeQueryFilter({
            key: start,
            value: sameValue,
            isLocalTime: true,
          });

          // THEN: 로컬 기준 (UTC) 00:00:00Z(시작일)와 다음날 00:00:00Z(종료일)의 UTC 결과와 일치하는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(localStartDate);
          expect(result[end]).toBe(localEndDate);
        },
      );
    });

    describe(`${differentValue} Test`, () => {
      // GIVEN: 날짜가 다른 경우의 로컬 시간 기준 시작/종료 시간 (종료일 +1일)
      const localStartDate = "2025-09-29T00:00:00.000Z";
      const localEndDate = "2025-10-01T00:00:00.000Z"; // 9/30의 다음날
      // GIVEN: 날짜가 다른 경우의 Vientiane 시간 기준 시작/종료 시간
      const vientianeStartDate = "2025-09-28T17:00:00.000Z";
      const vientianeEndDate = "2025-09-30T17:00:00.000Z"; // 9/30의 다음날

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `isLocalTime=false라면, $start 인자를 전달 받아 Vientiane 기준의 $start: ${vientianeStartDate} $end: ${vientianeEndDate} date format을 반환.`,
        ({ start, end }) => {
          // WHEN: isLocalTime: false (Vientiane Timezone)로 호출
          const result = formatDateTimeQueryFilter({
            key: start,
            value: differentValue,
            isLocalTime: false,
          });

          // THEN: Vientiane 기준으로 올바르게 UTC 변환된 시작/종료 시간과 일치하는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(vientianeStartDate);
          expect(result[end]).toBe(vientianeEndDate);
        },
      );

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `isLocalTime=true라면, $start 인자를 전달 받아 $start: ${localStartDate} $end: ${localEndDate} date format을 반환.`,
        ({ start, end }) => {
          // WHEN: isLocalTime: true (Local Timezone, UTC 기준)로 호출
          const result = formatDateTimeQueryFilter({
            key: start,
            value: differentValue,
            isLocalTime: true,
          });

          // THEN: 로컬 기준으로 올바르게 UTC 변환된 시작/종료 시간과 일치하는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(localStartDate);
          expect(result[end]).toBe(localEndDate);
        },
      );
    });
  });

  describe("formatDateQueryFilter Test", () => {
    // GIVEN: 날짜 범위 값 (시작일 == 종료일)
    const sameValue = "29/09/2025 ~ 29/09/2025";
    // GIVEN: 날짜 범위 값 (시작일 != 종료일)
    const differentValue = "29/09/2025 ~ 30/09/2025";

    // GIVEN: 모든 날짜 키 쌍에 대해 기본 구조 검증
    it.each(SUFFIX_DATE_QUERY_KEYS)(
      "$start 인자를 전달 받아 $start $end에 맞는 date format을 반환.",
      ({ start, end }) => {
        // WHEN: formatDateQueryFilter 함수를 호출
        const result = formatDateQueryFilter({ key: start, value: sameValue });

        // THEN: 결과 객체의 키가 [start, end]로 올바르게 구성되었는지 확인
        expect(Object.keys(result)).toEqual([start, end]);
        expect(Object.keys(result)).toHaveLength(2);
      },
    );

    describe(`${sameValue} Test`, () => {
      // GIVEN: 기대되는 YYYY-MM-DD 형식의 시작/종료 날짜
      const formatStartDate = "2025-09-29";
      const formatEndDate = "2025-09-29";

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `$start 인자를 전달 받아 $start: ${formatStartDate} $end: ${formatEndDate}에 맞는 date format을 반환.`,
        ({ start, end }) => {
          // WHEN: formatDateQueryFilter 함수를 호출
          const result = formatDateQueryFilter({
            key: start,
            value: sameValue,
          });

          // THEN: 결과가 YYYY-MM-DD 형식으로 올바르게 변환되었는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(formatStartDate);
          expect(result[end]).toBe(formatEndDate);
        },
      );
    });

    describe(`${differentValue} Test`, () => {
      // GIVEN: 기대되는 YYYY-MM-DD 형식의 시작/종료 날짜
      const formatStartDate = "2025-09-29";
      const formatEndDate = "2025-09-30";

      it.each(SUFFIX_DATE_QUERY_KEYS)(
        `$start 인자를 전달 받아 $start: ${formatStartDate} $end: ${formatEndDate}에 맞는 date format을 반환.`,
        ({ start, end }) => {
          // WHEN: formatDateQueryFilter 함수를 호출
          const result = formatDateQueryFilter({
            key: start,
            value: differentValue,
          });

          // THEN: 결과가 YYYY-MM-DD 형식으로 올바르게 변환되었는지 확인
          expect(Object.keys(result)).toEqual([start, end]);
          expect(Object.keys(result)).toHaveLength(2);
          expect(result[start]).toBe(formatStartDate);
          expect(result[end]).toBe(formatEndDate);
        },
      );
    });
  });

  describe("formatQueryFilterDate Test", () => {
    test("dates가 빈 ''이면 ''가 반환됨.", () => {
      // WHEN: 빈 문자열을 입력
      const result = formatQueryFilterDate("");

      // THEN: 빈 문자열을 반환하는지 확인
      expect(result).toBe("");
    });

    test("dates가 빈 배열이면 ''가 반환됨.", () => {
      // WHEN: 빈 배열을 입력
      const result = formatQueryFilterDate([]);

      // THEN: 빈 문자열을 반환하는지 확인
      expect(result).toBe("");
    });

    test("dates가 string 타입이면 string만 반환됨.", () => {
      // WHEN: 단일 날짜 문자열을 입력
      const result = formatQueryFilterDate("25/09/2025");

      // THEN: 입력된 문자열을 그대로 반환하는지 확인
      expect(result).toBe("25/09/2025");
    });

    describe("배열 test", () => {
      test("0번째 index가 반 값이라면 ''가 반환됨.", () => {
        // WHEN: 시작 날짜가 빈 값인 배열을 입력
        const result = formatQueryFilterDate(["", "25/09/2025"]);

        // THEN: 빈 문자열을 반환하는지 확인 (시작 날짜가 필수)
        expect(result).toBe("");
      });

      test("0번째 index만 값이 있다면 '[0] ~ [0]'으로 반환됨.", () => {
        // WHEN: 시작 날짜만 있고 종료 날짜가 없는 배열을 입력
        const result = formatQueryFilterDate(["25/09/2025", ""]);

        // THEN: 시작일 ~ 시작일 형식으로 반환되는지 확인
        expect(result).toBe("25/09/2025 ~ 25/09/2025");
      });

      test("0, 1번째 index에 값이 있으면, '[0] ~ [1]'으로 반환됨.", () => {
        // WHEN: 시작일과 종료일이 모두 있는 배열을 입력
        const result = formatQueryFilterDate(["25/09/2025", "26/09/2025"]);

        // THEN: 시작일 ~ 종료일 형식으로 반환되는지 확인
        expect(result).toBe("25/09/2025 ~ 26/09/2025");
      });

      test("길이가 3 이상이라도 '[0] ~ [1]'으로 반환됨.", () => {
        // WHEN: 2개 이상의 항목을 가진 배열을 입력
        const result = formatQueryFilterDate([
          "25/09/2025",
          "26/09/2025",
          "27/09/2025",
          "28/09/2025",
        ]);

        // THEN: 0번째와 1번째 인덱스만 사용하여 형식화되는지 확인
        expect(result).toBe("25/09/2025 ~ 26/09/2025");
      });
    });
  });
});
