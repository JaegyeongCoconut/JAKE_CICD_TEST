import { describe, expect, it, test } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages, QueryFilterConstructorType } from "@repo/types";

import { useQueryFilterStateStore } from "@packages/stores/queryFilterState";

describe("useQueryFilterStateStore Test", () => {
  describe("onSetQueryFilters Test", () => {
    describe("QUERY_FILTER_TYPE = RADIO", () => {
      // GIVEN: 공통 선택 항목 및 필터 생성자 정의
      const selections = [
        { key: "client", label: "Client" as Languages },
        { key: "driver", label: "Driver" as Languages },
      ] as const;
      const constructor = {
        status: {
          type: QUERY_FILTER_TYPE.RADIO,
          queryKey: "status",
          label: "Status" as Languages,
          selections,
          isRequired: true,
        },
      } satisfies QueryFilterConstructorType<"status">;

      test("searchParams가 없을 때 type='radio'이고 tagValue=''를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 RADIO이고, searchParams가 없으므로 tagValue가 빈 문자열로 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.RADIO);
        expect(queryFilters.status.tagValue).toBe("");
      });

      test("searchParams에 값이 있으므로 tagValue가 'client'로 되었는지 검증함.", () => {
        // WHEN: searchParams에 유효한 값(status=client)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("status=client"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 RADIO이고, searchParams 값인 'client'로 tagValue가 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.RADIO);
        expect(queryFilters.status.tagValue).toBe("client");
      });
    });

    describe("QUERY_FILTER_TYPE = DROPDOWN", () => {
      // GIVEN: 공통 선택 항목 및 필터 생성자 정의
      const selections = [
        { key: "client", label: "Client" as Languages },
        { key: "driver", label: "Driver" as Languages },
      ] as const;
      const constructor = {
        status: {
          type: QUERY_FILTER_TYPE.DROPDOWN,
          queryKey: "status",
          label: "Status" as Languages,
          selections,
          placeholder: "Select the option" as Languages,
        },
      } satisfies QueryFilterConstructorType<"status">;

      test("searchParams가 없을 때 type='dropdown'이고 tagValue=''를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 DROPDOWN이고, searchParams가 없으므로 tagValue가 빈 문자열로 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.DROPDOWN);
        expect(queryFilters.status.tagValue).toBe("");
      });

      test("searchParams에 값이 있으므로 tagValue가 'client'로 되었는지 검증함.", () => {
        // WHEN: searchParams에 유효한 값(status=client)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("status=client"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 DROPDOWN이고, searchParams 값인 'client'로 tagValue가 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.DROPDOWN);
        expect(queryFilters.status.tagValue).toBe("client");
      });
    });

    describe("QUERY_FILTER_TYPE = CHECKBOX", () => {
      // GIVEN: 공통 선택 항목 및 필터 생성자 정의
      const selections = [
        { key: "client", label: "Client" as Languages },
        { key: "customer", label: "Customer" as Languages },
        { key: "driver", label: "Driver" as Languages },
      ] as const;
      const constructor = {
        status: {
          type: QUERY_FILTER_TYPE.CHECKBOX,
          queryKey: "status",
          label: "Status" as Languages,
          selections,
          hasAllCheckButton: false,
        },
      } satisfies QueryFilterConstructorType<"status">;

      test("searchParams가 없을 때 type='checkbox'이고 tagValue=[]를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 CHECKBOX이고, searchParams가 없으므로 tagValue가 빈 배열로 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.CHECKBOX);
        expect(queryFilters.status.tagValue).toEqual([]);
      });

      test("복수 searchParams가 있을 때 tagValue가 배열로 초기화되는지 확인.", () => {
        // WHEN: searchParams에 복수 값(status=client&status=driver)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("status=client&status=driver"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 status 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("status");
        // THEN: 필터의 타입이 CHECKBOX이고, searchParams의 모든 값이 배열로 초기화되었는지 검증
        expect(queryFilters.status.type).toBe(QUERY_FILTER_TYPE.CHECKBOX);
        expect(queryFilters.status.tagValue).toEqual(["client", "driver"]);
      });
    });

    describe("QUERY_FILTER_TYPE = CALENDAR", () => {
      // GIVEN: 캘린더 공통 생성자 정의
      const baseCalendarConstructor = {
        created: {
          type: QUERY_FILTER_TYPE.CALENDAR,
          queryKey: "created",
          label: "Created date" as Languages,
          placeholder: "Select date" as Languages,
        },
      } as const;

      test("searchParams가 없을 때, calendarType에 관계 없이 tagValue=[]를 반환하는지 확인.", () => {
        // GIVEN: calendarType='free'인 생성자
        const typeFreeConstructor = {
          created: { ...baseCalendarConstructor.created, calendarType: "free" },
        } satisfies QueryFilterConstructorType<"created">;

        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor: typeFreeConstructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 created 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("created");
        // THEN: 필터의 타입이 CALENDAR이고, searchParams가 없으므로 tagValue가 빈 배열로 초기화되었는지 검증
        expect(queryFilters.created.type).toBe(QUERY_FILTER_TYPE.CALENDAR);
        expect(queryFilters.created.queryKey).toBe("created");
        expect(queryFilters.created.tagValue).toEqual([]);
      });

      describe("searhParams가 있을 때", () => {
        test("calendarType='free'일 때, '시작일 ~ 종료일'을 [시작일, 종료일] 배열로 초기화함.", () => {
          // GIVEN: calendarType='free'인 생성자
          const typeFreeConstructor = {
            created: {
              ...baseCalendarConstructor.created,
              calendarType: "free",
            },
          } satisfies QueryFilterConstructorType<"created">;

          // WHEN: searchParams에 '시작일 ~ 종료일' 값을 포함하여 호출
          useQueryFilterStateStore.getState().onSetQueryFilters({
            constructor: typeFreeConstructor,
            searchParams: new URLSearchParams(
              "created=2025-01-01 ~ 2025-01-31",
            ),
          });

          // THEN:
          const { queryFilters } = useQueryFilterStateStore.getState();

          // THEN: 상태에 created 필터가 올바르게 추가되었는지 검증
          expect(queryFilters).toHaveProperty("created");
          // THEN: searchParams 값이 '~'를 기준으로 분리되어 [시작일, 종료일] 배열로 초기화되었는지 검증
          expect(queryFilters.created.type).toBe(QUERY_FILTER_TYPE.CALENDAR);
          expect(queryFilters.created.queryKey).toBe("created");
          expect(queryFilters.created.tagValue).toEqual([
            "2025-01-01",
            "2025-01-31",
          ]);
        });

        test("calendarType='date'일 때, '날짜'을 [날짜] 배열로 초기화함.", () => {
          // GIVEN: calendarType='date'인 생성자
          const typeDateConstructor = {
            created: {
              ...baseCalendarConstructor.created,
              calendarType: "date",
            },
          } satisfies QueryFilterConstructorType<"created">;

          // WHEN: searchParams에 '날짜' 값을 포함하여 호출 (date 타입은 범위 지정 무시하고 첫 번째 날짜만 사용)
          useQueryFilterStateStore.getState().onSetQueryFilters({
            constructor: typeDateConstructor,
            searchParams: new URLSearchParams(
              "created=2025-01-01 ~ 2025-01-31", // 실제로는 "2025-01-01"만 파싱됨
            ),
          });

          const { queryFilters } = useQueryFilterStateStore.getState();

          // THEN: 상태에 created 필터가 올바르게 추가되었는지 검증
          expect(queryFilters).toHaveProperty("created");
          // THEN: date 타입이므로 searchParams 값이 '~'와 관계없이 첫 번째 날짜만 포함된 배열로 초기화되었는지 검증
          expect(queryFilters.created.type).toBe(QUERY_FILTER_TYPE.CALENDAR);
          expect(queryFilters.created.queryKey).toBe("created");
          expect(queryFilters.created.tagValue).toEqual(["2025-01-01"]);
        });
      });
    });

    describe("QUERY_FILTER_TYPE = INPUT", () => {
      // GIVEN: INPUT 필터 생성자 정의
      const constructor = {
        regNo: {
          type: QUERY_FILTER_TYPE.INPUT,
          queryKey: "regNo",
          maxLength: 100,
          placeholder: "Enter plate number" as Languages,
          label: "Plate number" as Languages,
        },
      } satisfies QueryFilterConstructorType<"regNo">;

      test("searchParams가 없을 때, tagValue='', inputValue=''를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 regNo 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("regNo");

        // DESC: 타입이 INPUT임을 확인한 후, INPUT 필터 타입으로 단언하여 inputValue에 접근
        const regNoFilter = queryFilters.regNo;
        const inputFilter = regNoFilter as typeof regNoFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT이고, searchParams가 없으므로 tagValue와 inputValue가 빈 문자열로 초기화되었는지 검증
        expect(inputFilter.type).toBe(QUERY_FILTER_TYPE.INPUT);
        expect(inputFilter.tagValue).toBe("");
        expect(inputFilter.inputValue).toBe(""); // DESC: inputValue도 빈 문자열로 초기화되어야 함
      });

      test("searchParams가 있을 때, tagValue와 inputValue가 모두 올바르게 초기화되는지 확인.", () => {
        // WHEN: searchParams에 유효한 값(regNo=test)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("regNo=test"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 regNo 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("regNo");

        // DESC: 타입이 INPUT임을 확인한 후, INPUT 필터 타입으로 단언하여 inputValue에 접근
        const regNoFilter = queryFilters.regNo;
        const inputFilter = regNoFilter as typeof regNoFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT이고, tagValue와 inputValue가 searchParams 값인 'test'로 초기화되었는지 검증
        expect(inputFilter.type).toBe(QUERY_FILTER_TYPE.INPUT);
        expect(inputFilter.tagValue).toBe("test");
        expect(inputFilter.inputValue).toBe("test"); // DESC: inputValue와 tagValue가 동기화되어야 함
      });
    });

    describe("QUERY_FILTER_TYPE = INPUT_REGEXP", () => {
      // GIVEN: INPUT_REGEXP 필터 생성자 정의
      const constructor = {
        tel: {
          type: QUERY_FILTER_TYPE.INPUT_REGEXP,
          queryKey: "tel",
          maxLength: 15,
          placeholder: "Enter the customer mobile" as Languages,
          label: "Customer mobile" as Languages,
          regExp: /[^0-9]/g,
        },
      } satisfies QueryFilterConstructorType<"tel">;

      test("searchParams가 없을 때, tagValue='', inputValue=''를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 tel 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("tel");

        // DESC: 타입이 INPUT_REGEXP임을 확인한 후, 해당 필터 타입으로 단언
        const telFilter = queryFilters.tel;
        const inputFilter = telFilter as typeof telFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT_REGEXP이고, tagValue와 inputValue가 빈 문자열로 초기화되었는지 검증
        expect(inputFilter.type).toBe(QUERY_FILTER_TYPE.INPUT_REGEXP);
        expect(inputFilter.tagValue).toBe("");
        expect(inputFilter.inputValue).toBe("");
      });

      test("searchParams가 있을 때, tagValue와 inputValue가 모두 올바르게 초기화되는지 확인.", () => {
        // WHEN: searchParams에 유효한 값(tel=82)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("tel=82"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 tel 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("tel");

        // DESC: 타입이 INPUT_REGEXP임을 확인한 후, 해당 필터 타입으로 단언
        const telFilter = queryFilters.tel;
        const inputFilter = telFilter as typeof telFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT_REGEXP이고, tagValue와 inputValue가 searchParams 값인 '82'로 초기화되었는지 검증
        expect(inputFilter.type).toBe(QUERY_FILTER_TYPE.INPUT_REGEXP);
        expect(inputFilter.tagValue).toBe("82");
        expect(inputFilter.inputValue).toBe("82");
      });
    });

    describe("QUERY_FILTER_TYPE = INPUT_REGEXP_FULL_LENGTH", () => {
      // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
      const constructor = {
        tel: {
          type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
          queryKey: "tel",
          maxLength: 15,
          placeholder: "Enter the customer mobile" as Languages,
          label: "Customer mobile" as Languages,
          regExp: /[^0-9]/g,
        },
      } satisfies QueryFilterConstructorType<"tel">;

      test("searchParams가 없을 때, tagValue='', inputValue=''를 반환하는지 확인.", () => {
        // WHEN: searchParams 없이 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams(""),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 tel 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("tel");

        // DESC: 타입이 INPUT_REGEXP_FULL_LENGTH임을 확인한 후, 해당 필터 타입으로 단언
        const telFilter = queryFilters.tel;
        const inputFilter = telFilter as typeof telFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT_REGEXP_FULL_LENGTH이고, tagValue와 inputValue가 빈 문자열로 초기화되었는지 검증
        expect(inputFilter.type).toBe(
          QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
        );
        expect(inputFilter.tagValue).toBe("");
        expect(inputFilter.inputValue).toBe("");
      });

      test("searchParams가 있을 때, tagValue와 inputValue가 모두 올바르게 초기화되는지 확인.", () => {
        // WHEN: searchParams에 유효한 값(tel=82)을 포함하여 onSetQueryFilters 호출
        useQueryFilterStateStore.getState().onSetQueryFilters({
          constructor,
          searchParams: new URLSearchParams("tel=82"),
        });

        const { queryFilters } = useQueryFilterStateStore.getState();

        // THEN: 상태에 tel 필터가 올바르게 추가되었는지 검증
        expect(queryFilters).toHaveProperty("tel");

        // DESC: 타입이 INPUT_REGEXP_FULL_LENGTH임을 확인한 후, 해당 필터 타입으로 단언
        const telFilter = queryFilters.tel;
        const inputFilter = telFilter as typeof telFilter & {
          inputValue: string;
        };

        // THEN: 필터의 타입이 INPUT_REGEXP_FULL_LENGTH이고, tagValue와 inputValue가 searchParams 값인 '82'로 초기화되었는지 검증
        expect(inputFilter.type).toBe(
          QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
        );
        expect(inputFilter.tagValue).toBe("82");
        expect(inputFilter.inputValue).toBe("82");
      });
    });
  });

  describe("onUpdateQueryKey Test", () => {
    it.each(Object.values(QUERY_FILTER_TYPE))(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치 하지 않으면 queryKey를 변경하지 않고 함수를 종료함.",
      (type) => {
        // WHEN: 각 필터 타입에 대한 설정 및 테스트
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("regNo")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("regNo");
            expect(queryFilters.regNo.queryKey).toBe("regNo");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("tel")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.queryKey).toBe("tel");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("tel")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.queryKey).toBe("tel");

            break;
          }
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("status")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("status");

            break;
          }
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("created")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.queryKey).toBe("created");

            break;
          }
          case QUERY_FILTER_TYPE.CHECKBOX: {
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("status")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("status");

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 변경되지 않고 초기 값("status")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("status");

            break;
          }
        }
      },
    );

    it.each(Object.values(QUERY_FILTER_TYPE))(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치할 때, queryFilters 내 해당 필터의 queryKey가 업데이트.",
      (type) => {
        // WHEN: 각 필터 타입에 대한 설정 및 테스트
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("regNo")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "regNo",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("regNo");
            expect(queryFilters.regNo.queryKey).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel", // 현재 쿼리 키
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "tel",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.queryKey).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "tel",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.queryKey).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "status",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("created")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "created",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.queryKey).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.CHECKBOX: {
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "status",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("updated");

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateQueryKey({
              queryKey: "status",
              key: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: 필터가 존재하며 queryKey가 새로운 값("updated")으로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.queryKey).toBe("updated");

            break;
          }
        }
      },
    );
  });

  describe("onUpdateInputValue Test", () => {
    const inputQueryTypes = [
      QUERY_FILTER_TYPE.INPUT,
      QUERY_FILTER_TYPE.INPUT_REGEXP,
      QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
    ] as const;
    const exceptionInputQueryTypes = [
      QUERY_FILTER_TYPE.CALENDAR,
      QUERY_FILTER_TYPE.CHECKBOX,
      QUERY_FILTER_TYPE.DROPDOWN,
      QUERY_FILTER_TYPE.RADIO,
    ] as const;

    it.each(inputQueryTypes)(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치 하지 않으면 inputValue를 변경하지 않고 함수를 종료함.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의 (초기 상태는 searchParams가 없어 inputValue='' 임)
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "", // 현재 상태의 queryKey("regNo")와 불일치
              inputValue: "updated", // 업데이트될 값
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("regNo");

            const regNoFilter = queryFilters.regNo;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = regNoFilter as typeof regNoFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 업데이트되지 않고 초기 값("")을 유지하는지 확인
            expect(inputFilter.inputValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "", // DESC: 현재 상태의 queryKey("tel")과 불일치
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 업데이트되지 않고 초기 값("")을 유지하는지 확인
            expect(inputFilter.inputValue).toBe("");

            break;
          }
          default: {
            // NOTE: INPUT_REGEXP_FULL_LENGTH 타입
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "", // 현재 상태의 queryKey("tel")과 불일치
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 업데이트되지 않고 초기 값("")을 유지하는지 확인
            expect(inputFilter.inputValue).toBe("");

            break;
          }
        }
      },
    );

    it.each(inputQueryTypes)(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치한다면 inputValue를 업데이트함.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("regNo")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "regNo", // DESC: 현재 상태의 queryKey("regNo")와 일치
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("regNo");

            const regNoFilter = queryFilters.regNo;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = regNoFilter as typeof regNoFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 "updated"로 성공적으로 업데이트되었는지 확인
            expect(inputFilter.inputValue).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "tel", // DESC: 현재 상태의 queryKey("tel")과 일치
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 "updated"로 성공적으로 업데이트되었는지 확인
            expect(inputFilter.inputValue).toBe("updated");

            break;
          }
          default: {
            // NOTE: INPUT_REGEXP_FULL_LENGTH 타입
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "tel", // 현재 상태의 queryKey("tel")과 일치
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: inputValue가 "updated"로 성공적으로 업데이트되었는지 확인
            expect(inputFilter.inputValue).toBe("updated");

            break;
          }
        }
      },
    );

    // DESC: 예외 필터 타입 검증 (inputValue 속성이 없음)
    it.each(exceptionInputQueryTypes)(
      "QUERY_FILTER_TYPE=%s인 경우, inputValue를 가지지 않기 때문에 'inputValue' 속성이 undefined",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "status",
              inputValue: "updated",
            });

            // THEN:
            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("status");

            const statusFilter = queryFilters.status;
            // THEN: 상태의 status 필터는 inputValue 속성을 가지지 않으므로 undefined인지 검증
            expect((statusFilter as any).inputValue).toBeUndefined();

            break;
          }
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("created")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "created",
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("created");

            const createdFilter = queryFilters.created;
            // THEN: 상태의 created 필터는 inputValue 속성을 가지지 않으므로 undefined인지 검증
            expect((createdFilter as any).inputValue).toBeUndefined();

            break;
          }
          case QUERY_FILTER_TYPE.CHECKBOX: {
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("created")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "created",
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("status");

            const statusFilter = queryFilters.status;
            // THEN: 상태의 status 필터는 inputValue 속성을 가지지 않으므로 undefined인지 검증
            expect((statusFilter as any).inputValue).toBeUndefined();

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")로 inputValue 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateInputValue({
              queryKey: "status",
              inputValue: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("status");

            const statusFilter = queryFilters.status;
            // THEN: 상태의 status 필터는 inputValue 속성을 가지지 않으므로 undefined인지 검증
            expect((statusFilter as any).inputValue).toBeUndefined();

            break;
          }
        }
      },
    );
  });

  describe("onUpdateTagValue Test", () => {
    it.each(Object.values(QUERY_FILTER_TYPE))(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치 하지 않으면 options에 관계 없이 tagValue를 변경하지 않고 함수를 종료함.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의 (tagValue는 초기값인 ""로 설정됨)
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "single", // DESC: 무관함
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("regNo");
            expect(queryFilters.regNo.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도 (tagValue는 배열을 기대)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값([])을 유지하는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.tagValue).toEqual([]);

            break;
          }
          case QUERY_FILTER_TYPE.CHECKBOX: {
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도 (tagValue는 배열을 기대)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값([])을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toEqual([]);

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하지 않는 queryKey("")로 업데이트 시도
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "", // DESC: 불일치
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
        }
      },
    );

    it.each([QUERY_FILTER_TYPE.CALENDAR, QUERY_FILTER_TYPE.CHECKBOX])(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치하더라도 options='single'이면 tagValue를 변경하지 않고 함수를 종료함.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의 (tagValue 초기값: [])
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("created")이지만, options="single"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "created",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값([])을 유지하는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.tagValue).toEqual([]);

            break;
          }
          default: {
            // NOTE: CHECKBOX 타입
            // GIVEN: CHECKBOX 필터 생성자 정의 (tagValue 초기값: [])
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")이지만, options="single"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값([])을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toEqual([]);

            break;
          }
        }
      },
    );

    it.each([QUERY_FILTER_TYPE.CALENDAR, QUERY_FILTER_TYPE.CHECKBOX])(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치하고 options='array'이면 queryFilters 내 해당 필터의 tagValue가 업데이트됨.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("created")와 options="array"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "created",
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 새로운 값(["updated"])으로 업데이트되었는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.tagValue).toEqual(["updated"]);

            break;
          }
          default: {
            // NOTE: CHECKBOX 타입
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")와 options="array"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 새로운 값(["updated"])으로 업데이트되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toEqual(["updated"]);

            break;
          }
        }
      },
    );

    it.each([
      QUERY_FILTER_TYPE.DROPDOWN,
      QUERY_FILTER_TYPE.RADIO,
      QUERY_FILTER_TYPE.INPUT,
      QUERY_FILTER_TYPE.INPUT_REGEXP,
      QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
    ])(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치하더라도 options='array'이면 tagValue를 변경하지 않고 함수를 종료함.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의 (tagValue 초기값: "")
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("regNo")이지만, options="array"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "regNo",
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("regNo");
            expect(queryFilters.regNo.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")이지만, options="array"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "tel",
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")이지만, options="array"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "tel",
              options: "array",
              selectedKey: ["updated"],
            });

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")이지만, options="array"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "array",
              selectedKey: ["updated"],
            });

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            const { queryFilters } = useQueryFilterStateStore.getState();
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")이지만, options="array"로 업데이트 시도 (조건 불일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "array",
              selectedKey: ["updated"],
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 초기 값("")을 유지하는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
        }
      },
    );

    it.each([
      QUERY_FILTER_TYPE.DROPDOWN,
      QUERY_FILTER_TYPE.RADIO,
      QUERY_FILTER_TYPE.INPUT,
      QUERY_FILTER_TYPE.INPUT_REGEXP,
      QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
    ])(
      "QUERY_FILTER_TYPE=%s일 때, queryKey가 일치하고 options='single'이면 queryFilters 내 해당 필터의 tagValue가 업데이트됨.",
      (type) => {
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("regNo")와 options="single"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "regNo",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 "updated"로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("regNo");
            expect(queryFilters.regNo.tagValue).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")와 options="single"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "tel",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 "updated"로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH: {
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("tel")와 options="single"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "tel",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 "updated"로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("tel");
            expect(queryFilters.tel.tagValue).toBe("updated");

            break;
          }
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")와 options="single"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 "updated"로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("updated");

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 일치하는 queryKey("status")와 options="single"로 업데이트 시도 (조건 일치)
            useQueryFilterStateStore.getState().onUpdateTagValue({
              queryKey: "status",
              options: "single",
              selectedKey: "updated",
            });

            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 "updated"로 성공적으로 변경되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("updated");

            break;
          }
        }
      },
    );
  });

  describe("onResetAllValues Test", () => {
    // GIVEN: tagValue가 배열 형태([ ])인 필터 타입 목록 정의
    const tagleValueWithArrayQueryTypes = [
      QUERY_FILTER_TYPE.CALENDAR,
      QUERY_FILTER_TYPE.CHECKBOX,
    ] as const;
    // GIVEN: tagValue가 단일 문자열 형태("")인 필터 타입 목록 정의
    const tagleValueWithSingleQueryTypes = [
      QUERY_FILTER_TYPE.DROPDOWN,
      QUERY_FILTER_TYPE.RADIO,
    ] as const;
    // GIVEN: inputValue와 tagValue 모두를 가지는 입력 필터 타입 목록 정의
    const inputValueAndTagValueQueryTypes = [
      QUERY_FILTER_TYPE.INPUT,
      QUERY_FILTER_TYPE.INPUT_REGEXP,
      QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
    ] as const;

    it.each(tagleValueWithArrayQueryTypes)(
      "QUERY_FILTER_TYPE=%s일 때, tagValue는 '[]'로 초기화됨.",
      (type) => {
        // WHEN: 각 필터 타입에 대한 설정 및 테스트
        switch (type) {
          case QUERY_FILTER_TYPE.CALENDAR: {
            // GIVEN: CALENDAR 필터 생성자 정의
            const constructor = {
              created: {
                type: QUERY_FILTER_TYPE.CALENDAR,
                queryKey: "created",
                label: "Created date" as Languages,
                placeholder: "Select date" as Languages,
                calendarType: "date",
              },
            } satisfies QueryFilterConstructorType<"created">;

            // WHEN: 1. 필터 초기 설정 (tagValue는 `[]`로 시작)
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 빈 배열([])로 초기화되었는지 확인
            expect(queryFilters).toHaveProperty("created");
            expect(queryFilters.created.tagValue).toEqual([]);

            break;
          }
          default: {
            // NOTE: CHECKBOX 타입
            // GIVEN: CHECKBOX 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "customer", label: "Customer" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.CHECKBOX,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                hasAllCheckButton: false,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 빈 배열([])로 초기화되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toEqual([]);

            break;
          }
        }
      },
    );

    it.each(tagleValueWithSingleQueryTypes)(
      "QUERY_FILTER_TYPE=%s일 때, tagValue는 ''로 초기화됨.",
      (type) => {
        // WHEN: 각 필터 타입에 대한 설정 및 테스트
        switch (type) {
          case QUERY_FILTER_TYPE.RADIO: {
            // GIVEN: RADIO 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.RADIO,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                isRequired: true,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정 (tagValue는 ""로 시작)
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 빈 문자열("")로 초기화되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
          default: {
            // NOTE: DROPDOWN 타입
            // GIVEN: DROPDOWN 필터 생성자 정의
            const selections = [
              { key: "client", label: "Client" as Languages },
              { key: "driver", label: "Driver" as Languages },
            ] as const;
            const constructor = {
              status: {
                type: QUERY_FILTER_TYPE.DROPDOWN,
                queryKey: "status",
                label: "Status" as Languages,
                selections,
                placeholder: "Select the option" as Languages,
              },
            } satisfies QueryFilterConstructorType<"status">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            // THEN: tagValue가 빈 문자열("")로 초기화되었는지 확인
            expect(queryFilters).toHaveProperty("status");
            expect(queryFilters.status.tagValue).toBe("");

            break;
          }
        }
      },
    );

    it.each(inputValueAndTagValueQueryTypes)(
      "QUERY_FILTER_TYPE=%s일 때, inputValue와 tagValue는 모두 ''로 초기화됨.",
      (type) => {
        // WHEN: 각 필터 타입에 대한 설정 및 테스트
        switch (type) {
          case QUERY_FILTER_TYPE.INPUT: {
            // GIVEN: INPUT 필터 생성자 정의
            const constructor = {
              regNo: {
                type: QUERY_FILTER_TYPE.INPUT,
                queryKey: "regNo",
                maxLength: 100,
                placeholder: "Enter plate number" as Languages,
                label: "Plate number" as Languages,
              },
            } satisfies QueryFilterConstructorType<"regNo">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            expect(queryFilters).toHaveProperty("regNo");

            const regNoFilter = queryFilters.regNo;
            // THEN: inputValue에 접근하기 위한 타입 단언 (테스트를 위해)
            const inputFilter = regNoFilter as typeof regNoFilter & {
              inputValue: string;
            };

            // THEN: tagValue와 inputValue 모두 빈 문자열("")로 초기화되었는지 확인
            expect(inputFilter.tagValue).toBe("");
            expect(inputFilter.inputValue).toBe("");

            break;
          }
          case QUERY_FILTER_TYPE.INPUT_REGEXP: {
            // GIVEN: INPUT_REGEXP 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: tagValue와 inputValue 모두 빈 문자열("")로 초기화되었는지 확인
            expect(inputFilter.tagValue).toBe("");
            expect(inputFilter.inputValue).toBe("");

            break;
          }
          default: {
            // NOTE: INPUT_REGEXP_FULL_LENGTH 타입
            // GIVEN: INPUT_REGEXP_FULL_LENGTH 필터 생성자 정의
            const constructor = {
              tel: {
                type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
                queryKey: "tel",
                maxLength: 15,
                placeholder: "Enter the customer mobile" as Languages,
                label: "Customer mobile" as Languages,
                regExp: /[^0-9]/g,
              },
            } satisfies QueryFilterConstructorType<"tel">;

            // WHEN: 1. 필터 초기 설정
            useQueryFilterStateStore.getState().onSetQueryFilters({
              constructor,
              searchParams: new URLSearchParams(""),
            });
            // WHEN: 2. 모든 값 초기화 함수 실행
            useQueryFilterStateStore.getState().onResetAllValues();

            // THEN: 상태에서 필터 값 추출
            const { queryFilters } = useQueryFilterStateStore.getState();

            expect(queryFilters).toHaveProperty("tel");

            const telFilter = queryFilters.tel;
            // THEN: inputValue에 접근하기 위한 타입 단언
            const inputFilter = telFilter as typeof telFilter & {
              inputValue: string;
            };

            // THEN: tagValue와 inputValue 모두 빈 문자열("")로 초기화되었는지 확인
            expect(inputFilter.tagValue).toBe("");
            expect(inputFilter.inputValue).toBe("");

            break;
          }
        }
      },
    );
  });
});
