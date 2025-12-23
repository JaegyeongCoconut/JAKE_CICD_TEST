import { describe, expect, test } from "vitest";

import pathStorage from "@packages/utils/pathStorage";

describe("PathStorage Test", () => {
  // GIVEN: 테스트에 사용될 기본 경로를 정의
  const DEFAULT_PATH = "/home";

  test("key가 없을 때 getPath는 defaultPath로 반환됨.", () => {
    // GIVEN: pathStorage에 저장된 경로가 없는 상태 (테스트 시작 시 초기 상태)

    // WHEN: getPath 함수를 defaultPath와 함께 호출
    // THEN: 저장된 값이 없으므로 기본 경로(DEFAULT_PATH)를 반환하는지 확인
    expect(pathStorage.getPath(DEFAULT_PATH)).toBe(DEFAULT_PATH);
  });

  test("setPath 후 getPath는 setPath로 지정된 path로 반환됨.", () => {
    // GIVEN: 저장할 새 경로를 정의
    const newPath = "/cars/123";

    // WHEN: setPath 함수를 호출하여 새 경로를 저장
    pathStorage.setPath(newPath);

    // WHEN: getPath 함수를 호출 (defaultPath는 무시됨)
    // THEN: 이전에 setPath로 저장된 경로(newPath)를 반환하는지 확인
    expect(pathStorage.getPath(DEFAULT_PATH)).toBe(newPath);
  });
});
