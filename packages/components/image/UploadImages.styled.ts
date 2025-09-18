import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const UploadImages = styled.div`
  width: 500px;
`;

export const PreviewContent = styled.ol`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const FormatInfo = styled.ul`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    margin-top: 4px;
    color: ${theme.color.gray_60};
  `}
`;
