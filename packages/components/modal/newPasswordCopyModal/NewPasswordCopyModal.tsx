import React from "react";

import CopyButton from "@repo/components/button/copy";
import LabelContentTable from "@repo/components/label/table";
import DetailModal from "@repo/components/modal/detail";
import { renderDefault } from "@repo/utils/render";

import * as S from "./NewPasswordCopyModal.styled";
import { LANGUAGE_LABEL } from "../../../constants/languageLabel";

interface NewPasswordCopyModalProps {
  newPassword: string | undefined;
  handleClose: () => void;
}

const NewPasswordCopyModal = React.forwardRef<
  HTMLDialogElement,
  NewPasswordCopyModalProps
>(({ newPassword, handleClose }, ref) => {
  return (
    <DetailModal
      css={S.detailModal}
      ref={ref}
      isPosLoading={false}
      title={LANGUAGE_LABEL.PASSWORD_HAS_BEEN_RESET}
      handleClose={handleClose}
    >
      <LabelContentTable variant="bg" marginBottom={20}>
        <LabelContentTable.Row>
          <LabelContentTable.Content label={LANGUAGE_LABEL.NEW_PASSWORD}>
            <S.Content>
              {renderDefault(newPassword)}
              <CopyButton
                css={S.copyButton}
                copyText={newPassword || ""}
                serviceType="password"
              />
            </S.Content>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </LabelContentTable>
    </DetailModal>
  );
});

NewPasswordCopyModal.displayName = "NewPasswordCopyModal";
export default NewPasswordCopyModal;
