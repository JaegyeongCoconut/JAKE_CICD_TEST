import type { ChangeEvent } from "react";
import { useState } from "react";

import { useToastStore } from "@repo/stores/toast";
import type { ToastType } from "@repo/types";
import { appendValidFiles, compressionImage } from "@repo/utils/image/common";

interface UseUploadImagesBaseProps {
  isNeedCompress: boolean;
  images: (string | File)[] | undefined | null;
  maxFileCount: number;
  maxFileCountLabel: Omit<ToastType, "id">;
  handleFormPhotoUpdate: (file: (string | File)[]) => void;
}

interface UseUploadImagesCompressProps extends UseUploadImagesBaseProps {
  isNeedCompress: true;
  compressedMaxFileSize: number;
}

interface UseUploadImagesNotCompressProps extends UseUploadImagesBaseProps {
  isNeedCompress: false;
  compressedMaxFileSize?: never;
}

const useUploadImages = ({
  images,
  isNeedCompress,
  maxFileCount,
  maxFileCountLabel,
  compressedMaxFileSize,
  handleFormPhotoUpdate,
}: UseUploadImagesCompressProps | UseUploadImagesNotCompressProps) => {
  const addToast = useToastStore((state) => state.addToast);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadImages, setUploadImages] = useState<
    (string | File)[] | undefined | null
  >(images);

  const handleImagesAdd = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files = e.target.files;
    if (!files || !files.length || !uploadImages) return;

    const sortedImageFiles = Array.from(files).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    setIsLoading(true);

    const validFiles = appendValidFiles({
      sortedImageFiles,
      currentFiles: uploadImages,
      hasLimit: false, //TODO: carAdmin(신차> 이미지 업로드)에 필요하나 false로 고정되어있어 에러메세지 미발생 < 수정필요
      maxFileCount,
      maxFileCountLabel,
      handleToastAdd: addToast,
    });

    const convertFiles = isNeedCompress
      ? await Promise.all(
          validFiles.map((file) =>
            compressionImage({
              file,
              compressedMaxFileSize,
              maxWidthHeight: 1920,
            }),
          ),
        ).then((results) =>
          results.filter((file): file is File => file !== undefined),
        )
      : validFiles;

    const updatedImages = [...uploadImages, ...convertFiles];
    setUploadImages(updatedImages);

    handleFormPhotoUpdate(updatedImages);
    setIsLoading(false);

    e.target.value = "";
  };

  const handleImageRemove = (removeIndex: number) => (): void => {
    if (!uploadImages) return;

    const updatedImages = uploadImages?.filter(
      (_, index) => index !== removeIndex,
    );
    setUploadImages(updatedImages);
    handleFormPhotoUpdate(updatedImages);
  };

  return { isLoading, uploadImages, handleImagesAdd, handleImageRemove };
};

export default useUploadImages;
