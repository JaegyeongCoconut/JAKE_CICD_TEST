import { describe, expect, test } from "vitest";

import type { TableColumns, Languages } from "@repo/types";

import { calcTableWidth, filterTableColumns } from "@packages/utils/table";

// DESC: CheckTable의 전체 선택 checkbox의 공백을 설정할 때 사용되는 앞쪽 그리드 너비
const nextGrid = ["120px"];
// DESC: 기존 table header의 column 앞에 조건에 따라 추가적인 header column이 필요할 때 사용되는 뒤쪽 그리드 너비
const prevGrid = ["240px"];

describe("calcTableWidth Test", () => {
  const translated = "translated" as Languages;

  test("prevGrid, tableHeaderInfos, nextGrid 가 join됨.", () => {
    // GIVEN: prevGrid, nextGrid, columnWidth가 있는 1depth 컬럼 정보
    const result = calcTableWidth({
      prevGrid,
      tableHeaderInfos: [
        { key: "1depth", label: translated, columnWidth: "110px" },
      ],
      nextGrid,
    });

    // THEN: 모든 너비 정보가 공백으로 연결된 문자열을 반환해야 함
    expect(result).toBe("240px 110px 120px");
  });

  test("prevGrid가 없을 때, tableHeaderInfos, nextGrid 만 join됩니다", () => {
    // GIVEN: prevGrid가 없는 상태
    const result = calcTableWidth({
      tableHeaderInfos: [
        { key: "1depth", label: translated, columnWidth: "110px" },
      ],
      nextGrid,
    });

    // THEN: tableHeaderInfos와 nextGrid 너비만 연결된 문자열을 반환해야 함
    expect(result).toBe("110px 120px");
  });

  test("prevGrid와 nextGrid가 없을 때는 tableHeaderInfos만 join됨.", () => {
    // GIVEN: prevGrid와 nextGrid가 모두 없는 상태
    const result = calcTableWidth({
      tableHeaderInfos: [
        { key: "1depth", label: translated, columnWidth: "110px" },
      ],
    });

    // THEN: tableHeaderInfos 너비만 포함된 문자열을 반환해야 함
    expect(result).toBe("110px");
  });

  test("tableHeaderInfos의 columnWidth 표현이 ['value1', 'value2']일 경우, minmax(value1, value2) 형식으로 join됨.", () => {
    // GIVEN: columnWidth가 배열 ['min', 'max'] 형태로 정의됨
    const result = calcTableWidth({
      tableHeaderInfos: [
        { key: "1depth", label: translated, columnWidth: ["110px", "200px"] },
      ],
    });

    // THEN: CSS Grid의 minmax() 형식으로 변환되어 반환되어야 함
    expect(result).toBe("minmax(110px, 200px)");
  });

  test(`tableHeaderInfos에 secondDepthes가 있는 경우, 1depth의 columnWidth는 무시되고 2depth의 columnWidth만 join됨.`, () => {
    // GIVEN: 1depth 컬럼 아래에 두 개의 2depth 컬럼이 있고, 각기 다른 columnWidth를 가짐
    const result = calcTableWidth({
      tableHeaderInfos: [
        {
          key: "1depth",
          label: translated,
          columnWidth: "100px", // DESC: 이 값은 무시됨
          secondDepthes: [
            { key: "2depth", label: translated, columnWidth: "20px" },
            { key: "2depth", label: translated, columnWidth: "20px" },
          ],
        },
      ],
    });

    // THEN: 1depth의 너비는 무시되고 2depth 컬럼들의 너비만 연결되어 반환되어야 함
    expect(result).toBe("20px 20px");
  });
});

describe("filterTableColumns Test", () => {
  const translated = "translated" as Languages;

  test("1depth만 있을 때: 입력과 동일한 컬럼을 반환.", () => {
    // GIVEN: secondDepthes가 없는 1depth 컬럼 목록
    const input: TableColumns<"A" | "B"> = [
      { key: "A", label: translated },
      { key: "B", label: translated },
    ] as const;

    // WHEN: filterTableColumns 함수 호출
    const res = filterTableColumns(input);

    // THEN: 입력 배열과 동일한 결과를 반환해야 함 (변화 없음)
    expect(res).toEqual([
      { key: "A", label: translated },
      { key: "B", label: translated },
    ]);
  });

  test("2depth가 있을 때: 부모 제외, 자식들만 평탄화되어 반환됨.", () => {
    // GIVEN: 부모 컬럼(Parent)과 그 아래 자식 컬럼(ChildA, ChildB)이 있는 계층적 구조
    const input: TableColumns<"Parent" | "ChildA" | "ChildB"> = [
      {
        key: "Parent",
        label: translated,
        secondDepthes: [
          { key: "ChildA", label: translated },
          { key: "ChildB", label: translated },
        ],
      },
    ] as const;

    // WHEN: filterTableColumns 함수 호출
    const res = filterTableColumns(input);

    // THEN: 부모 컬럼은 제거되고 자식 컬럼들만 포함된 평탄화된 배열을 반환해야 함
    expect(res).toEqual([
      { key: "ChildA", label: translated },
      { key: "ChildB", label: translated },
    ]);
  });
});
