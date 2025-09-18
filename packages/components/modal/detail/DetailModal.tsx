import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useModal from "@repo/hooks/modal/useModal";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DetailModal.styled";
import Button from "../../button/Button";
import BaseModal from "../base/BaseModal";

interface DetailModalProps {
  className?: string;
  isNegDisabled?: boolean;
  isPosDisabled?: boolean;
  isPosLoading: boolean;
  desc?: Languages;
  negButtonName?: Languages;
  posButtonName?: Languages;
  posFnType?: "submit" | "button";
  title: Languages;
  handleClose?: () => void;
  handleNegButtonClick?: (e: React.MouseEvent) => void;
  handlePosButtonClick?: () => void;
  children: React.ReactNode;
}

const DetailModal = React.forwardRef<HTMLDialogElement, DetailModalProps>(
  (
    {
      className,
      children,
      isPosLoading,
      isPosDisabled,
      isNegDisabled,
      negButtonName,
      posButtonName,
      title,
      desc,
      posFnType = "button",
      handleClose,
      handleNegButtonClick,
      handlePosButtonClick,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();
    const { handleModalClose } = useModal();

    return (
      <BaseModal css={S.baseModal} className={className} ref={ref}>
        <S.DetailHeader>
          <S.Title>{defaultLanguage(title)}</S.Title>
          {desc && <S.DetailDesc>{defaultLanguage(desc)}</S.DetailDesc>}
        </S.DetailHeader>
        <S.DetailContent>{children}</S.DetailContent>
        <S.DetailInfoFooter>
          <Button
            variant="secondary"
            // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
            disabled={false}
            // NOTE: Button의 isLoading이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
            isLoading={false}
            label={LANGUAGE_LABEL.CLOSE}
            handleButtonClick={handleClose ?? handleModalClose}
          />
          <div>
            {negButtonName && (
              <Button
                variant="error"
                // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                disabled={isNegDisabled || false}
                // NOTE: Button의 isLoading이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                isLoading={false}
                label={negButtonName}
                handleButtonClick={handleNegButtonClick || (() => {})}
              />
            )}
            {posButtonName && (
              <Button
                variant="primary"
                // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                disabled={isPosDisabled || false}
                isLoading={isPosLoading}
                label={posButtonName}
                type={posFnType}
                handleButtonClick={handlePosButtonClick || (() => {})}
              />
            )}
          </div>
        </S.DetailInfoFooter>
      </BaseModal>
    );
  },
);

DetailModal.displayName = "DetailModal";

export default DetailModal;
