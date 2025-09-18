import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface QueryFilterFieldWrapperProps {
  disabled: boolean;
  labelWidth?: number; // TODO: 임시 Optional 처리 추후 필수값으로 변경 필요
}

export const QueryFilterFieldWrapper = styled.div<QueryFilterFieldWrapperProps>`
  ${({ theme, disabled, labelWidth }) => css`
    display: grid;
    grid-template-columns: ${labelWidth ? `${labelWidth}px` : "210px"} 1fr;

    ${disabled &&
    css`
      background-color: ${theme.color.gray_20};

      & > div:nth-of-type(1) {
        background-color: ${theme.color.gray_30};
      }

      & > div:nth-of-type(2) > ul > li > label {
        color: ${theme.color.gray_50};
        background-color: ${theme.color.gray_20};

        &:hover {
          cursor: not-allowed;
        }
      }

      &:hover {
        cursor: not-allowed;
      }
    `}
  `}
`;

export const inlineSkeleton = css`
  margin-left: 20px;
`;

export const QueryFilterFieldRadioSkeletonWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 24px;
  max-width: fit-content;
  padding: 7px 20px;
`;

export const QueryFilterFieldControlSkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
