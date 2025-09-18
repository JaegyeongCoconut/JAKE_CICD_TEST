import type { DragEvent as ReactDragEvent } from "react";
import { useEffect, useRef, useState } from "react";

interface UseDragDropFileProps {
  uploadImageFile: (file: File) => void;
}

const useDragDropFile = ({ uploadImageFile }: UseDragDropFileProps) => {
  const dragRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (
      (e.currentTarget as HTMLElement)?.contains(e.relatedTarget as HTMLElement)
    )
      return;

    setIsDragging(false);
  };

  const handleDragOver = (
    e: ReactDragEvent<HTMLDivElement> | DragEvent,
  ): void => {
    e.preventDefault();
  };

  const handleDrop = (e: ReactDragEvent<HTMLDivElement> | DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer?.items[0].getAsFile();

    if (!file) return;

    uploadImageFile(file);
  };

  useEffect(() => {
    const element = dragRef.current;

    if (element) {
      element.addEventListener("dragenter", handleDragEnter);
      element.addEventListener("dragleave", handleDragLeave);
      element.addEventListener("dragover", handleDragOver);
      element.addEventListener("drop", handleDrop);

      return () => {
        element.removeEventListener("dragenter", handleDragEnter);
        element.removeEventListener("dragleave", handleDragLeave);
        element.removeEventListener("dragover", handleDragOver);
        element.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  return { dragRef, isDragging, handleDragOver, handleDrop };
};

export default useDragDropFile;
