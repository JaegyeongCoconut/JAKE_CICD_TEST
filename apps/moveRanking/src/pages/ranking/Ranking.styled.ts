import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-width: 375px;
  width: 100%;
  height: 100vh;

  /* 웹킷 기반 브라우저용 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
  /* 파이어폭스용 스크롤바 숨김 */
  scrollbar-width: none;
  /* IE와 Edge용 스크롤바 숨김 */
  -ms-overflow-style: none;
`;
