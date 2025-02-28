import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const AccountInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  height: 52px;
`;

export const AccountInputLabel = styled.label<{ isLabelTop: boolean }>`
  ${({ theme, isLabelTop }) => css`
    ${isLabelTop ? theme.font.regular_12 : theme.font.regular_15};
    position: absolute;
    top: ${isLabelTop ? 0 : "16px"};
    color: ${theme.color.gray_50};
    transition-duration: 0.3s;
  `}
`;

export const AccountInput = styled.input<{ hasError: boolean }>`
  ${({ theme, hasError }) => css`
    ${theme.font.regular_15};
    height: 37px;
    outline: 0;
    border: 0;
    border-bottom: 1px solid
      ${hasError ? theme.color.red_20 : theme.color.gray_30};
    padding-right: calc({EYE_ICON_SIZE} + 16px);
    background-color: inherit;

    &:focus {
      border: 0;
      border-bottom: 1px solid ${theme.color.blue_10};
    }
  `}
`;

export const PasswordShowButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 0px;
  width: 24px;
  height: 24px;
`;

export const eyeIcon = (isShow: boolean) => (theme: Theme) => css`
  width: 24px;

  & > path {
    fill: ${isShow ? theme.color.blue_10 : theme.color.gray_40};
  }
`;
