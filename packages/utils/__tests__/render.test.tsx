import React from "react";

import type { jsx } from "@emotion/react";
import { formatICTDateTime } from "date";
import { commaWithCurrencyUnit, commaWithUnit } from "formatter/currency";
import { countNoticeNo } from "notice";
import {
  renderAddress,
  renderCommaUnit,
  renderCurrencyUnit,
  renderDate,
  renderDefault,
  renderFullName,
  renderLabel,
  renderPhone,
  renderPin,
  renderStatus,
  renderTableData,
  renderWithComma,
} from "render";
import { describe, expect, it, test, vi } from "vitest";

import type {
  Languages,
  RenderTableType,
  StatusColorType,
} from "@packages/types";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

const translatedLabel = "Translated" as Languages;
const notTranslatedLabel = "Not translated" as Languages;

// DESC: CommonStatus 컴포넌트를 모의로 <span>으로 치환하고, data-testid에 속성 포함
vi.mock("@packages/components/status/CommonStatus", () => ({
  default: (props: {
    variant: StatusColorType;
    hasBg: boolean;
    status: Languages;
  }) => (
    <span data-testid={`${props.variant}-${props.status}-${props.hasBg}`}>
      {props.status}
    </span>
  ),
}));
// DESC: PinIcon 컴포넌트를 모의 <svg>로 치환하고, data-testid에 pin-icon 포함
vi.mock("@packages/assets/icon/ic_pin.svg", () => ({
  // DESC: 실제 코드에서 PinIcon을 ReactComponent로 export하는 방식에 맞춤
  ReactComponent: () => <svg data-testid="pin-icon" />,
}));

/**
 * DESC: address에 대한 role은 추천되지 않음
 * LINK: https://www.w3.org/TR/html-aria/#docconformance
 */
