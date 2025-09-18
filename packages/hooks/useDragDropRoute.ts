import type { DragEvent } from "react";
import { useState } from "react";

const useDragDropRoute = (
  callbackFn: (dragTargetId: string, dropTargetId: string) => void,
) => {
  const [isMute, setIsMute] = useState(false);
  const [draggableId, setDraggableId] = useState("");
  const [dragTargetId, setDragTargetId] = useState("");
  const [dropTargetId, setDropTargetId] = useState("");

  const handleSetDraggableId = (id: string | undefined) => (): void => {
    if (!id) return;

    setDraggableId(id);
  };

  const handleDragStart = (id: string | undefined) => (): void => {
    if (!id) return;

    notifyDragObservers(id, "start");
  };

  const handleDragEnd = (id: string | undefined) => (): void => {
    if (!id) return;

    notifyDragObservers(id, "stop");
  };

  const handleDragEnter = (id: string | undefined) => (): void => {
    if (!id) return;

    notifyDragObservers(id, "enter");
  };

  const handleDragOver = (e: DragEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLElement>): void => {
    e.preventDefault();

    if (!dropTargetId) return;

    if (dragTargetId && dragTargetId !== dropTargetId) {
      typeof callbackFn === "function" &&
        callbackFn(dragTargetId, dropTargetId);
    }
    setDropTargetId("");
  };

  const notifyDragObservers = (
    targetId: string,
    state: "start" | "stop" | "enter",
  ): void => {
    switch (state) {
      case "start":
        setIsMute(true);
        setDragTargetId(targetId);
        break;

      case "stop":
        setIsMute(false);
        setDraggableId("");
        setDragTargetId("");

        if (dropTargetId) {
          setDropTargetId("");
        }
        break;

      case "enter":
        setDropTargetId(targetId);
        break;

      default:
        new Error(`is not valid state ${state}`);
    }
  };

  return {
    isMute,
    draggableId,
    dragTargetId,
    dropTargetId,
    handleSetDraggableId,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragOver,
    handleDrop,
  };
};

export default useDragDropRoute;
