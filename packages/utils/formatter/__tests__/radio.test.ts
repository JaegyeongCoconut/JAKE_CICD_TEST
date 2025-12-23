import { describe, expect, it, test } from "vitest";

import type { Languages } from "@packages/types";
import { filterRadioExceptInitData } from "@packages/utils/formatter/radio";

describe("filterRadioExceptInitData Test", () => {
  // GIVEN: 테스트에 사용될 고정된 라디오 버튼 목록
  const radios = [
    { key: "key1", label: "label1" as Languages },
    { key: "key2", label: "label2" as Languages },
    { key: "key3", label: "label3" as Languages },
    { key: "key4", label: "label4" as Languages },
    { key: "key5", label: "label5" as Languages },
  ] as const;

  describe("원본 radios를 그대로 반환", () => {
    it.each([{ initData: null }, { initData: undefined }])(
      "initData=$initData이면, 파라미터로 전달한 filteredDefaultRadio는 radios[0]과 filteredRadios는 radios 전체를 반환.",
      ({ initData }) => {
        // WHEN: initData가 null 또는 undefined인 경우
        const result = filterRadioExceptInitData({ initData, radios });

        // THEN: 필터링된 목록은 원본 radios와 동일해야 함
        expect(result.filteredRadios).toEqual(radios);
        // THEN: 기본 선택 항목은 radios의 첫 번째 요소(radios[0])여야 함
        expect(result.filteredDefaultRadio).toEqual(radios[0]);
      },
    );

    test("initData가 radios의 key와 일치하지 않으면, 파라미터로 전달한 filteredDefaultRadio는 radios[0]과 filteredRadios는 radios 전체를 반환.", () => {
      // WHEN: initData가 radios 목록에 없는 값인 경우 ("unkown")
      const result = filterRadioExceptInitData({ initData: "unkown", radios });

      // THEN: 필터링된 목록은 원본 radios와 동일해야 함
      expect(result.filteredRadios).toEqual(radios);
      // THEN: 기본 선택 항목은 radios의 첫 번째 요소(radios[0])여야 함
      expect(result.filteredDefaultRadio).toEqual(radios[0]);
    });
  });

  describe("원본 radios의 key와 일치하는 경우", () => {
    it.each([
      {
        initData: "key1", // DESC: key1이 일치
        filteredDefaultRadio: radios[1], // DESC: 기본 선택 항목은 key1과 일치하지 않은 radios[1]
        filteredRadios: [radios[1], radios[2], radios[3], radios[4]], // key1을 제외한 나머지 목록
      },
      {
        initData: "key2", // DESC: key2가 일치
        filteredDefaultRadio: radios[0], // DESC: 기본 선택 항목은 key2와 일치하지 않은 radios[0]
        filteredRadios: [radios[0], radios[2], radios[3], radios[4]], // key2를 제외한 나머지 목록
      },
      {
        initData: "key3", // DESC: key3이 일치
        filteredDefaultRadio: radios[0], // DESC: 기본 선택 항목은 key3와 일치하지 않은 radios[0]
        filteredRadios: [radios[0], radios[1], radios[3], radios[4]], // DESC: key3을 제외한 나머지 목록
      },
      {
        initData: "key4", // DESC: key4가 일치
        filteredDefaultRadio: radios[0], // DESC: 기본 선택 항목은 key4와 일치하지 않은 radios[0]
        filteredRadios: [radios[0], radios[1], radios[2], radios[4]], // DESC: key4를 제외한 나머지 목록
      },
      {
        initData: "key5", // DESC: key5가 일치
        filteredDefaultRadio: radios[0], // DESC: 기본 선택 항목은 key5와 일치하지 않은 radios[0]
        filteredRadios: [radios[0], radios[1], radios[2], radios[3]], // DESC: key5를 제외한 나머지 목록
      },
    ])(
      "radios 객체 배열의 key와 일치하는 initData=$initData인 경우, filteredDefaultRadio=$filteredDefaultRadio로 filteredRadios=$filteredRadios로 반환.",
      ({ initData, filteredDefaultRadio, filteredRadios }) => {
        // WHEN: initData가 radios 목록의 key와 일치하는 경우
        const result = filterRadioExceptInitData({ initData, radios });

        // THEN: filteredRadios는 initData의 key와 일치하는 항목을 제외한 목록이어야 함
        expect(result.filteredRadios).toEqual(filteredRadios);
        // THEN: filteredDefaultRadio는 initData의 key와 일치하지 않는 첫 번째 항목이어야 함
        expect(result.filteredDefaultRadio).toEqual(filteredDefaultRadio);
      },
    );
  });
});
