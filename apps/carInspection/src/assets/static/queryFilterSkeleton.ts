import type { QueryFilterRowSkeletonType } from "@repo/types";

import { LANGUAGE_LABEL } from "~constants";

export const QUERY_FILTER_SKELETON_ROWS = {
  inspection: [
    {
      partition: 2,
      controls: [
        { hasRadio: false, label: LANGUAGE_LABEL.BRAND },
        { hasRadio: false, label: LANGUAGE_LABEL.FRAME_NUMBER },
      ],
    },
    {
      partition: 2,
      controls: [
        { hasRadio: false, label: LANGUAGE_LABEL.MODEL },
        { hasRadio: false, label: LANGUAGE_LABEL.ENGINE_NUMBER },
      ],
    },
  ],
} satisfies Record<string, QueryFilterRowSkeletonType[]>;
