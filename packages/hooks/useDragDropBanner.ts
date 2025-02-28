import { useCallback, useEffect, useState } from "react";

import type { BannerItem } from "@repo/types";

type BannerDatas = Omit<BannerItem, "isLoading">;

const useDragDropBanner = (bannerDatas: BannerDatas[]) => {
  const [banners, setBanners] = useState<BannerDatas[]>(bannerDatas);
  const [hoveredBannerInfo, setHoveredBannerInfo] = useState({
    idx: -1,
    isPrevDragging: false,
  });

  const changeHoveredBannerInfo = useCallback(
    (idx: number, isPrevDragging: boolean): void => {
      setHoveredBannerInfo({ idx, isPrevDragging });
    },
    [hoveredBannerInfo],
  );

  const findBanner = useCallback(
    (id: string): { banner: BannerDatas; index: number } => {
      const banner = banners.filter((banner) => banner.id === id)[0];
      return { banner, index: banners.indexOf(banner) };
    },
    [banners],
  );

  const moveBanner = useCallback(
    (id: string, atIndex: number): void => {
      const { banner, index } = findBanner(id);

      const newBanners = [...banners];
      newBanners.splice(index, 1);
      newBanners.splice(atIndex, 0, banner);

      const orderedBanners = [...newBanners].map((banner, i) => ({
        ...banner,
        idx: i,
      }));

      setBanners(orderedBanners);
    },
    [findBanner, banners, setBanners],
  );

  useEffect(() => {
    setBanners(bannerDatas);
  }, []);

  return {
    banners,
    hoveredBannerInfo,
    changeHoveredBannerInfo,
    findBanner,
    moveBanner,
  };
};

export default useDragDropBanner;
