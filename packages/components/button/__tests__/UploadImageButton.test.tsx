import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { Languages } from "@repo/types";

import UploadImageButton from "@packages/button/uploadImage/UploadImageButton";
import type * as StyledType from "@packages/button/uploadImage/UploadImageButton.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: SVG Icon Mocking: Check Icon
vi.mock("@repo/assets/icon/ic_check.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-check" />,
}));
// DESC: SVG Icon Mocking: Photo Icon
vi.mock("@repo/assets/icon/ic_photo.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-photo" />,
}));
// DESC: Styled Component Mocking: Label 및 CompletedUploadLabel (hasError prop 노출용)
vi.mock("@packages/button/uploadImage/UploadImageButton.styled", () => {
  const MockStyledLabel = (props: ComponentProps<typeof StyledType.Label>) => (
    <label
      className={props.className}
      data-has-error={!!props.hasError} // DESC: hasError prop 전달 확인용
      data-testid="test-label"
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
  const MockStyledCompletedUploadLabel = (
    props: ComponentProps<typeof StyledType.Label>,
  ) => (
    <label data-has-error={!!props.hasError} data-testid="test-completed-label">
      {props.children}
    </label>
  );

  return {
    Label: MockStyledLabel,
    CompletedUploadLabel: MockStyledCompletedUploadLabel,
    checkIcon: {},
    loadingSpinner: {},
    photoIcon: {},
  };
});
// DESC: LoadingSpinner Mocking
vi.mock("@packages/loadingSpinner/LoadingSpinner", () => ({
  default: () => <div data-testid="test-loading-spinner" />,
}));
// DESC: ErrorMessage Mocking
vi.mock("@packages/message/ErrorMessage", () => ({
  default: ({ message }: { message: string }) => (
    <p data-testid="test-error-message">{message}</p>
  ),
}));

describe("UploadImageButton Test", () => {
  const uploadCompletedLabel = "Completed" as Languages;

  test("UploadImageButton 렌더 시, isMaxImages=true이면 S.CompletedUploadLabel과 CheckIcon 및 span에 업로드 완료 텍스트가 렌더", () => {
    // GIVEN: 최대 이미지 수에 도달 (isMaxImages: true)
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <UploadImageButton
          hasError={false}
          isLoading={false}
          isMaxImages
          uploadCompletedLabel={uploadCompletedLabel}
          handleImageChange={() => {}}
        />
      ),
    });

    // THEN: 최상위 엘리먼트가 하나인지 (S.CompletedUploadLabel) 확인
    expect(container.children).toHaveLength(1);

    const completedLabel = container.children[0];

    // THEN: 최상위 엘리먼트가 S.CompletedUploadLabel Mock인지 확인
    expect(completedLabel).toBeInTheDocument();
    expect(completedLabel.tagName).toBe("LABEL");
    expect(completedLabel).toHaveAttribute("data-has-error", "false"); // DESC: hasError=false 검증

    // THEN: S.CompletedUploadLabel 내부에 2개의 자식 요소 (Icon + Span) 확인
    expect(completedLabel.children).toHaveLength(2);

    const checkIcon = completedLabel.children[0];

    // THEN: CheckIcon이 렌더링되었는지 확인
    expect(checkIcon).toBeInTheDocument();

    const spanText = completedLabel.children[1];

    // THEN: 완료 텍스트가 올바르게 렌더링되었는지 확인
    expect(spanText).toHaveTextContent(uploadCompletedLabel);
    // THEN: defaultLanguage 훅이 호출되었는지 및 올바른 텍스트를 전달받았는지 확인
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: uploadCompletedLabel,
    });
  });

  describe("isMaxImages=false", () => {
    describe("hasError=false", () => {
      test("UploadImageButton 렌더 시, 최상위 S.Label에 className, hasError, htmlFor가 올바르게 전달", () => {
        // WHEN: 컴포넌트 렌더링
        const { getByTestId } = renderComponent({
          ui: (
            <UploadImageButton
              className="test-class"
              hasError={false}
              isLoading // DESC: isLoading=true 상태는 구조에 영향을 주지 않음 (children만 변경)
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={() => {}}
            />
          ),
        });

        const label = getByTestId("test-label"); // DESC: S.Label Mock

        // THEN: S.Label이 문서에 존재하는지 확인
        expect(label).toBeInTheDocument();
        // THEN: className이 올바르게 전달되었는지 확인
        expect(label).toHaveClass("test-class");
        // THEN: hasError=false가 data 속성으로 전달되었는지 확인
        expect(label).toHaveAttribute("data-has-error", "false");
        // THEN: htmlFor="photo"가 접근성 목적으로 올바르게 설정되었는지 확인
        expect(label).toHaveAttribute("for", "photo");
      });

      test("UploadImageButton 렌더 시, isLoading=true라면, S.Label의 children으로 LoadingSpinner만 렌더됨", () => {
        // WHEN: 컴포넌트 렌더링
        const { container } = renderComponent({
          ui: (
            <UploadImageButton
              className="test-class"
              hasError={false}
              isLoading // DESC: isLoading=true
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={() => {}}
            />
          ),
        });

        // THEN: 최상위 엘리먼트가 하나인지 (ErrorMessage 없음) 확인
        expect(container.children).toHaveLength(1);

        const label = container.children[0];

        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("data-has-error", "false");
        // THEN: 자식이 LoadingSpinner 하나만 있는지 확인
        expect(label.children).toHaveLength(1);

        const loadingSpinner = label.children[0];

        // THEN: LoadingSpinner Mock이 렌더링되었는지 확인
        expect(loadingSpinner).toBeInTheDocument();
        expect(loadingSpinner).toBe(
          container.querySelector('[data-testid="test-loading-spinner"]'),
        );
      });

      test("UploadImageButton 렌더 시, isLoading=false라면, S.Label의 children으로 PhotoIcon, span, input이 렌더됨", async () => {
        // GIVEN: isLoading: false, mock user event setup, mock handler
        const user = userEvent.setup();
        const uploadFiles = [
          new File(["xx"], "photo1.png", { type: "image/png" }),
          new File(["xx"], "photo2.jpg", { type: "image/jpeg" }),
        ];
        const mockHandleImageChange = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container, getByLabelText } = renderComponent({
          ui: (
            <UploadImageButton
              className="test-class"
              hasError={false}
              isLoading={false}
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={mockHandleImageChange}
            />
          ),
        });

        // THEN: 최상위 엘리먼트가 하나인지 확인
        expect(container.children).toHaveLength(1);

        const label = container.children[0];

        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("data-has-error", "false");
        // THEN: 자식 요소가 PhotoIcon, span, input 3개인지 확인
        expect(label.children).toHaveLength(3);

        const photoIcon = label.children[0];

        // THEN: PhotoIcon 렌더링 확인
        expect(photoIcon).toBeInTheDocument();

        const spanText = label.children[1];

        // THEN: span 텍스트 및 Hook 호출 검증
        expect(spanText).toBeInTheDocument();
        expect(mockDefaultLanguage).toHaveBeenCalledWith({
          text: LANGUAGE_LABEL.UPLOAD_PHOTO,
        });

        const inputPhoto = label.children[2];

        // THEN: input[type=file] 속성 검증
        expect(inputPhoto).toBeInTheDocument();
        expect(inputPhoto.id).toBe("photo");
        expect(inputPhoto).toHaveAttribute(
          "accept",
          "image/jpg, image/jpeg, image/png",
        );
        expect(inputPhoto).toHaveAttribute("multiple");
        expect(inputPhoto).toHaveAttribute("type", "file");

        // WHEN: input에 파일 업로드 시도
        await user.upload(
          getByLabelText(LANGUAGE_LABEL.UPLOAD_PHOTO), // DESC: inputPhoto가 숨겨져 있으므로 label로 접근
          uploadFiles,
        );

        // THEN: handleImageChange 핸들러가 한 번 호출되었는지 확인
        expect(mockHandleImageChange).toHaveBeenCalledOnce();
      });
    });

    describe("hasError=true", () => {
      test("UploadImageButton 렌더 시, 최상위에 S.Label과 ErrorMessage 가 렌더됨", () => {
        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId } = renderComponent({
          ui: (
            <UploadImageButton
              hasError // DESC: hasError=true
              isLoading={false}
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={() => {}}
            />
          ),
        });

        // THEN: 최상위 엘리먼트가 S.Label과 ErrorMessage 2개인지 확인
        expect(container.children).toHaveLength(2);

        const label = container.children[0];

        // THEN: S.Label 렌더링 확인
        expect(label).toBeInTheDocument();

        const errorMessage = container.children[1];

        // THEN: ErrorMessage 렌더링 확인
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBe(getByTestId("test-error-message"));
        // THEN: ErrorMessage에 COMMON_ERROR_MESSAGE.FIELD 텍스트가 포함되었는지 확인
        expect(errorMessage).toHaveTextContent(COMMON_ERROR_MESSAGE.FIELD);
      });

      test(`UploadImageButton 렌더 시 isLoading=true라면, 
            최상위에 S.Label과 ErrorMessage 가 렌더되고 
            S.Label의 children으로 LoadingSpinner가 렌더됨`, () => {
        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId } = renderComponent({
          ui: (
            <UploadImageButton
              hasError
              isLoading
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={() => {}}
            />
          ),
        });

        // THEN: 최상위 엘리먼트 개수 및 ErrorMessage 텍스트 검증 (에러 상태 확인)
        expect(container.children).toHaveLength(2);

        const label = container.children[0];

        expect(label).toBeInTheDocument();

        const errorMessage = container.children[1];

        expect(errorMessage).toBe(getByTestId("test-error-message"));
        expect(errorMessage).toHaveTextContent(COMMON_ERROR_MESSAGE.FIELD);

        // THEN: S.Label 내부 구조 검증 (로딩 중)
        expect(label.children).toHaveLength(1);
        expect(errorMessage.children).toHaveLength(0);

        const loadingSpinner = label.children[0];

        // THEN: LoadingSpinner가 렌더링되었는지 확인
        expect(loadingSpinner).toBeInTheDocument();
      });

      test(`UploadImageButton 렌더 시 isLoading=false라면, 
            최상위에 S.Label과 ErrorMessage 가 렌더되고 
            S.Label의 children으로 photoIcon, span, input이 렌더됨`, async () => {
        // GIVEN: hasError: true, isLoading: false, mock user event setup, mock handler
        const user = userEvent.setup();
        const uploadFiles = [
          new File(["xx"], "photo1.png", { type: "image/png" }),
          new File(["xx"], "photo2.jpg", { type: "image/jpeg" }),
        ];
        const mockHandleImageChange = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId, getByLabelText } = renderComponent({
          ui: (
            <UploadImageButton
              className="test-class"
              hasError
              isLoading={false}
              isMaxImages={false}
              uploadCompletedLabel={uploadCompletedLabel}
              handleImageChange={mockHandleImageChange}
            />
          ),
        });

        // THEN: 최상위 엘리먼트 개수 및 ErrorMessage 텍스트 검증 (에러 상태 확인)
        expect(container.children).toHaveLength(2);
        const label = container.children[0];

        expect(label).toBeInTheDocument();

        const errorMessage = container.children[1];
        expect(errorMessage).toBe(getByTestId("test-error-message"));
        expect(errorMessage).toHaveTextContent(COMMON_ERROR_MESSAGE.FIELD);

        // THEN: S.Label 내부 구조 검증 (업로드 가능 상태)
        expect(label.children).toHaveLength(3);
        expect(errorMessage.children).toHaveLength(0);

        const photoIcon = label.children[0];

        // THEN: PhotoIcon 렌더링 확인
        expect(photoIcon).toBeInTheDocument();

        const spanText = label.children[1];

        // THEN: Span 텍스트 및 Hook 호출 검증
        expect(spanText).toBeInTheDocument();

        expect(mockDefaultLanguage).toHaveBeenCalledWith({
          text: LANGUAGE_LABEL.UPLOAD_PHOTO,
        });

        const inputPhoto = label.children[2];

        // THEN: input[type=file] 속성 검증
        expect(inputPhoto).toBeInTheDocument();
        expect(inputPhoto.id).toBe("photo");

        // WHEN: input에 파일 업로드 시도
        await user.upload(
          getByLabelText(LANGUAGE_LABEL.UPLOAD_PHOTO),
          uploadFiles,
        );

        // THEN: handleImageChange 핸들러가 한 번 호출되었는지 확인
        expect(mockHandleImageChange).toHaveBeenCalledOnce();
      });
    });
  });
});
