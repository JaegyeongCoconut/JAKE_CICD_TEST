import React from "react";

import * as S from "./VersionForm.styled";
import LabelContentTableSkeleton from "../../label/table/content/LabelContentTable.skeleton";

interface VersionFormSkeletonProps {
  className?: string;
}

const VersionFormSkeleton = ({ className }: VersionFormSkeletonProps) => {
  const VERSION_FORM_INFO = [
    [{ key: "os", heading: "OS" }],
    [{ key: "platform", heading: "Platform type" }],
    [{ key: "old", heading: "First version" }],
    [{ key: "new", heading: "Last version" }],
    [{ key: "test", heading: "Review version" }],
  ] as const;

  return (
    <LabelContentTableSkeleton
      css={S.labelContent}
      className={className}
      variant="empty"
      info={VERSION_FORM_INFO}
    />
  );
};

export default VersionFormSkeleton;
