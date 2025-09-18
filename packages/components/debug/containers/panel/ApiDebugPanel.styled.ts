import styled from "@emotion/styled";

export const ApiDebugPanel = styled.section`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #e7eaed;
  z-index: 99999;
  resize: vertical;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #ccc;
  cursor: row-resize;
  z-index: 10000;
`;

export const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 2rem;
  font-weight: 700;
  line-height: calc(34 / 20);
`;

export const ApiSummary = styled.summary`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: calc(34 / 20);
  cursor: pointer;
`;

export const ApiOl = styled.ol`
  position: relative;
  height: 200px;
  padding-left: 15px;
  overflow-y: auto;
`;

export const HeaderSpanWrapper = styled.div`
  position: sticky;
  top: 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #c1c9cf;
`;

export const HeaderSpan = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: calc(26 / 16);
`;

export const ApiList = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #ffffff;
`;

export const ApiListSpan = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: calc(24 / 14);
`;
