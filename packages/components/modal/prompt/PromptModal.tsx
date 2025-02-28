import React from "react";

import ConfirmModal from "../confirm/ConfirmModal";

interface PromptModalProps {
  callbackFn: () => void;
}
const PromptModal = React.forwardRef<HTMLDialogElement, PromptModalProps>(
  ({ callbackFn }, ref) => {
    return (
      <ConfirmModal
        ref={ref}
        isLoading={false}
        title="Leave this page?"
        desc="Changes you made may not be saved."
        closeButtonName="Close"
        activeButtonName="Leave"
        activeFn={callbackFn}
        buttonType="alert"
      />
    );
  },
);

PromptModal.displayName = "PromptModal";

export default PromptModal;
