import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, it, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

import CommonStatus from "../CommonStatus";
import type * as StyledType from "../CommonStatus.styled";

vi.mock("../CommonStatus.styled", () => {
  const MockLabel = (props: ComponentProps<typeof StyledType.Label>) => (
    <span
      className={props.className}
      data-hasbg={props.hasBg}
      data-variant={props.variant}
    >
      {props.children}
    </span>
  );

  return { Label: MockLabel };
});

describe("CommonStatus Test", () => {
  // GIVEN: status prop
  const status = "Status" as Languages;

  describe("variant별 렌더링 테스트", () => {
    it.each([
      { variant: "orange" as const },
      { variant: "green" as const },
      { variant: "blue" as const },
      { variant: "gray" as const },
      { variant: "red" as const },
    ])(
      "variant='$variant'일 때, S.Label이 variant='$variant'로 렌더되어야 함",
      ({ variant }) => {
        // WHEN: 컴포넌트 렌더링
        const { container } = renderComponent({
          ui: <CommonStatus variant={variant} hasBg={false} status={status} />,
        });

        const wrapper = container.children[0];

        // THEN: 최상위 엘리먼트가 하나인지 확인
        expect(container.children).toHaveLength(1);

        // THEN: Label이 렌더되었는지 확인
        expect(wrapper).toBeInTheDocument();

        // THEN: selectedColor가 variant와 일치하는지 확인
        expect(wrapper).toHaveAttribute("data-variant", variant);
      },
    );
  });

  describe("hasBg prop 테스트", () => {
    test("hasBg=true일 때, Label에 hasBg prop이 true로 전달되어야 함", () => {
      // WHEN: hasBg=true로 컴포넌트 렌더링
      const { container } = renderComponent({
        ui: <CommonStatus variant="orange" hasBg status={status} />,
      });

      const wrapper = container.children[0];

      // THEN: hasBg 속성이 "true"인지 확인
      expect(wrapper).toHaveAttribute("data-hasbg", "true");
    });

    test("hasBg=false일 때, Label에 hasBg prop이 false로 전달되어야 함", () => {
      // WHEN: hasBg=false로 컴포넌트 렌더링
      const { container } = renderComponent({
        ui: <CommonStatus variant="green" hasBg={false} status={status} />,
      });

      const wrapper = container.children[0];

      // THEN: hasBg 속성이 "false"인지 확인
      expect(wrapper).toHaveAttribute("data-hasbg", "false");
    });
  });

  describe("status prop 테스트", () => {
    test("status prop이 전달되면, defaultLanguage 함수를 통해 번역된 텍스트가 렌더되어야 함", () => {
      // WHEN: 컴포넌트 렌더링
      const { container } = renderComponent({
        ui: <CommonStatus variant="blue" hasBg={false} status={status} />,
      });

      const wrapper = container.children[0];

      // THEN: defaultLanguage 함수 호출 여부 확인
      expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: status });

      // THEN: 텍스트 내용이 있는지 확인
      expect(wrapper.textContent).toBeTruthy();
    });
  });

  describe("className prop 테스트", () => {
    test("className prop이 전달되면, Label에 className이 적용되어야 함", () => {
      // GIVEN: className prop
      const testClassName = "test-className";

      // WHEN: className prop과 함께 컴포넌트 렌더링
      const { container } = renderComponent({
        ui: (
          <CommonStatus
            className={testClassName}
            variant="gray"
            hasBg={false}
            status={status}
          />
        ),
      });

      const wrapper = container.children[0];

      // THEN: className이 적용되었는지 확인
      expect(wrapper).toHaveClass(testClassName);
    });

    test("className prop이 없으면, Label에 className이 적용되지 않아야 함", () => {
      // WHEN: className prop 없이 컴포넌트 렌더링
      const { container } = renderComponent({
        ui: <CommonStatus variant="red" hasBg={false} status={status} />,
      });

      const wrapper = container.children[0];

      // THEN: className이 빈 문자열인지 확인
      expect(wrapper.className).toBe("");
    });
  });
});
