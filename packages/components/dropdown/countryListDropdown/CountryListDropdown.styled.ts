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
    border: 1px solid ${hasError ? theme.color.red_20 : theme.color.gray_30};
    padding: 0 12px;

    &[disabled] {
      background-color: ${theme.color.gray_10};

      > svg > path {
        fill: ${theme.color.gray_40};
      }
    }

    &[data-haserr="true"] {
      border-color: ${theme.color.red_20};
    }

    &[aria-expanded="true"] {
      border: 1px solid ${theme.color.blue_10};

      & > svg {
        transform: rotate(180deg);
      }
    }

    & > svg > path {
      fill: ${theme.color.black};
    }
  `}
`;

export const OptionWrapper = styled.ul<DropdownWrapperProps>`
  ${({ theme, isOpen }) => css`
    ${theme.scrollbar};

    position: absolute;
    display: ${isOpen ? "inherit" : "none"};
    top: calc(100% + 4px);
    width: 100%;
    max-height: 402px;
    border: 1px solid ${theme.color.gray_30};
    border-bottom: 0;
    background-color: ${theme.color.white};
    box-shadow: ${theme.boxShadow.shadow_bold};
    z-index: ${theme.zIndex.DROPDOWN};
  `}
`;

export const Option = styled.li`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
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
    width: 100%;
    min-height: 40px;
    padding: 0 12px;
    color: ${theme.color.gray_60};
    background-color: ${theme.color.white};
    word-break: break-all;

    :hover {
      color: ${theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }

    &[data-selected="true"] {
      color: ${status === "default" && theme.color.blue_10};

      svg {
        display: ${status === "default" && "block"};

        path {
          fill: ${status === "default" && theme.color.blue_10};
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
    color: ${theme.color.black};
    min-width: 24px;

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
    color: ${theme.color.black};
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const CustomOptionWrapper = styled(OptionWrapper)`
  width: 335px;
`;

export const CustomDropdownButton = styled(DropdownButton)`
  ${({ theme }) => css`
    width: 76px;

    &[disabled] {
      pointer-events: none;
      background-color: ${theme.color.gray_10};
    }

    & > svg {
      width: 16px;
      height: 16px;

      & > path {
        fill: ${theme.color.black};
      }
    }
  `}
`;
