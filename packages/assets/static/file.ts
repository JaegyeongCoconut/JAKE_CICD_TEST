export const PNG_JPG_JPEG_FILE_EXTENSIONS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
];
export const PNG_FILE_EXTENSIONS = ["image/png"];
export const SVG_FILE_EXTENSIONS = ["image/svg+xml"];
export const IMAGE_FILE_EXTENSIONS = [
  ...PNG_JPG_JPEG_FILE_EXTENSIONS,
  ...PNG_FILE_EXTENSIONS,
  ...SVG_FILE_EXTENSIONS,
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/tiff",
  "image/x-icon",
] as const;

export const BYTES_FROM_20KB = 20 * Math.pow(1024, 1);
export const BYTES_FROM_1_5MB = 1.5 * Math.pow(1024, 2);
export const BYTES_FROM_1MB = 1 * Math.pow(1024, 2);
export const BYTES_FROM_0_5MB = 0.5 * Math.pow(1024, 2);
