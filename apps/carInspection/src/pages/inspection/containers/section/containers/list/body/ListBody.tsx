import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { renderCommaUnit, renderDefault } from "@repo/utils/render";

import { DashboardIcon, TransmissionIcon } from "~assets";
import { LANGUAGE_LABEL, PATH } from "~constants";
import { useServiceTranslation } from "~hooks";
import type { GetInspectionsClientModel } from "~types";

import * as S from "./ListBody.styled";

interface ListBodyProps {
  data:
    | NonNullable<NonNullable<GetInspectionsClientModel>["inspections"]>[number]
    | undefined;
}

const ListBody = React.forwardRef<HTMLAnchorElement, ListBodyProps>(
  ({ data }, ref) => {
    const { i18n } = useTranslation();

    const { defaultLanguage } = useServiceTranslation();

    return (
      <Link
        css={S.link}
        ref={ref}
        to={`${data?.id}/${PATH.UPDATE}/${PATH.DEFAULT_INFO}`}
      >
        <S.IdentificationNo>
          <p>
            {defaultLanguage({ text: LANGUAGE_LABEL.FRAME_NUMBER })}.{" "}
            {data?.usedCarStock?.frameNo ?? "-"}
          </p>
          <p>
            {defaultLanguage({ text: LANGUAGE_LABEL.ENGINE_NUMBER })}.{" "}
            {data?.usedCarStock?.engineNo ?? "-"}
          </p>
        </S.IdentificationNo>
        <S.ModelInfoWrapper>
          <S.ItemSpanWrapper>
            <S.ItemSpan>{data?.usedCarStock?.maker?.name ?? "-"}</S.ItemSpan>
            <span>·</span>
            <S.ItemSpan>{data?.usedCarStock?.model ?? "-"}</S.ItemSpan>
            <span>·</span>
            <S.ItemSpan>{data?.usedCarStock?.carType?.name ?? "-"}</S.ItemSpan>
            <span>·</span>
            <S.ItemSpan>{data?.usedCarStock?.year ?? "-"}</S.ItemSpan>
          </S.ItemSpanWrapper>
          <S.IconWrapper>
            <S.IconContainer>
              <S.Circle
                color={`${data?.usedCarStock?.color?.colorGroup?.hexcodes?.[0]}`.replace(
                  "#",
                  "",
                )}
              />
              {renderDefault(
                i18n.language === "lo"
                  ? data?.usedCarStock?.color?.colorGroup?.nameLo
                  : data?.usedCarStock?.color?.colorGroup?.nameEn,
              )}
            </S.IconContainer>
            <S.IconContainer>
              <TransmissionIcon css={S.icon} />
              {renderDefault(data?.usedCarStock?.transmission?.name)}
            </S.IconContainer>
            <S.IconContainer>
              <DashboardIcon css={S.icon} />
              {renderCommaUnit({
                value: data?.usedCarStock?.mileage ?? 0,
                unit: "km",
              })}
            </S.IconContainer>
          </S.IconWrapper>
        </S.ModelInfoWrapper>
      </Link>
    );
  },
);

ListBody.displayName = "ListBody";
export default ListBody;
