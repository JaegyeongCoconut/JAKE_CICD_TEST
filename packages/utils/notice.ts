import { extractS3ImageKey } from "./image/common";

interface CountNoticeNoProps {
  currentPage: number;
  totalData: number;
}

export const countNoticeNo = ({
  totalData,
  currentPage,
}: CountNoticeNoProps): number => totalData - (currentPage - 1) * 20;

const IMAGE_SRC_REGEX = /<img src="([^"]+)"/g;

export const extractNoticeImageSource = (content: string): string[] =>
  [...content.matchAll(IMAGE_SRC_REGEX)].map((match) => match[1]);

interface FilterCurrentImagesProps {
  currentImages: string[];
  originalImages: string[];
}

export const filterCurrentImages = ({
  currentImages,
  originalImages,
}: FilterCurrentImagesProps): string[] =>
  originalImages.filter((image) => currentImages.includes(image));

interface CombineImagesProps {
  currentImages: string[];
  uploadImages: string[];
}

export const combineImages = ({
  uploadImages,
  currentImages,
}: CombineImagesProps): string[] => {
  const makeS3Images = (list: string[]): string[] =>
    list.map(extractS3ImageKey);

  return [...makeS3Images(currentImages), ...makeS3Images(uploadImages)];
};
