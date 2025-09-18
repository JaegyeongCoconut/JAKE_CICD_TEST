import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface DropdownWrapperProps {
  isOpen: boolean;
}

export const Dropdown = styled.div`
  position: relative;
  height: 40px;
`;

interface DropdownButtonProps {
  hasError?: boolean;
}

export const DropdownButton = styled.button<DropdownButtonProps>`
  ${({ theme, hasError }) => css`
    ${theme.font.regular_14};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid ${hasError ? theme.color.red_50 : theme.color.gray_30};
    padding: 0 12px;

    &[disabled] {
      background-color: ${theme.color.gray_10};

      > svg > path {
        fill: ${theme.color.gray_40};
      }
    }

    &[data-haserr="true"] {
      border-color: ${theme.color.red_50};
    }

    &[aria-expanded="true"] {
      border: 1px solid ${theme.color.blue_60};

      & > svg {
        transform: rotate(180deg);
      }
    }

    & > svg > path {
      fill: ${theme.color.gray_90};
    }
  `}
`;

export const OptionWrapper = styled.ul<DropdownWrapperProps>`
  ${({ theme, isOpen }) => css`
    ${theme.scrollbar};
    position: absolute;
    top: calc(100% + 4px);
    display: ${isOpen ? "inherit" : "none"};
    width: 100%;
    max-height: 402px;
    border: 1px solid ${theme.color.gray_30};
    border-bottom: 0;
    box-shadow: ${theme.boxShadow.shadow_bold};
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.DROPDOWN};
  `}
`;

export const Option = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${theme.color.gray_30};
  `}
`;

interface OptionButtonProps {
  status?: string;
}

export const OptionButton = styled.button<OptionButtonProps>`
  ${({ theme, status }) => css`
    ${theme.font.regular_14};
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    width: 100%;
    padding: 0 12px;
    color: ${theme.color.gray_60};
    word-break: break-all;
    background-color: ${theme.color.white_00};

    :hover {
      color: ${theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }

    &[data-selected="true"] {
      color: ${status === "default" && theme.color.blue_60};

      svg {
        display: ${status === "default" && "block"};

        path {
          fill: ${status === "default" && theme.color.blue_60};
        }
      }
    }
  `}
`;

export const CustomOption = styled(Option)`
  ${({ theme }) => css`
    &:first-of-type {
      border-bottom: 1px solid ${theme.color.gray_30};
    }

    &:not(:last-of-type) {
      border-bottom: 0;
    }
  `}
`;

export const CustomOptionButton = styled(OptionButton)`
  position: relative;
  justify-content: flex-start;
  column-gap: 18px;
`;

export const CountryCode = styled.span`
  ${({ theme }) => css`
    min-width: 24px;
    color: ${theme.color.gray_90};

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      display: inline-block;
      height: 12px;
      margin-left: 12px;
      border-right: 2px solid ${theme.color.gray_30};
      text-align: center;
      transform: translateY(-50%);
    }
  `}
`;

export const CountryInfo = styled.span`
  ${({ theme }) => css`
    display: inline-flex;
    display: -webkit-box;
    justify-content: flex-start;
    align-items: center;
    margin-left: 8px;
    overflow: hidden;
    color: ${theme.color.gray_90};
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  `}
`;

export const CustomOptionWrapper = styled(OptionWrapper)`
  width: 335px;
`;

export const CustomDropdownButton = styled(DropdownButton)`
  ${({ theme }) => css`
    width: 76px;

    &[disabled] {
      background-color: ${theme.color.gray_10};
      pointer-events: none;
    }

    & > svg {
      width: 16px;
      height: 16px;

      & > path {
        fill: ${theme.color.gray_90};
      }
    }
  `}
`;