describe("renderer Test", () => {
  describe("renderAddress Test", () => {
    test("문자열이 있으면 <address>로 렌더링됨.", () => {
      // GIVEN: 주소 문자열
      const address = "주소";
      // WHEN: renderAddress 함수를 호출하여 렌더링
      const { getByText } = renderComponent({
        ui: <>{renderAddress(address)}</>,
      });

      // THEN: 내용이 일치하고 태그가 <ADDRESS>인지 확인
      const element = getByText(address);

      expect(element.tagName).toBe("ADDRESS");
    });

    test("null이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: null을 입력
      const { getByText } = renderComponent({ ui: <>{renderAddress(null)}</> });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: undefined를 입력
      const { getByText } = renderComponent({
        ui: <>{renderAddress(undefined)}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("빈 문자열('')이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: 빈 문자열('')을 입력
      const { getByText } = renderComponent({ ui: <>{renderAddress("")}</> });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("공백 문자열이면 공백을 <address>으로 렌더링됨.", () => {
      // GIVEN: 공백 문자열
      const emptySpace = "   ";
      // WHEN: 공백 문자열을 입력
      const { getByText } = renderComponent({
        ui: <>{renderAddress(emptySpace)}</>,
      });

      // THEN: 공백 문자열을 그대로 포함하고 태그가 <ADDRESS>인지 확인
      // DESC: NOTE: getByText는 공백을 trim하여 정확한 매칭을 위해 사용자 정의 함수 사용
      const element = getByText(
        (_, node) =>
          node?.tagName === "ADDRESS" && node.textContent === emptySpace,
      );

      expect(element).toBeTruthy();
    });
  });

  describe("renderDefault Test", () => {
    test("string이면 string을 <span>으로 렌더링됨.", () => {
      // GIVEN: 문자열
      const string = "string";
      // WHEN: renderDefault 함수를 호출하여 렌더링
      const { getByText } = renderComponent({
        ui: <>{renderDefault(string)}</>,
      });

      // THEN: 내용이 일치하고 태그가 <span>인지 확인
      const element = getByText(string);

      expect(element.tagName).toBe("SPAN");
    });

    test("number이면 number를 <span>으로 렌더링됨.", () => {
      // GIVEN: 숫자
      const number = 1;
      // WHEN: renderDefault 함수를 호출하여 렌더링
      const { getByText } = renderComponent({
        ui: <>{renderDefault(number)}</>,
      });

      // THEN: 내용이 문자열화된 숫자이고 태그가 <span>인지 확인
      const element = getByText(`${number}`);

      expect(element.tagName).toBe("SPAN");
    });

    test("null이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: null을 입력
      const { getByText } = renderComponent({ ui: <>{renderDefault(null)}</> });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: undefined를 입력
      const { getByText } = renderComponent({
        ui: <>{renderDefault(undefined)}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("공백 문자열이면 공백을 <span>으로 렌더링됨.", () => {
      // GIVEN: 공백 문자열
      const emptySpace = "   ";
      // WHEN: 공백 문자열을 입력
      const { getByText } = renderComponent({
        ui: <>{renderDefault(emptySpace)}</>,
      });

      // THEN: 공백 문자열을 그대로 포함하고 태그가 <span>인지 확인
      const element = getByText(
        (_, node) =>
          node?.tagName === "SPAN" && node.textContent === emptySpace,
      );

      expect(element).toBeTruthy();
    });
  });

  describe("renderDate test", () => {
    // GIVEN: 테스트용 ISO 날짜 문자열 (UTC)
    const date = "2025-09-26T09:00:00.000Z";

    test("date가 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: date가 undefined인 경우
      const { getByText } = renderComponent({
        ui: <>{renderDate({ date: undefined })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>이며 dateTime 속성이 없는지 확인
      const element = getByText("-");

      expect(element).not.toHaveAttribute("dateTime");
      expect(element.tagName).toBe("SPAN");
    });

    test("date가 null이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: date가 null인 경우
      const { getByText } = renderComponent({
        ui: <>{renderDate({ date: null })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>이며 dateTime 속성이 없는지 확인
      const element = getByText("-");

      expect(element).not.toHaveAttribute("dateTime");
      expect(element.tagName).toBe("SPAN");
    });

    test("date가 있고 template가 없다면 'DD/MM/YYYY, HH:mm'형식의 데이터를 <time>으로 렌더링됨.", () => {
      // GIVEN: 기본 템플릿으로 포맷된 기대 결과
      const result = formatICTDateTime({ date });

      // WHEN: date만 입력
      const { getByText } = renderComponent({
        ui: <>{renderDate({ date })}</>,
      });

      // THEN: 포맷된 결과가 표시되고 태그가 <TIME>이며 dateTime 속성이 있는지 확인
      const element = getByText(result);

      expect(element).toHaveAttribute("dateTime");
      expect(element.tagName).toBe("TIME");
    });

    test("date가 있고 template가 'DD/MM/YYYY'이라면 'DD/MM/YYYY'형식의 데이터를 <time>으로 렌더링됨.", () => {
      // GIVEN: 'DD/MM/YYYY' 템플릿과 포맷된 기대 결과
      const template = "DD/MM/YYYY";
      const result = formatICTDateTime({ date, template });

      // WHEN: template과 함께 호출
      const { getByText } = renderComponent({
        ui: <>{renderDate({ date, template })}</>,
      });

      // THEN: 포맷된 결과가 표시되고 태그가 <TIME>이며 dateTime 속성이 있는지 확인
      const element = getByText(result);

      expect(element).toHaveAttribute("dateTime");
      expect(element.tagName).toBe("TIME");
    });

    test("date가 있고 template가 'DD/MM/YYYY HH:mm:ss'이라면 'DD/MM/YYYY HH:mm:ss'형식의 데이터를 <time>으로 렌더링됨.", () => {
      // GIVEN: 'DD/MM/YYYY, HH:mm:ss' 템플릿과 포맷된 기대 결과
      const template = "DD/MM/YYYY, HH:mm:ss";
      const result = formatICTDateTime({ date, template });

      // WHEN: template과 함께 호출
      const { getByText } = renderComponent({
        ui: <>{renderDate({ date, template })}</>,
      });

      // THEN: 포맷된 결과가 표시되고 태그가 <TIME>이며 dateTime 속성이 있는지 확인
      const element = getByText(result);

      expect(element).toHaveAttribute("dateTime");
      expect(element.tagName).toBe("TIME");
    });
  });

  describe("renderFullName Test", () => {
    test("firstName만 있으면 firstName만 <span>으로 렌더링됨.", () => {
      // GIVEN: firstName만 있음
      const firstName = "firstName";

      // WHEN: renderFullName 함수를 호출하여 렌더링
      const { getByText } = renderComponent({
        ui: <>{renderFullName({ firstName, lastName: undefined })}</>,
      });

      // THEN: firstName이 표시되고 태그가 <span>인지 확인
      const element = getByText(firstName);

      expect(element.tagName).toBe("SPAN");
    });

    test("lastName만 있으면 lastName만 <span>으로 렌더링됨.", () => {
      // GIVEN: lastName만 있음
      const lastName = "lastName";

      // WHEN: renderFullName 함수를 호출하여 렌더링
      const { getByText } = renderComponent({
        ui: <>{renderFullName({ firstName: undefined, lastName })}</>,
      });

      // THEN: lastName이 표시되고 태그가 <span>인지 확인
      const element = getByText(lastName);

      expect(element.tagName).toBe("SPAN");
    });

    test("firstName, lastName 둘다 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: firstName, lastName 모두 undefined
      const { getByText } = renderComponent({
        ui: (
          <>{renderFullName({ firstName: undefined, lastName: undefined })}</>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("renderPhone Test", () => {
    test("countryDial가 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: countryDial만 undefined
      const { getByText } = renderComponent({
        ui: (
          <>{renderPhone({ countryDial: undefined, mobile: "1012345678" })}</>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("mobile이 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: mobile만 undefined
      const { getByText } = renderComponent({
        ui: <>{renderPhone({ countryDial: "82", mobile: undefined })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("countryDial와 mobile이 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: 모두 undefined
      const { getByText } = renderComponent({
        ui: <>{renderPhone({ countryDial: undefined, mobile: undefined })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("countryDial와 mobile이 string이면 '+countryDial phone' 문자열을 <address>로 렌더링됨.", () => {
      // GIVEN: 포맷된 기대 결과
      const mobileNumber = "+82 10 12345678";

      // WHEN: countryDial과 mobile 모두 문자열로 입력
      const { getByText } = renderComponent({
        ui: <>{renderPhone({ countryDial: "82", mobile: "1012345678" })}</>,
      });

      // THEN: 포맷된 전화번호가 표시되고 태그가 <ADDRESS>인지 확인
      const element = getByText(mobileNumber);

      expect(element.tagName).toBe("ADDRESS");
    });
  });

  describe("renderWithComma Test", () => {
    test("value가 null이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: null을 입력
      const { getByText } = renderComponent({
        ui: <>{renderWithComma(null)}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });
    test("value가 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: undefined를 입력
      const { getByText } = renderComponent({
        ui: <>{renderWithComma(undefined)}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });
    test("value가 number이고 0이면 콤마(,) 없이 0을 <span>으로 렌더링됨.", () => {
      // GIVEN: 숫자 0
      const value = 0;
      const stringValue = `${value}`;

      // WHEN: 숫자 0을 입력
      const { getByText } = renderComponent({
        ui: <>{renderWithComma(value)}</>,
      });

      // THEN: '0'이 표시되고 태그가 <span>인지 확인
      const element = getByText(stringValue);

      expect(element.tagName).toBe("SPAN");
    });
    test("value가 number이고 3자리 수 미만이면 콤마(,) 없이 number를 <span>으로 렌더링됨.", () => {
      // GIVEN: 3자리 수 미만인 숫자
      const value = 99;
      const stringValue = `${value}`;

      // WHEN: 99를 입력
      const { getByText } = renderComponent({
        ui: <>{renderWithComma(value)}</>,
      });

      // THEN: '99'가 표시되고 태그가 <span>인지 확인
      const element = getByText(stringValue);

      expect(element.tagName).toBe("SPAN");
    });
    test("value가 number이고 3자리 수 이상이면 콤마(,)를 셋째 자리에 포함하여 number를 <span>으로 렌더링됨.", () => {
      // GIVEN: 3자리 수 이상인 숫자와 포맷된 기대 결과
      const value = 1000;
      const stringValue = "1,000";

      // WHEN: 1000을 입력
      const { getByText } = renderComponent({
        ui: <>{renderWithComma(value)}</>,
      });

      // THEN: '1,000'이 표시되고 태그가 <span>인지 확인
      const element = getByText(stringValue);

      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("renderCurrencyUnit Test", () => {
    // GIVEN: 테스트에 사용할 통화 단위 목록
    const currencyUnits = ["$", "₭", "฿", "P"] as const;
    // GIVEN: 테스트에 사용할 숫자 값
    const zero = 0;
    const hundred = 100;
    const thousand = 1000;

    test("price가 undefined이면, currencyUnit,showPlusSign에 관계없이 '-'를 <span>으로 렌더링함.", () => {
      // WHEN: price가 undefined
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderCurrencyUnit({
              price: undefined,
              currencyUnit: "$",
              showPlusSign: false,
            })}
          </>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("price가 null이면, currencyUnit,showPlusSign에 관계없이 '-'를 <span>으로 렌더링함.", () => {
      // WHEN: price가 null
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderCurrencyUnit({
              price: null,
              currencyUnit: "$",
              showPlusSign: false,
            })}
          </>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("currencyUnit가 undefined이면, price,showPlusSign에 관계없이 '-'를 <span>으로 렌더링함.", () => {
      // WHEN: currencyUnit가 undefined
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderCurrencyUnit({
              price: thousand,
              currencyUnit: undefined,
              showPlusSign: false,
            })}
          </>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    describe(`price=${zero} 인 경우`, () => {
      it.each(currencyUnits)(
        "showPlusSign=true인 경우, + %s 0 문자열을 <span>으로 렌더링함.",
        (currencyUnit) => {
          // GIVEN: 포맷된 기대 결과
          const result = `+ ${currencyUnit} ${zero}`;

          // WHEN: price=0, showPlusSign=true
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: zero,
                  showPlusSign: true,
                })}
              </>
            ),
          });

          // THEN: 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );

      it.each(currencyUnits)(
        "showPlusSign=false인 경우, %s 0 문자열을 <span>으로 렌더링함.",
        (currencyUnit) => {
          // GIVEN: 포맷된 기대 결과
          const result = `${currencyUnit} ${zero}`;

          // WHEN: price=0, showPlusSign=false
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: zero,
                  showPlusSign: false,
                })}
              </>
            ),
          });

          // THEN: 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );
    });

    describe(`${zero} < price < ${thousand} 인 경우`, () => {
      it.each(currencyUnits)(
        `showPlusSign=true인 경우, + %s ${hundred} 문자열을 <span>으로 렌더링함.`,
        (currencyUnit) => {
          // GIVEN: 포맷된 기대 결과
          const result = `+ ${currencyUnit} ${hundred}`;

          // WHEN: price=100, showPlusSign=true
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: hundred,
                  showPlusSign: true,
                })}
              </>
            ),
          });

          // THEN: 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );

      it.each(currencyUnits)(
        `showPlusSign=false인 경우, %s ${hundred} 문자열을 <span>으로 렌더링함.`,
        (currencyUnit) => {
          // GIVEN: 포맷된 기대 결과
          const result = `${currencyUnit} ${hundred}`;

          // WHEN: price=100, showPlusSign=false
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: hundred,
                  showPlusSign: false,
                })}
              </>
            ),
          });

          // THEN: 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );
    });

    describe(`price >= ${thousand} 인 경우`, () => {
      it.each(currencyUnits)(
        `showPlusSign=true인 경우, + %s 1,000 문자열을 <span>으로 렌더링함.`,
        (currencyUnit) => {
          // GIVEN: 포맷터 함수를 사용하여 기대 결과 준비 (콤마 포함)
          const result = commaWithCurrencyUnit({
            showPlusSign: true,
            price: thousand,
            currencyUnit,
          });

          // WHEN: price=1000, showPlusSign=true
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: thousand,
                  showPlusSign: true,
                })}
              </>
            ),
          });

          // THEN: 콤마와 통화 단위, + 기호가 포함된 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );

      it.each(currencyUnits)(
        `showPlusSign=false인 경우, %s 1,000 문자열을 <span>으로 렌더링함.`,
        (currencyUnit) => {
          // GIVEN: 포맷터 함수를 사용하여 기대 결과 준비 (콤마 포함)
          const result = commaWithCurrencyUnit({
            showPlusSign: false,
            price: thousand,
            currencyUnit,
          });

          // WHEN: price=1000, showPlusSign=false
          const { getByText } = renderComponent({
            ui: (
              <>
                {renderCurrencyUnit({
                  currencyUnit,
                  price: thousand,
                  showPlusSign: false,
                })}
              </>
            ),
          });

          // THEN: 콤마와 통화 단위가 포함된 기대 결과가 표시되고 태그가 <span>인지 확인
          const element = getByText(result);

          expect(element.tagName).toBe("SPAN");
        },
      );
    });
  });

  describe("renderCommaUnit Test", () => {
    // GIVEN: 테스트에 사용할 단위 목록
    const units = [
      "km",
      "kg",
      "cc",
      "mm",
      "ps(kw)/rpm",
      "kWh",
      "kgm(NM)/rpm",
      "km/L",
      "km/h",
      "KM",
      "KW",
    ] as const;
    // GIVEN: 테스트에 사용할 숫자 값
    const hundred = 100;
    const thousand = 1000;

    test("value가 undefined인 경우, unit에 관계없이 '-'를 <span>으로 렌더링함.", () => {
      // WHEN: value가 undefined
      const { getByText } = renderComponent({
        ui: <>{renderCommaUnit({ value: undefined, unit: "KM" })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("value가 null인 경우, unit에 관계없이 '-'를 <span>으로 렌더링함.", () => {
      // WHEN: value가 null
      const { getByText } = renderComponent({
        ui: <>{renderCommaUnit({ value: null, unit: "KM" })}</>,
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    it.each(units)(
      `value가 ${thousand} 미만인 경우, 천단위의 콤마 없이 value %s를 <span>으로 렌더링함.`,
      (unit) => {
        // WHEN: value=100 (콤마 불필요)
        const { getByText } = renderComponent({
          ui: <>{renderCommaUnit({ value: hundred, unit })}</>,
        });

        // THEN: '100 단위' 형식으로 표시되고 콤마가 없는지 확인
        const element = getByText(`${hundred} ${unit}`);

        expect(element.tagName).toBe("SPAN");
      },
    );

    it.each(units)(
      `value가 ${thousand} 이상인 경우, 천단위의 콤마와 함께 value %s를 <span>으로 렌더링함.`,
      (unit) => {
        // WHEN: value=1000 (콤마 필요)
        const { getByText } = renderComponent({
          ui: <>{renderCommaUnit({ value: thousand, unit })}</>,
        });

        // THEN: '1,000 단위' 형식으로 표시되고 콤마가 있는지 확인
        const element = getByText(
          `${commaWithUnit({ value: thousand, unit })}`,
        );

        expect(element.tagName).toBe("SPAN");
      },
    );
  });

  describe("renderLabel Test", () => {
    // GIVEN: 레이블 목록
    const list = [
      { key: "translate", label: translatedLabel },
      { key: "none-translate", label: notTranslatedLabel },
    ];

    test("key가 undefined이면, '-'를 <span>으로 렌더링함.", () => {
      // WHEN: key가 undefined
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderLabel({
              key: undefined,
              list,
              handleTranslate: mockDefaultLanguage,
            })}
          </>
        ),
      });

      // THEN: 번역 함수가 호출되지 않았고, '-'가 표시되는지 확인
      expect(mockDefaultLanguage).not.toHaveBeenCalled();

      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("key가 null이면, '-'를 <span>으로 렌더링함.", () => {
      // WHEN: key가 null
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderLabel({
              key: null,
              list,
              handleTranslate: mockDefaultLanguage,
            })}
          </>
        ),
      });

      // THEN: 번역 함수가 호출되지 않았고, '-'가 표시되는지 확인
      expect(mockDefaultLanguage).not.toHaveBeenCalled();

      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("list와 매칭되는 key가 없다면, '-'를 <span>으로 렌더링함.", () => {
      // WHEN: list에 없는 key를 입력
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderLabel({
              key: "key2",
              list,
              handleTranslate: mockDefaultLanguage,
            })}
          </>
        ),
      });

      // THEN: 번역 함수가 호출되지 않았고, '-'가 표시되는지 확인
      expect(mockDefaultLanguage).not.toHaveBeenCalled();

      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    test("list와 매칭되는 key가 있고 handleTranslate 함수가 undefined이면, list의 label을 그대로 <span>으로 렌더링함.", () => {
      // WHEN: key는 매칭되지만, handleTranslate가 undefined
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderLabel({
              key: "none-translate",
              list,
              handleTranslate: undefined,
            })}
          </>
        ),
      });

      // THEN: 번역 함수가 호출되지 않았고, 레이블 원문이 표시되는지 확인
      expect(mockDefaultLanguage).not.toHaveBeenCalled();

      const element = getByText(notTranslatedLabel);

      expect(element.tagName).toBe("SPAN");
    });

    test("list와 매칭되는 key가 있고 handleTranslate 함수가 있다면, list의 label을 번역하여 <span>으로 렌더링함.", () => {
      // WHEN: key는 매칭되고, handleTranslate가 제공됨
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderLabel({
              key: "translate",
              list,
              handleTranslate: mockDefaultLanguage,
            })}
          </>
        ),
      });

      // THEN: 번역 함수가 한 번 호출되었고, 번역된 레이블이 표시되는지 확인
      expect(mockDefaultLanguage).toHaveBeenCalledOnce();

      const element = getByText(translatedLabel);

      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("renderStatus Test", () => {
    // GIVEN: 테스트에 사용할 상태 색상 목록
    const colors = ["orange", "green", "blue", "gray", "red"] as const;

    test("status가 null이면, '-'을 <div>으로 렌더링됨.", () => {
      // WHEN: status가 null
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderStatus({
              color: "orange",
              hasBg: false,
              status: null,
            })}
          </>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <div>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("DIV");
    });

    test("color가 undefined이면, '-'을 <div>으로 렌더링됨.", () => {
      // WHEN: color가 undefined
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderStatus({
              color: undefined,
              hasBg: false,
              status: translatedLabel,
            })}
          </>
        ),
      });

      // THEN: 내용이 '-'이고 태그가 <div>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("DIV");
    });

    describe("color render Test", () => {
      it.each(colors)("%s에 맞는 label이 <span>으로 렌더링됨.", (color) => {
        // WHEN: hasBg=false로 각 색상을 렌더링 (Mock 컴포넌트 사용)
        const { getByTestId } = renderComponent({
          ui: (
            <>
              {renderStatus({
                color,
                hasBg: false,
                status: translatedLabel,
              })}
            </>
          ),
        });

        // THEN: data-testid를 통해 올바른 색상, 상태, hasBg=false로 렌더링되었는지 확인
        const element = getByTestId(`${color}-${translatedLabel}-false`);

        expect(element.tagName).toBe("SPAN");
      });

      it.each(colors)(
        "hasBg=true 이면 %s에 맞는 label과 background-color가 <span>으로 렌더링됨.",
        (color) => {
          // WHEN: hasBg=true로 각 색상을 렌더링 (Mock 컴포넌트 사용)
          const { getByTestId } = renderComponent({
            ui: (
              <>
                {renderStatus({
                  color,
                  hasBg: true,
                  status: translatedLabel,
                })}
              </>
            ),
          });

          // THEN: data-testid를 통해 올바른 색상, 상태, hasBg=true로 렌더링되었는지 확인
          const element = getByTestId(`${color}-${translatedLabel}-true`);

          expect(element.tagName).toBe("SPAN");
        },
      );
    });
  });

  describe("renderPin Test (renderTableData의 일부로 사용되는 renderPin에 대한 검증)", () => {
    // GIVEN: 공지사항 번호 계산에 필요한 값
    const totalData = 100;
    const currentPage = 2;
    const index = 10;

    test("isPinned=0이면, 'countNoticeNo({ totalData, currentPage }) - index' 문자열을 <span>으로 렌더링됨.", () => {
      // GIVEN: 공지사항 번호로 표시될 기대 결과
      const expectedNo = `${countNoticeNo({ totalData, currentPage }) - index}`;

      // WHEN: isPinned=0 (핀 아님)
      const { getByText } = renderComponent({
        ui: <>{renderPin({ isPinned: 0, totalData, currentPage, index })}</>,
      });

      // THEN: 계산된 번호가 표시되고 태그가 <span>인지 확인
      const element = getByText(expectedNo);

      expect(element.tagName).toBe("SPAN");
    });

    test("isPinned=undefined이면, 'countNoticeNo({ totalData, currentPage }) - index' 문자열을 <span>으로 렌더링됨.", () => {
      // GIVEN: 공지사항 번호로 표시될 기대 결과
      const expectedNo = `${countNoticeNo({ totalData, currentPage }) - index}`;

      // WHEN: isPinned=undefined (핀 아님)
      const { getByText } = renderComponent({
        ui: (
          <>
            {renderPin({ isPinned: undefined, totalData, currentPage, index })}
          </>
        ),
      });

      // THEN: 계산된 번호가 표시되고 태그가 <span>인지 확인
      const element = getByText(expectedNo);

      expect(element.tagName).toBe("SPAN");
    });

    test("isPinned=1이면, svg인 PinIcon이 렌더링됨.", () => {
      // WHEN: isPinned=1 (핀)
      const { getByTestId } = renderComponent({
        ui: renderPin({ isPinned: 1, totalData, currentPage, index }),
      });

      // THEN: Mock PinIcon의 data-testid가 확인되고 태그가 <svg>인지 확인
      const element = getByTestId("pin-icon");

      expect(element.tagName).toBe("svg");
    });
  });

  describe("renderTableData", () => {
    test("item이 undefined이면 '-'를 <span>으로 렌더링됨.", () => {
      // WHEN: item이 undefined
      const { getByText } = renderComponent({
        ui: renderTableData({
          key: "name",
          item: undefined,
          tableRender: {},
        }),
      });

      // THEN: 내용이 '-'이고 태그가 <span>인지 확인
      const element = getByText("-");

      expect(element.tagName).toBe("SPAN");
    });

    describe("tableRender 사용 Test", () => {
      // GIVEN: 테이블 헤더 및 데이터 타입 정의
      const tableHeader = [{ key: "name", label: "Kim" }] as const;

      type Header = typeof tableHeader;
      type Row = { name: string | undefined };
      type Model = { test: Row[] };
      type Key = "test";

      test("tableRender에 custom render가 없다면 renderDefault가 호출되어 item[key] 데이터가 <span>으로 렌더링됨.", () => {
        // GIVEN: 빈 tableRender 객체
        const tableRender: RenderTableType<Header, Model, Key> = {};

        // WHEN: custom renderer 없이 renderTableData 호출
        const { getByText } = renderComponent({
          ui: renderTableData<Header, Model, Key>({
            key: tableHeader[0].key,
            item: { name: tableHeader[0].label },
            tableRender,
          }),
        });

        // THEN: renderDefault의 결과인 <span>으로 item의 값이 표시되는지 확인
        const element = getByText(tableHeader[0].label);

        expect(element.tagName).toBe("SPAN");
      });

      test("item의 데이터가 undefined나 null이 아니라면 custom renderer 함수를 호출함.", () => {
        // GIVEN: 커스텀 렌더링 함수
        const customRender = (item: Row): jsx.JSX.Element => (
          <div>Custom: {item.name}</div>
        );

        // GIVEN: customRender를 포함하는 tableRender 객체
        const tableRender: RenderTableType<Header, Model, Key> = {
          name: customRender,
        };

        // WHEN: custom renderer와 함께 renderTableData 호출
        const { getByText } = renderComponent({
          ui: renderTableData<Header, Model, Key>({
            key: tableHeader[0].key,
            item: { name: tableHeader[0].label },
            tableRender,
          }),
        });

        // THEN: customRender의 결과인 <div>가 렌더링되었는지 확인
        const element = getByText(`Custom: ${tableHeader[0].label}`);

        expect(element.tagName).toBe("DIV");
      });

      test("item의 데이터에 index가 있다면 custom renderer 함수 인자로 index를 전달함.", () => {
        // GIVEN: index를 사용하는 커스텀 렌더링 함수
        interface CustomRowProps extends Row {
          index: number | undefined;
        }

        const customRender = (item: CustomRowProps): jsx.JSX.Element => (
          <div>
            Custom: {item.name} {item.index}
          </div>
        );

        const index = 5;

        // GIVEN: index를 전달받아 customRender를 호출하는 tableRender 함수
        const tableRender: RenderTableType<Header, Model, Key> = {
          name: (item, index) => customRender({ name: item.name, index }),
        };

        // WHEN: index와 함께 renderTableData 호출
        const { getByText } = renderComponent({
          ui: renderTableData<Header, Model, Key>({
            key: tableHeader[0].key,
            index,
            item: { name: tableHeader[0].label },
            tableRender,
          }),
        });

        // THEN: index가 포함된 결과 문자열이 렌더링되었는지 확인
        const result = `Custom: ${tableHeader[0].label} ${index}`;
        const element = getByText(result);

        expect(element.tagName).toBe("DIV");
      });

      test("item의 데이터가 undefined나 null이면, rendererDefault 함수를 호출하여 '-'를 <span>으로 렌더링됨.", () => {
        // GIVEN: item.name이 falsy일 때 renderDefault를 호출하도록 구현된 customRender
        const customRender = (item: Row) =>
          item?.name ? (
            <div>Custom: {item.name}</div>
          ) : (
            renderDefault(item.name)
          );

        const tableRender: RenderTableType<Header, Model, Key> = {
          name: customRender,
        };

        // WHEN: item.name이 undefined인 상태로 호출
        const { getByText } = renderComponent({
          ui: renderTableData<Header, Model, Key>({
            key: tableHeader[0].key,
            item: { name: undefined },
            tableRender,
          }),
        });

        // THEN: customRender 내부의 renderDefault가 실행되어 '-'가 <span>으로 표시되는지 확인
        const element = getByText("-");

        expect(element.tagName).toBe("SPAN");
      });
    });
  });
});
