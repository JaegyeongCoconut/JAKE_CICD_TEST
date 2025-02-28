import React from "react";

import { Link } from "react-router-dom";

import useModal from "@repo/hooks/modal/useModal";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DetailModal.styled";
import Button from "../../button/Button";
import BaseModal from "../base/BaseModal";

interface DetailModalProps {
  className?: string;
  children: React.ReactNode;
  posFnType?: "submit" | "button";
  isButtonFloat?: boolean;
  isPosLoading: boolean;
  isPosDisabled?: boolean;
  isNegDisabled?: boolean;
  closeButtonName?: Languages;
  negButtonVariant?: "third" | "error";
  negButtonName?: Languages;
  posButtonName?: Languages;
  gotoNextLink?: string;
  desc?: Languages;
  path?: string;
  title: Languages;
  closeFn?: () => void;
  linkFn?: () => void;
  negFn?: (e: React.MouseEvent) => void;
  posFn?: () => void;
}

const DetailModal = React.forwardRef<HTMLDialogElement, DetailModalProps>(
  (
    {
      className,
      children,
      isButtonFloat,
      isPosLoading,
      isPosDisabled,
      isNegDisabled,
      closeButtonName = "Close",
      negButtonVariant = "error",
      negButtonName,
      posButtonName,
      gotoNextLink,
      path,
      title,
      desc,
      posFnType = "button",
      closeFn,
      negFn,
      posFn,
      linkFn,
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
        <S.DetailInfoFooter isButtonFloat={isButtonFloat}>
          {closeButtonName && (
            <Button
              variant="secondary"
              // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
              disabled={false}
              // NOTE: Button의 isLoading이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
              isLoading={false}
              label={closeButtonName}
              handleButtonClick={closeFn ?? handleModalClose}
            />
          )}
          <div>
            {negButtonName && (
              <Button
                // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                disabled={isNegDisabled || false}
                // NOTE: Button의 isLoading이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                isLoading={false}
                variant={negButtonVariant}
                label={negButtonName}
                handleButtonClick={negFn || (() => {})}
              />
            )}
            {posButtonName && (
              <Button
                isLoading={isPosLoading}
                // NOTE: Button의 disabled이 필수로 변경됨에 따라 임시로 false, 테스트 후 필요하면 값 변경 필요
                disabled={isPosDisabled || false}
                type={posFnType}
                variant="primary"
                label={posButtonName}
                handleButtonClick={posFn || (() => {})}
              />
            )}
            {gotoNextLink && (
              <Link
                css={S.detailInfoGoNextLink}
                to={path as string}
                onClick={linkFn}
              >
                {defaultLanguage(gotoNextLink as Languages)}
              </Link>
            )}
          </div>
        </S.DetailInfoFooter>
      </BaseModal>
    );
  },
);

DetailModal.displayName = "DetailModal";

export default DetailModal;
