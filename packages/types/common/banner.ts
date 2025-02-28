import { BANNER_LINK_RADIOS, BANNER_STATUS_LIST } from "@repo/assets/static";

export interface BannerItem {
  color: string;
  id: string;
  idx: number;
  isActive: boolean;
  imageUrl: string | undefined;
  isLoading?: boolean;
  status: (typeof BANNER_STATUS_LIST)[number]["key"];
  linkType: (typeof BANNER_LINK_RADIOS)[number]["key"];
}

export interface FormBanner {
  linkType: (typeof BANNER_LINK_RADIOS)[number]["key"];
  linkUrl?: string;
  linkNotice?: { key: string; label: string };
  bannerImg: File | null;
  bgColor: string;
}
