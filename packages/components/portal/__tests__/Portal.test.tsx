import React from "react";

import { beforeEach, describe, expect, test } from "vitest";

import Portal from "@packages/portal/Portal";

import renderComponent from "@tests/renderComponent";

const TEST_SELECTOR = "#test-portal-root";
const TEST_CONTENT_ID = "test-portal-content";

describe("Portal Test", () => {
  // DESC: Portal 내부에서 렌더링할 자식 컴포넌트
  const ChildContent = () => <span id={TEST_CONTENT_ID}>Portal Content</span>;

  // DESC: 각 테스트마다 DOM을 초기화하여 테스트 간 영향을 차단
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("mounted=true 인 경우", () => {
    test("portal 대상 요소가 존재하면 자식 요소가 해당 컨테이너 내부에 렌더링됨.", () => {
      // GIVEN: Portal이 사용할 대상 DOM 요소를 생성
      const portalRoot = document.createElement("div");
      portalRoot.id = TEST_SELECTOR.slice(1); // DESC: "test-portal-root"
      document.body.appendChild(portalRoot);

      // WHEN: Portal 컴포넌트를 렌더
      renderComponent({
        ui: (
          <Portal container={TEST_SELECTOR} mounted>
            <ChildContent />
          </Portal>
        ),
      });

      // THEN: 자식 요소가 DOM에 존재하고, 부모가 portalRoot인지 검증
      const childElement = document.getElementById(TEST_CONTENT_ID);

      expect(childElement).toBeInTheDocument();
      expect(childElement?.parentElement).toBe(portalRoot);
    });

    test("portal 대상 요소가 존재하지 않으면 자식 요소는 DOM에 렌더링되지 않음", () => {
      // GIVEN: portalRoot를 의도적으로 생성하지 않음

      // WHEN: Portal 컴포넌트를 렌더
      renderComponent({
        ui: (
          <Portal container={TEST_SELECTOR} mounted>
            <ChildContent />
          </Portal>
        ),
      });

      // THEN: 자식 요소가 DOM 어디에도 존재하지 않아야 함
      const childElement = document.getElementById(TEST_CONTENT_ID);

      expect(childElement).not.toBeInTheDocument();
    });

    test("괄호가 포함된 선택자도 올바르게 처리되어 정상적으로 렌더", () => {
      // GIVEN: 괄호가 포함된 ID를 가진 DOM 요소를 생성
      const PAREN_SELECTOR = "#test(root)";
      const PAREN_ID = "test(root)";

      const parenRoot = document.createElement("div");

      parenRoot.id = PAREN_ID;
      document.body.appendChild(parenRoot);

      // WHEN: 괄호가 포함된 선택자를 container로 전달하여 Portal을 렌더
      renderComponent({
        ui: (
          <Portal container={PAREN_SELECTOR} mounted>
            <ChildContent />
          </Portal>
        ),
      });

      // THEN: 자식 요소가 DOM에 존재하고, 부모가 parenRoot인지 검증
      const childElement = document.getElementById(TEST_CONTENT_ID);

      expect(childElement).toBeInTheDocument();
      expect(childElement?.parentElement).toBe(parenRoot);
    });
  });

  test("mounted=false 이면 createPortal이 실행되지 않고 자식 요소는 DOM에 렌더링 안 됨.", () => {
    // GIVEN: portal 대상 DOM의 존재 여부와 무관하게 mounted=false 로 렌더

    // WHEN: Portal 컴포넌트를 mounted=false 로 렌더
    renderComponent({
      ui: (
        <Portal container={TEST_SELECTOR} mounted={false}>
          <ChildContent />
        </Portal>
      ),
    });

    // THEN: 자식 요소가 DOM 어디에도 존재 안 함을 검증
    const childElement = document.getElementById(TEST_CONTENT_ID);

    expect(childElement).not.toBeInTheDocument();
  });
});
