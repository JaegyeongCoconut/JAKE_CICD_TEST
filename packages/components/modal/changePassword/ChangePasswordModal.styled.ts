import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const modalLayout = css`
  width: 638px;
`;

export const content = css`
  margin-bottom: 12px;

  & > div:nth-of-type(2) {
    padding: 10px 0px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;

  & > button {
    position: absolute;
    top: 20px;
  }
`;

export const errorMessage = css`
  margin-top: 4px;
`;

export const passwordCondition = css`
  margin-top: 12px;
`;
