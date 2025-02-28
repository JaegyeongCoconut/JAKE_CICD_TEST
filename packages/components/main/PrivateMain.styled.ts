import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PrivateMain = styled.main<{ width: string }>`
  ${({ theme, width }) => css`
    position: relative;
    min-width: max-content;
    width: calc(100% - ${width});
    min-height: calc(100vh - ${theme.size.HEADER_HEIGHT});
    margin: ${theme.size.HEADER_HEIGHT} 0 0 ${width}; // TODO: 추후 전체 페이지에 적용할 수 있게 수정 필요함
    padding: ${theme.size.MAIN_PADDING};
  `}
`;

export const logo = css`
  width: 80px;
`;
