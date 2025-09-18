import type { ReactNode } from "react";
import { memo } from "react";

import { createPortal } from "react-dom";

interface PortalProps {
  container: string;
  mounted: boolean;
  children: ReactNode;
}

const Portal = ({ children, container, mounted }: PortalProps) => {
  if (mounted) {
    const portal = document.querySelector(container.replace(/[()]/g, "\\$&"));

    return portal ? createPortal(children, portal) : null;
  }

  return null;
};

export default memo(Portal);
