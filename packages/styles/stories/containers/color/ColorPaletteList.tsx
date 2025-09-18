import React from "react";

import { ColorItem } from "@storybook/blocks";

import { color } from "../../../themes/color";

// TODO: 추가되는 색상이 있다면 그에 맞게 추가 필요
const groups = ["red", "blue", "green", "gray", "orange", "yellow", "white"];

const colorChunk = (
  colors: [string, string][],
  size: number,
): [string, string][][] =>
  Array.from({ length: Math.ceil(colors.length / size) }, (_, i) =>
    colors.slice(i * size, i * size + size),
  );

const getGroupColors = (group: string): [string, string][][] => {
  const entries = Object.entries(color).filter(([key]) =>
    key.startsWith(`${group}_`),
  );

  return group === "gray" ? colorChunk(entries, 7) : [entries];
};

const ColorPaletteList = () => {
  return (
    <>
      {groups.map((group) =>
        getGroupColors(group).map((entries, i) => (
          <ColorItem
            key={`${group}-${i}`}
            colors={Object.fromEntries(entries)}
            subtitle=""
            title={i === 0 ? group : ""}
          />
        )),
      )}
    </>
  );
};

export default ColorPaletteList;
