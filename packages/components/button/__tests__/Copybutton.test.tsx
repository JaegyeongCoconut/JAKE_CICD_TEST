import type { ComponentProps } from "react";
import React from "react";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";

import type Button from "@packages/button/Button";
import CopyButton from "@packages/button/copy/CopyButton";

import renderComponent from "@tests/renderComponent";

// GIVEN: useToastStore의 addToast 함수를 Mock으로 설정
const mockAddToast = vi.fn();
const mockToastStore = {
  toasts: [],
  addToast: mockAddToast,
};
vi.mock("@repo/stores/toast", () => ({
  __esModule: true,
  useToastStore: (selector: (store: typeof mockToastStore) => unknown) =>
    selector(mockToastStore),
}));
// GIVEN: 외부 Button 컴포넌트를 Mock으로 대체
vi.mock("@packages/button/Button", () => ({
  default: (props: ComponentProps<typeof Button>) => (
    // DESC: 실제 버튼 컴포넌트 대신, 클릭 핸들러를 호출하는 간단한 버튼 렌더링
    <button
      data-testid="defaultButton"
      onClick={(e) => props.handleButtonClick(e)}
    />
  ),
}));

describe("CopyButton test", () => {
  beforeEach(() => {
    // DESC: 각 테스트 전에 navigator.clipboard 객체를 Mocking
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn() }, // DESC: writeText 함수를 vitest Mock 함수로 대체
      configurable: true,
    });
  });

  test("CopyButton 클릭 시, clipboard 동작 성공과 addToast가 성공적으로 동작함.", async () => {
    // GIVEN: 복사할 대상 텍스트
    const copyText = "https://help";

    // GIVEN: writeText Mock을 가져와서 성공적으로 완료되도록 설정
    const writeTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(); // DESC: Promise 성공 값 반환 설정

    // GIVEN: CopyButton 컴포넌트 렌더링
    renderComponent({
      ui: <CopyButton copyText={copyText} serviceType="kokkok_support" />,
    });

    // WHEN: Mock Button 컴포넌트를 클릭
    await userEvent.click(screen.getByTestId("defaultButton"));

    // THEN: writeText가 올바른 복사 대상 텍스트로 호출되었는지 확인
    expect(writeTextSpy).toHaveBeenCalledWith(copyText);
    // THEN: writeText가 정확히 한 번만 호출되었는지 확인
    expect(writeTextSpy).toHaveBeenCalledOnce();

    // THEN: 비동기 토스트 호출을 기다린 뒤, 성공 메시지가 노출되었는지 확인
    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        COMMON_TOAST_MESSAGE.SUCCESS.COPY_LINK,
      );
    });
  });
});
