import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DetailModal.styled";
import Button from "../../button/Button";
import DisabledButton from "../../button/disabled/DisabledButton";
import BaseModal from "../base/BaseModal";

interface DetailModalBaseProps {
  className?: string;
  description: Languages | undefined;
  title: Languages;
  handleClose: () => void;
  children?: React.ReactNode;
}

type DetailModalPositiveButtonProps =
  | {
      isPositiveDisabled: true;
      isPositiveLoading?: never;
      positiveButtonName: Languages;
      handlePositiveButtonClick?: never;
    }
  | {
      isPositiveDisabled: boolean;
      isPositiveLoading: boolean;
      positiveButtonName: Languages;
      handlePositiveButtonClick: () => void;
    }
  | {
      isPositiveDisabled?: never;
      isPositiveLoading?: never;
      positiveButtonName?: never;
      handlePositiveButtonClick?: never;
    };

type DetailModalNegativeButtonProps =
  | {
      isNegativeDisabled: true;
      negativeButtonName: Languages;
      handleNegativeButtonClick?: never;
    }
  | {
      isNegativeDisabled: boolean;
      negativeButtonName: Languages;
      handleNegativeButtonClick: (e: React.MouseEvent) => void;
    }
  | {
      isNegativeDisabled?: never;
      negativeButtonName?: never;
      handleNegativeButtonClick?: never;
    };

const DetailModal = React.forwardRef<
  HTMLDialogElement,
  DetailModalBaseProps &
    DetailModalPositiveButtonProps &
    DetailModalNegativeButtonProps
>(
  (
    {
      className,
      children,
      isPositiveLoading,
      isPositiveDisabled,
      isNegativeDisabled,
      negativeButtonName,
      positiveButtonName,
      title,
      description,
      handleClose,
      handleNegativeButtonClick,
      handlePositiveButtonClick,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();

    return (
      <BaseModal css={S.baseModal} className={className} ref={ref}>
        <S.DetailHeader>
          <S.Title>{defaultLanguage({ text: title })}</S.Title>
          {description && (
            <S.DetailDescription>
              {defaultLanguage({ text: description })}
            </S.DetailDescription>
          )}
        </S.DetailHeader>
        <S.DetailContent>{children}</S.DetailContent>
        <S.DetailInfoFooter>
          <Button
            variant="secondary"
            disabled={false}
            isLoading={false}
            label={LANGUAGE_LABEL.CLOSE}
            handleButtonClick={handleClose}
          />
          {(negativeButtonName || positiveButtonName) && (
            <div>
              {negativeButtonName &&
                (isNegativeDisabled ? (
                  <DisabledButton variant="error" label={negativeButtonName} />
                ) : (
                  <Button
                    variant="error"
                    disabled={isNegativeDisabled}
                    isLoading={false}
                    label={negativeButtonName}
                    handleButtonClick={handleNegativeButtonClick}
                  />
                ))}
              {positiveButtonName &&
                (isPositiveDisabled ? (
                  <DisabledButton
                    variant="primary"
                    label={positiveButtonName}
                  />
                ) : (
                  <Button
                    variant="primary"
                    disabled={isPositiveDisabled}
                    isLoading={isPositiveLoading}
                    label={positiveButtonName}
                    type="button"
                    handleButtonClick={handlePositiveButtonClick}
                  />
                ))}
            </div>
          )}
        </S.DetailInfoFooter>
      </BaseModal>
    );
  },
);

DetailModal.displayName = "DetailModal";

export default DetailModal;
