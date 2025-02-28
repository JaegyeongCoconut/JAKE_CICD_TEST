import { css, type Theme } from "@emotion/react";
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

    & > svg {
      width: 16px;
      height: 16px;
    }

    &[disabled] {
      ${theme.disabled.default};
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

export const SelectedValue = styled.span`
  ${({ theme }) => css`
    color: ${theme.color.black};
  `}
`;

export const Placeholder = styled.span`
  ${({ theme }) => css`
    color: ${theme.color.gray_40};
  `}
`;

export const singleDropdownCheckIcon =
  (isSelected: boolean) => (theme: Theme) => css`
    display: ${isSelected ? "block" : "none"};
    width: 16px;
    height: 16px;

    path {
      fill: ${isSelected && theme.color.blue_10};
    }
  `;

export const multiDropdownCheckIcon =
  (isSelected: boolean) => (theme: Theme) => css`
    width: 20px;
    height: 20px;

    & > path {
      fill: ${isSelected ? theme.color.blue_10 : theme.color.gray_40};
    }
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
  isSelected: boolean;
}

export const OptionButton = styled.button<OptionButtonProps>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 40px;
    padding: 0 12px;
    color: ${isSelected ? theme.color.blue_10 : theme.color.gray_60};
    background-color: ${theme.color.white};
    word-break: break-all;

    :hover {
      color: ${theme.color.gray_70};
      background-color: ${theme.color.gray_10};
    }
  `}
`;

export const NoOptionData = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    column-gap: 8px;
    border-bottom: 1px solid ${theme.color.gray_30};
    padding: 28px 0;
  `}
`;

export const noOptionIcon = (theme: Theme) => css`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;

export const noOptionDataMessage = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.gray_70};
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

    & > svg > path {
      fill: ${theme.color.black};
    }
  `}
`;

export const MulitDropdownLabelWrapper = styled.div`
  display: block;
  width: 100%;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > span:not(:last-of-type)::after {
    content: ",";
    margin-right: 4px;
  }
`;
