import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const icon = css`
  width: 64px;
  margin-bottom: 32px;
`;

export const Title = styled.p<{ hasMaginBottom?: boolean }>`
  ${({ theme, hasMaginBottom }) => css`
    ${theme.font.regular_14};
    margin-bottom: ${hasMaginBottom ? "40px" : "0px"};
    color: ${theme.color.gray_80};
  `}
`;
