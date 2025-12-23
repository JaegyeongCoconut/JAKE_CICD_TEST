import { describe, test, expect } from "vitest";

import { checkSearchValueExist } from "@packages/utils/searchFilter";

describe("checkSearchValueExist", () => {
  test("sourceString가 null || undefined || '' 이면 false를 반환.", () => {
    // WHEN: sourceString이 유효하지 않은 값(null, undefined, 빈 문자열)일 때
    // THEN: 검색 가능 여부와 관계없이 false를 반환해야 함
    expect(
      checkSearchValueExist({ sourceString: null, searchString: "a" }),
    ).toBe(false);
    expect(
      checkSearchValueExist({ sourceString: undefined, searchString: "a" }),
    ).toBe(false);
    expect(checkSearchValueExist({ sourceString: "", searchString: "a" })).toBe(
      false,
    );
  });

  test("sourceString에 searchString을 포함하고 있지 않으면 false를 반환.", () => {
    // GIVEN: sourceString에 searchString이 포함되어 있지 않음
    // WHEN: checkSearchValueExist 함수를 호출
    // THEN: false를 반환해야 함
    expect(
      checkSearchValueExist({
        sourceString: "BananaOrange",
        searchString: "apple",
      }),
    ).toBe(false);
    expect(
      checkSearchValueExist({
        sourceString: "Banana\nOrange",
        searchString: "apple",
      }),
    ).toBe(false);
    expect(
      checkSearchValueExist({
        sourceString: " Banana Orange ",
        searchString: "apple",
      }),
    ).toBe(false);
  });

  test("searchString이 null이면(검색어 미입력 상태) true를 반환.", () => {
    // GIVEN: searchString이 null (검색어가 입력되지 않은 상태)
    // WHEN: checkSearchValueExist 함수를 호출
    // THEN: 검색 필터가 적용되지 않는 것으로 간주하여 true를 반환해야 함
    expect(
      checkSearchValueExist({ sourceString: "Hello", searchString: null }),
    ).toBe(true);
  });

  test("대소문자를 무시하고 포함 여부를 판단함.", () => {
    // GIVEN: sourceString과 searchString이 대소문자만 다른 상태
    // WHEN: checkSearchValueExist 함수를 호출
    // THEN: 대소문자를 무시하고 비교하여 true를 반환해야 함
    expect(
      checkSearchValueExist({
        sourceString: "NewYork",
        searchString: "newyork",
      }),
    ).toBe(true);
  });

  test("개행 || 탭 || 공백 등을 제거 후 비교", () => {
    // GIVEN: source에 개행(\t)과 공백( )이 포함된 문자열, search는 공백이 제거된 문자열
    const source = "Seoul\tMe  tro\tLine";
    const search = "seoulmetro";
    // WHEN: checkSearchValueExist 함수를 호출
    // THEN: 모든 공백 문자를 제거하고 대소문자를 무시하여 비교한 후 true를 반환해야 함
    expect(
      checkSearchValueExist({ sourceString: source, searchString: search }),
    ).toBe(true);
  });
});
