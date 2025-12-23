import type { ComponentProps } from "react";
import React from "react";

import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import Pagination from "@packages/pagination/Pagination";
import type * as StyledType from "@packages/pagination/Pagination.styled";

import renderComponent from "@tests/renderComponent";

const hoisted = vi.hoisted(() => {
  const mockChevronLeftIcon = vi.fn();
  const mockChevronRightIcon = vi.fn();
  const mockChevronDoubleRightIcon = vi.fn();
  const mockUsePagination = vi.fn();

  return {
    mockChevronLeftIcon,
    mockChevronRightIcon,
    mockChevronDoubleRightIcon,
    mockUsePagination,
  };
});
vi.mock("@repo/assets/icon/ic_down.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-down" />,
}));
vi.mock("@repo/assets/icon/ic_left_double.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-left-double" />,
}));
vi.mock("@repo/hooks/pagination/usePagination", () => ({
  default: hoisted.mockUsePagination,
}));
vi.mock("@packages/pagination/Pagination.styled", () => {
  const MockStyledPagination = (
    props: ComponentProps<typeof StyledType.Pagination>,
  ) => <div className={props.className}>{props.children}</div>;
  const MockStyledWrapper = (
    props: ComponentProps<typeof StyledType.Wrapper>,
  ) => <div>{props.children}</div>;
  const MockStyledArrowButton = (
    props: ComponentProps<typeof StyledType.ArrowButton>,
  ) => (
    <button disabled={props.disabled} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
  const MockStyledNumberWrapper = (
    props: ComponentProps<typeof StyledType.NumberWrapper>,
  ) => <div>{props.children}</div>;
  const MockStyledNumberButton = (
    props: ComponentProps<typeof StyledType.NumberButton>,
  ) => (
    <button
      data-is-current-page={props.isCurrentPage}
      data-testid="test-number-button"
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );

  return {
    Pagination: MockStyledPagination,
    Wrapper: MockStyledWrapper,
    ArrowButton: MockStyledArrowButton,
    NumberWrapper: MockStyledNumberWrapper,
    NumberButton: MockStyledNumberButton,
    chevronLeftIcon: hoisted.mockChevronLeftIcon,
    chevronRightIcon: hoisted.mockChevronRightIcon,
    chevronDoubleRightIcon: hoisted.mockChevronDoubleRightIcon,
  };
});

// GIVEN: usePagination에서 반환할 기본 페이지 번호 배열
const basePageNumbers = [1, 2, 3, 4, 5];

beforeEach(() => {
  // GIVEN: usePagination 훅의 기본 반환값 설정
  hoisted.mockUsePagination.mockReturnValue({
    isPreviousNumberDisabled: false,
    isNextNumberDisabled: false,
    pageNumbers: basePageNumbers,
  });
});

describe("Pagination Test", () => {
  const user = userEvent.setup();

  describe("초기 렌더 시, 모든 UI 요소가 올바르게 렌더링되고 각 핸들러가 정상적으로 동작하는지 검증", () => {
    // GIVEN: 모든 핸들러 Mock 함수 정의
    let mockHandleFirstPageClick = vi.fn();
    let mockHandleLastPageClick = vi.fn();
    let mockHandleNextPageClick = vi.fn();
    let mockHandleNumberClick = vi.fn();
    let mockHandlePreviousPageClick = vi.fn();

    beforeEach(() => {
      //WHEN: 각 테스트 실행 전마다 Mock 함수를 새로 정의
      mockHandleFirstPageClick = vi.fn();
      mockHandleLastPageClick = vi.fn();
      mockHandleNextPageClick = vi.fn();
      mockHandleNumberClick = vi.fn();
      mockHandlePreviousPageClick = vi.fn();
    });

    const setup = () => {
      const user = userEvent.setup();
      const currentPage = 3;
      const { container } = renderComponent({
        ui: (
          <Pagination
            className="test-class"
            currentPage={currentPage}
            maxPageCount={10}
            totalPages={50}
            handleFirstPageClick={mockHandleFirstPageClick}
            handleLastPageClick={mockHandleLastPageClick}
            handleNextPageClick={mockHandleNextPageClick}
            handleNumberClick={mockHandleNumberClick}
            handlePreviousPageClick={mockHandlePreviousPageClick}
          />
        ),
      });
      const pagination = container.children[0];
      const wrapper = pagination.children[0];

      return { container, wrapper, pagination, user, currentPage };
    };

    test("초기 렌더 시 모든 UI 요소가 올바르게 렌더링되었는지 검증", () => {
      const { pagination, wrapper } = setup();

      // THEN: 1. 최상위 Styled Pagination Wrapper 및 className 확인
      expect(pagination).toBeInTheDocument();
      expect(pagination).toHaveClass("test-class");
      expect(pagination.children).toHaveLength(1);

      // THEN: 2. 내부 Wrapper 구조 확인
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.children).toHaveLength(5);

      // GIVEN: button 요소 렌더링 순서대로 가져오기
      const previousDoubleArrowButton = wrapper.children[0];
      const previousArrowButton = wrapper.children[1];
      const numberWrapper = wrapper.children[2];
      const nextArrowButton = wrapper.children[3];
      const nextDoubleArrowButton = wrapper.children[4];

      // THEN: 처음 페이지 이동 버튼 (Double Left Arrow) 아이콘 렌더링 확인
      const previousLeftDoubleIcon = within(
        previousDoubleArrowButton as HTMLElement,
      ).getByTestId("test-ic-left-double");

      expect(previousLeftDoubleIcon).toBeInTheDocument();
      expect(previousLeftDoubleIcon.tagName).toBe("svg");
      expect(hoisted.mockChevronDoubleRightIcon).toHaveBeenCalledOnce(); // DESC: Styled Component 내부에서 호출 확인

      // THEN: 이전 페이지 이동 버튼 (Left Arrow) 아이콘 렌더링 및 Mock 호출 확인
      const previousDownIcon = within(
        previousArrowButton as HTMLElement,
      ).getByTestId("test-ic-down"); // NOTE: Styled component에서 chevronLeftIcon을 사용하지만 Mocking시 ic_down을 사용함

      expect(previousDownIcon).toBeInTheDocument();
      expect(previousDownIcon.tagName).toBe("svg");
      expect(hoisted.mockChevronLeftIcon).toHaveBeenCalledOnce(); // DESC: Styled Component 내부에서 호출 확인

      // THEN: 페이지 번호 버튼 그룹 렌더링 및 개수 확인
      expect(numberWrapper).toBeInTheDocument();
      expect(numberWrapper.children).toHaveLength(basePageNumbers.length);

      // THEN: 다음 페이지 이동 버튼 (Right Arrow) 아이콘 렌더링 및 Mock 호출 확인
      const nextDownIcon = within(nextArrowButton as HTMLElement).getByTestId(
        "test-ic-down",
      ); // NOTE: Styled component에서 chevronRightIcon을 사용하지만 Mocking시 ic_down을 사용함

      expect(nextDownIcon).toBeInTheDocument();
      expect(nextDownIcon.tagName).toBe("svg");
      expect(hoisted.mockChevronRightIcon).toHaveBeenCalledOnce(); // Styled Component 내부에서 호출 확인

      // THEN: 마지막 페이지 이동 버튼 (Double Right Arrow) 아이콘 렌더링 및 Mock 호출 확인
      const nextDoubleRightIcon = within(
        nextDoubleArrowButton as HTMLElement,
      ).getByTestId("test-ic-left-double"); // NOTE: Styled component에서 chevronDoubleRightIcon을 사용하지만 Mocking시 ic_left_double을 사용함

      expect(nextDoubleRightIcon).toBeInTheDocument();
      expect(nextDoubleRightIcon.tagName).toBe("svg");
      expect(hoisted.mockChevronDoubleRightIcon).toHaveBeenCalledOnce(); // DESC: Styled Component 내부에서 호출 확인
    });

    test("첫 페이지 이동 버튼 클릭 시, handleFirstPageClick 핸들러가 1회 호출하는지 검증", async () => {
      //GIVEN: 공용 setup에서 필요한 값만 꺼내오기
      const { wrapper, user } = setup();

      const previousDoubleArrowButton = wrapper.children[0];

      expect(previousDoubleArrowButton).toBeInTheDocument();
      expect(previousDoubleArrowButton).toBeEnabled();
      expect(previousDoubleArrowButton).toHaveAttribute("type", "button");
      expect(previousDoubleArrowButton.children).toHaveLength(1);

      // WHEN: 클릭
      await user.click(previousDoubleArrowButton);

      // THEN: handleFirstPageClick 핸들러가 1회 호출되었는지 확인
      expect(mockHandleFirstPageClick).toHaveBeenCalledOnce();

      // THEN: handleFirstPageClick 외의 핸들러가 호출되지 않았는지 확인
      expect(mockHandleLastPageClick).not.toHaveBeenCalled();
      expect(mockHandleNextPageClick).not.toHaveBeenCalled();
      expect(mockHandlePreviousPageClick).not.toHaveBeenCalled();
    });

    test("이전 페이지 이동 버튼 클릭 시, handlePreviousPageClick 핸들러가 1회 호출하는지 검증", async () => {
      //GIVEN: 공용 setup에서 필요한 값만 꺼내오기
      const { wrapper, user } = setup();

      const previousArrowButton = wrapper.children[1];

      expect(previousArrowButton).toBeInTheDocument();
      expect(previousArrowButton).toBeEnabled();
      expect(previousArrowButton).toHaveAttribute("type", "button");
      expect(previousArrowButton.children).toHaveLength(1);

      // WHEN: 클릭
      await user.click(previousArrowButton);

      // THEN: handlePreviousPageClick 핸들러가 1회 호출되었는지 확인
      expect(mockHandlePreviousPageClick).toHaveBeenCalledOnce();

      // THEN: handlePreviousPageClick 외의 핸들러가 호출되지 않았는지 확인
      expect(mockHandleLastPageClick).not.toHaveBeenCalled();
      expect(mockHandleNextPageClick).not.toHaveBeenCalled();
      expect(mockHandleFirstPageClick).not.toHaveBeenCalled();
    });

    test("숫자 페이지 버튼 클릭 시, handleNumberClick 핸들러가 1회 호출하는지 검증", async () => {
      //GIVEN: 공용 setup에서 필요한 값만 꺼내오기
      const { wrapper, user, currentPage } = setup();

      // DESC: 페이지 번호 그룹 테스트
      const numberWrapper = wrapper.children[2];

      expect(numberWrapper).toBeInTheDocument();
      // THEN: usePagination에서 받은 페이지 번호 개수만큼 버튼 렌더링 확인
      expect(numberWrapper.children).toHaveLength(basePageNumbers.length);

      const numberButtons = within(numberWrapper as HTMLElement).getAllByTestId(
        "test-number-button",
      );

      for (let i = 0; i < numberButtons.length; i++) {
        const numberButton = numberButtons[i];
        const isCurrentPage = currentPage === i + 1;

        // THEN: 버튼 기본 속성 확인
        expect(numberButton).toBeInTheDocument();
        expect(numberButton).toHaveAttribute("type", "button");
        // THEN: 현재 페이지 상태 (data-is-current-page) 확인
        expect(numberButton).toHaveAttribute(
          "data-is-current-page",
          `${isCurrentPage}`,
        );
        expect(numberButton).toBeEnabled();
        expect(numberButton).toHaveTextContent(`${basePageNumbers[i]}`);

        // WHEN: 숫자 버튼 클릭
        await user.click(numberButton);

        // THEN: handleNumberClick 호출 확인 (인덱스 + 페이지 번호 전달)
        expect(mockHandleNumberClick).toHaveBeenNthCalledWith(
          i + 1, // NOTE: NthCalled는 1부터 시작, i+1번째 호출
          basePageNumbers[i], // NOTE: 해당 페이지 번호
        );
      }
    });

    test("다음 페이지 이동 버튼 클릭 시, handleNextPageClick 핸들러가 1회 호출하는지 검증", async () => {
      //GIVEN: 공용 setup에서 필요한 값만 꺼내오기
      const { wrapper, user } = setup();

      const nextArrowButton = wrapper.children[3];

      expect(nextArrowButton).toBeInTheDocument();
      expect(nextArrowButton).toBeEnabled();
      expect(nextArrowButton).toHaveAttribute("type", "button");
      expect(nextArrowButton.children).toHaveLength(1);

      // WHEN: 클릭
      await user.click(nextArrowButton);

      // THEN: handleNextPageClick 핸들러가 1회 호출되었는지 확인
      expect(mockHandleNextPageClick).toHaveBeenCalledOnce();

      // THEN: handleNextPageClick 외의 핸들러가 호출되지 않았는지 확인
      expect(mockHandleLastPageClick).not.toHaveBeenCalled();
      expect(mockHandleFirstPageClick).not.toHaveBeenCalled();
      expect(mockHandlePreviousPageClick).not.toHaveBeenCalled();
    });

    test("마지막 페이지 이동 버튼 클릭 시, handleLastPageClick 핸들러가 1회 호출하는지 검증", async () => {
      //GIVEN: 공용 setup에서 필요한 값만 꺼내오기
      const { wrapper, user } = setup();

      const nextDoubleArrowButton = wrapper.children[4];

      expect(nextDoubleArrowButton).toBeInTheDocument();
      expect(nextDoubleArrowButton).toBeEnabled();
      expect(nextDoubleArrowButton).toHaveAttribute("type", "button");
      expect(nextDoubleArrowButton.children).toHaveLength(1);

      // WHEN: 클릭
      await user.click(nextDoubleArrowButton);

      // THEN: handleLastPageClick 핸들러가 1회 호출되었는지 확인
      expect(mockHandleLastPageClick).toHaveBeenCalledOnce();

      // THEN: handleLastPageClick 외의 핸들러가 호출되지 않았는지 확인
      expect(mockHandleNextPageClick).not.toHaveBeenCalled();
      expect(mockHandlePreviousPageClick).not.toHaveBeenCalled();
      expect(mockHandleFirstPageClick).not.toHaveBeenCalled();
    });
  });

  test(`isPreviousNumberDisabled=true & isNextNumberDisabled=false이면,
        맨 앞으로 가기 버튼과 앞으로 가기 버튼은 비활성화
        맨 뒤로 가기 버튼과 뒤로 가기 버튼은 활성화됨`, async () => {
    // GIVEN: usePagination 훅이 이전은 비활성화, 다음은 활성화 상태를 반환하도록 설정
    hoisted.mockUsePagination.mockReturnValue({
      isPreviousNumberDisabled: true,
      isNextNumberDisabled: false,
      pageNumbers: basePageNumbers,
    });

    // GIVEN: 핸들러 Mock 함수 정의
    const mockHandleFirstPageClick = vi.fn();
    const mockHandleLastPageClick = vi.fn();
    const mockHandleNextPageClick = vi.fn();
    const mockHandlePreviousPageClick = vi.fn();

    // WHEN: Pagination 컴포넌트를 렌더링
    const { container } = renderComponent({
      ui: (
        <Pagination
          className="test-class"
          currentPage={3}
          maxPageCount={10}
          totalPages={50}
          handleFirstPageClick={mockHandleFirstPageClick}
          handleLastPageClick={mockHandleLastPageClick}
          handleNextPageClick={mockHandleNextPageClick}
          handleNumberClick={() => () => {}}
          handlePreviousPageClick={mockHandlePreviousPageClick}
        />
      ),
    });

    const pagination = container.children[0];
    const wrapper = pagination.children[0];

    // DESC: 맨 앞으로 가기 버튼 (<<) 테스트
    const previousDoubleArrowButton = wrapper.children[0];

    expect(previousDoubleArrowButton).toBeInTheDocument();
    // THEN: isPreviousNumberDisabled=true 이므로 비활성화 확인
    expect(previousDoubleArrowButton).toBeDisabled();

    // WHEN: 클릭 시도
    await user.click(previousDoubleArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandleFirstPageClick).not.toHaveBeenCalled();

    // DESC: 이전 페이지 버튼 (<) 테스트
    const previousArrowButton = wrapper.children[1];

    expect(previousArrowButton).toBeInTheDocument();
    // THEN: isPreviousNumberDisabled=true 이므로 비활성화 확인
    expect(previousArrowButton).toBeDisabled();

    // WHEN: 클릭 시도
    await user.click(previousArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandlePreviousPageClick).not.toHaveBeenCalled();

    // DESC: 다음 페이지 버튼 (>) 테스트
    const nextArrowButton = wrapper.children[3];

    expect(nextArrowButton).toBeInTheDocument();
    // THEN: isNextNumberDisabled=false 이므로 활성화 확인
    expect(nextArrowButton).toBeEnabled();

    // WHEN: 클릭
    await user.click(nextArrowButton);

    // THEN: 핸들러가 호출되었는지 확인
    expect(mockHandleNextPageClick).toHaveBeenCalledOnce();

    // DESC: 맨 뒤로 가기 버튼 (>>) 테스트
    const nextDoubleArrowButton = wrapper.children[4];

    expect(nextDoubleArrowButton).toBeInTheDocument();
    // THEN: isNextNumberDisabled=false 이므로 활성화 확인
    expect(nextDoubleArrowButton).toBeEnabled();

    // WHEN: 클릭
    await user.click(nextDoubleArrowButton);

    // THEN: 핸들러가 호출되었는지 확인
    expect(mockHandleLastPageClick).toHaveBeenCalledOnce();
  });

  test(`isPreviousNumberDisabled=true & isNextNumberDisabled=true이면,
        맨 앞으로 가기 버튼과 앞으로 가기 버튼은 비활성화
        맨 뒤로 가기 버튼과 뒤로 가기 버튼은 비활성화됨
    `, async () => {
    // GIVEN: usePagination 훅이 이전/다음 버튼 모두 비활성화 상태를 반환하도록 설정
    hoisted.mockUsePagination.mockReturnValue({
      isPreviousNumberDisabled: true,
      isNextNumberDisabled: true,
      pageNumbers: basePageNumbers,
    });

    // GIVEN: 핸들러 Mock 함수 정의
    const mockHandleFirstPageClick = vi.fn();
    const mockHandleLastPageClick = vi.fn();
    const mockHandleNextPageClick = vi.fn();
    const mockHandlePreviousPageClick = vi.fn();

    // WHEN: Pagination 컴포넌트를 렌더링
    const { container } = renderComponent({
      ui: (
        <Pagination
          className="test-class"
          currentPage={3}
          maxPageCount={10}
          totalPages={50}
          handleFirstPageClick={mockHandleFirstPageClick}
          handleLastPageClick={mockHandleLastPageClick}
          handleNextPageClick={mockHandleNextPageClick}
          handleNumberClick={() => () => {}}
          handlePreviousPageClick={mockHandlePreviousPageClick}
        />
      ),
    });

    const pagination = container.children[0];
    const wrapper = pagination.children[0];

    // DESC: 맨 앞으로 가기 버튼 (<<) 테스트
    const previousDoubleArrowButton = wrapper.children[0];

    expect(previousDoubleArrowButton).toBeInTheDocument();
    // THEN: 버튼이 비활성화되었는지 확인
    expect(previousDoubleArrowButton).toBeDisabled();

    // WHEN: 비활성화된 버튼 클릭 시도
    await user.click(previousDoubleArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandleFirstPageClick).not.toHaveBeenCalled();

    // DESC: 이전 페이지 버튼 (<) 테스트
    const previousArrowButton = wrapper.children[1];

    expect(previousArrowButton).toBeInTheDocument();
    // THEN: 버튼이 비활성화되었는지 확인
    expect(previousArrowButton).toBeDisabled();

    // WHEN: 비활성화된 버튼 클릭 시도
    await user.click(previousArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandlePreviousPageClick).not.toHaveBeenCalled();

    // DESC: 다음 페이지 버튼 (>) 테스트
    const nextArrowButton = wrapper.children[3];

    expect(nextArrowButton).toBeInTheDocument();
    // THEN: 버튼이 비활성화되었는지 확인
    expect(nextArrowButton).toBeDisabled();

    // WHEN: 비활성화된 버튼 클릭 시도
    await user.click(nextArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandleNextPageClick).not.toHaveBeenCalled();

    // DESC: 맨 뒤로 가기 버튼 (>>) 테스트
    const nextDoubleArrowButton = wrapper.children[4];

    expect(nextDoubleArrowButton).toBeInTheDocument();
    // THEN: 버튼이 비활성화되었는지 확인
    expect(nextDoubleArrowButton).toBeDisabled();

    // WHEN: 비활성화된 버튼 클릭 시도
    await user.click(nextDoubleArrowButton);

    // THEN: 핸들러가 호출되지 않았는지 확인
    expect(mockHandleLastPageClick).not.toHaveBeenCalled();
  });

  test(`isPreviousNumberDisabled, isNextNumberDisabled에 관계 없이
        pageNumbers의 길이가 0일 경우, 
        NumberButton은 disabled=true isCurrentPage=false, Text는 1로 렌더됨`, () => {
    // GIVEN: usePagination hook이 빈 배열을 반환하도록 설정
    hoisted.mockUsePagination.mockReturnValue({
      isPreviousNumberDisabled: true, // DESC: 비활성화 여부와 무관함을 테스트하기 위해 true 설정
      isNextNumberDisabled: true,
      pageNumbers: [], //
    });

    // WHEN: Pagination 컴포넌트를 모든 prop과 함께 렌더링
    const { container } = renderComponent({
      ui: (
        <Pagination
          className="test-class"
          currentPage={3} // DESC: 현재 페이지 값과 무관함을 테스트하기 위해 3 설정
          maxPageCount={10}
          totalPages={50}
          handleFirstPageClick={() => {}}
          handleLastPageClick={() => {}}
          handleNextPageClick={() => {}}
          handleNumberClick={() => () => {}}
          handlePreviousPageClick={() => {}}
        />
      ),
    });

    const pagination = container.children[0];
    const wrapper = pagination.children[0];
    const numberWrapper = wrapper.children[2];

    // THEN: 1. 숫자 버튼 그룹이 DOM에 있어야 함
    expect(numberWrapper).toBeInTheDocument();
    // THEN: 2. pageNumbers가 비어있어도 최소 1개의 버튼이 렌더링되어야 함
    expect(numberWrapper.children).toHaveLength(1);

    const numberButton = numberWrapper.children[0];

    // THEN: 3. 렌더링된 버튼이 DOM에 있어야 함
    expect(numberButton).toBeInTheDocument();
    // THEN: 4. 버튼은 클릭 불가능 상태여야 함
    expect(numberButton).toBeDisabled();
    expect(numberButton).toHaveAttribute("type", "button");
    // THEN: 5. 현재 페이지 상태는 false여야 함
    expect(numberButton).toHaveAttribute("data-is-current-page", "false");
    // THEN: 6. 버튼 텍스트는 '1'로 표시되어야 함
    expect(numberButton).toHaveTextContent("1");
  });
});
