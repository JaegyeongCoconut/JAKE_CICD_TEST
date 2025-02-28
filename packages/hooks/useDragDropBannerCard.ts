import { throttle } from "lodash-es";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import type { BannerItem } from "@repo/types";

interface Item {
  bannerId: string;
  originIdx: number;
}

const useDragDropBannerCard = (
  banner: BannerItem,
  hoveredBannerInfo: { idx: number; isPrevDragging: boolean },
  changeOveredIdx: (idx: number, isPrev: boolean) => void,
  findBanner: (id: string) => { index: number },
  moveBanner: (id: string, to: number) => void,
) => {
  const { id: bannerId, idx: bannerIdx } = banner;
  const originIdx = findBanner(bannerId).index;

  const [{ isDragging }, dragBannerCard] = useDrag(
    () => ({
      type: "banner",
      item: { bannerId, originIdx },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { bannerId: droppedId, originIdx } = item;
        const didDrop = monitor.didDrop();

        if (!didDrop) {
          moveBanner(droppedId, originIdx);
        }
      },
    }),
    [bannerId, originIdx, moveBanner],
  );

  const hoverItem = throttle(
    (item: Item, monitor: DropTargetMonitor<Item, unknown>): void => {
      if (!monitor.isOver()) {
        changeOveredIdx(-1, false);
        return;
      }

      const isPrev = item.originIdx >= bannerIdx;

      if (hoveredBannerInfo.idx !== bannerIdx) {
        changeOveredIdx(bannerIdx, isPrev);
      }
    },
    100,
  );

  const [, dropBannerCard] = useDrop(
    () => ({
      accept: "banner",
      hover: (item: Item, monitor: DropTargetMonitor<Item, unknown>) =>
        hoverItem(item, monitor),
      drop: (item: Item) => {
        const { bannerId: draggedId } = item;

        changeOveredIdx(-1, false);

        if (draggedId !== bannerId) {
          const { index: overIndex } = findBanner(bannerId);

          moveBanner(draggedId, overIndex);
        }
      },
    }),
    [hoveredBannerInfo, findBanner, moveBanner],
  );

  return { isDragging, dragBannerCard, dropBannerCard };
};

export default useDragDropBannerCard;
