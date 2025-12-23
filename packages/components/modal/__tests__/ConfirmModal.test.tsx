import React, { forwardRef } from "react";

import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import ConfirmModal from "@packages/modal/confirm/ConfirmModal";

import renderComponent from "@tests/renderComponent";

// GIVEN: 모달의 베이스 컴포넌트 (@repo/modal/base)를 Mocking
vi.mock("@repo/modal/base", () => {
  const BaseModal = forwardRef<
    HTMLDialogElement,
    { className?: string; children: React.ReactNode }
  >(({ className, children }, ref) => {
    return (
      // DESC: 실제 다이얼로그 대신 간단한 <dialog> 구조로 대체
      <dialog className={className} ref={ref} data-testid="baseModal">
        {children}
      </dialog>
    );
  });

  BaseModal.displayName = "BaseModal";

  return { default: BaseModal };
});
// GIVEN: GhostButton 컴포넌트를 Mocking
vi.mock("@packages/button/ghost/GhostButton", () => ({
  default: (props: {
    variant: string;
    label: Languages;
    handleButtonClick: () => void;
  }) => (
    // DESC: variant 값에 따라 data-testid를 설정하여 스타일 검증에 사용
    <button
      data-testid={`ghost-button-${props.variant}`}
      onClick={props.handleButtonClick}
    >
      {props.label}
    </button>
  ),
}));

const translated = "Translated" as Languages;
const notTranslated = "Not translated" as Languages;

describe("ConfirmModal Test", () => {
  test("title과 description에 Language 타입이 들어오면 번역이 되고 아니면 텍스트를 그대로 출력함.", () => {
    // WHEN: title(번역된 텍스트)과 description(번역되지 않은 텍스트)을 포함하여 렌더링
    renderComponent({
      ui: (
        <ConfirmModal
          isLoading={false}
          activeButtonName="Confirm"
          buttonType="active"
          closeButtonName="Close"
          description={notTranslated} // DESC: 번역되지 않은 텍스트
          title={translated} // DESC: 번역된 텍스트
          handleActiveButtonClick={() => {}}
          handleClose={() => {}}
        />
      ),
    });

    // THEN: title로 전달된 번역된 텍스트가 DOM에 있는지 확인
    expect(screen.getByText(translated)).toBeInTheDocument();
    // THEN: description으로 전달된 번역되지 않은 텍스트가 DOM에 있는지 확인
    expect(screen.getByText(notTranslated)).toBeInTheDocument();
  });

  describe("렌더링 테스트", () => {
    test("1. buttonType이 active이면 alert_blue 스타일링으로 렌더링됨.", () => {
      // WHEN: buttonType을 "active"로 설정하여 렌더링
      renderComponent({
        ui: (
          <ConfirmModal
            isLoading={false}
            activeButtonName="Confirm"
            buttonType="active"
            closeButtonName="Close"
            description={notTranslated}
            title={translated}
            handleActiveButtonClick={() => {}}
            handleClose={() => {}}
          />
        ),
      });

      // THEN: "alert_red" 스타일 버튼은 렌더링되지 않아야 함
      expect(
        screen.queryByTestId("ghost-button-alert_red"),
      ).not.toBeInTheDocument();
      // THEN: "alert_blue" 스타일 버튼이 렌더링되었는지 확인
      expect(screen.getByTestId("ghost-button-alert_blue")).toBeInTheDocument();
    });

    test("2. buttonType이 alert이면 alert_red 스타일링으로 렌더링됨.", () => {
      // WHEN: buttonType을 "alert"로 설정하여 렌더링
      renderComponent({
        ui: (
          <ConfirmModal
            isLoading={false}
            activeButtonName="Confirm"
            buttonType="alert"
            closeButtonName="Close"
            description={notTranslated}
            title={translated}
            handleActiveButtonClick={() => {}}
            handleClose={() => {}}
          />
        ),
      });

      // THEN: "alert_blue" 스타일 버튼은 렌더링되지 않아야 함
      expect(
        screen.queryByTestId("ghost-button-alert_blue"),
      ).not.toBeInTheDocument();
      // THEN: "alert_red" 스타일 버튼이 렌더링되었는지 확인
      expect(screen.getByTestId("ghost-button-alert_red")).toBeInTheDocument();
    });
  });
});
