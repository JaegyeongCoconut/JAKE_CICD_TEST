import React from "react";

import * as S from "./BaseModal.styled";

interface BaseModalProps {
  className?: string;
  children?: React.ReactNode;
}

const BaseModal = React.forwardRef<HTMLDialogElement, BaseModalProps>(
  ({ className, children }, ref) => {
    return (
      <S.BaseModal
        ref={ref}
        className={className}
        aria-haspopup="true"
        aria-labelledby="modal"
        aria-modal="true"
        tabIndex={0}
      >
        {children}
      </S.BaseModal>
    );
  },
);

BaseModal.displayName = "BaseModal";

export default BaseModal;
