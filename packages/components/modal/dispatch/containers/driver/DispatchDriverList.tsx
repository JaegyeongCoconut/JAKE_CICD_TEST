import React from "react";

import { ReactComponent as CallIcon } from "@repo/assets/icon/ic_call.svg";
import { ReactComponent as CheckCircleIcon } from "@repo/assets/icon/ic_check_circle.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { DispatchDriver } from "@repo/types";
import { formatFullName } from "@repo/utils/formatter/name";
import { renderFullName, renderPhone } from "@repo/utils/render";
import { checkSearchValueExist } from "@repo/utils/searchFilter";

import * as S from "./DispatchDriverList.styled";
import StateSearchInput from "../../../../input/search/state/StateSearchInput";
import NoResult from "../../../../noResult/NoResult";

interface DispatchDriverListProps {
  driverList: DispatchDriver[];
  searchedDriver: string | null;
  selectedDriverId: string | null;
  handleDriverIdSelect: (driverId: string | undefined) => () => void;
  handleDriverSearch: (driverName: string) => void;
}

const DispatchDriverList = ({
  driverList,
  searchedDriver,
  selectedDriverId,
  handleDriverSearch,
  handleDriverIdSelect,
}: DispatchDriverListProps) => {
  const filteredDrivers = driverList?.filter((driver) =>
    checkSearchValueExist({
      sourceString: formatFullName({
        firstName: driver?.firstName,
        lastName: driver?.lastName,
      }),
      searchString: searchedDriver,
    }),
  );

  return (
    <S.SearchWrapper>
      <S.SearchHeader>
        <StateSearchInput
          css={S.searchInput}
          accessibleInputType={undefined}
          maxLength={100} // TODO: 임시 값 설정, 확인 필요
          placeholder={LANGUAGE_LABEL.SEARCH_DRIVER_NAME}
          handleReset={() => {}}
          handleUpdate={handleDriverSearch}
        />
      </S.SearchHeader>
      <S.SearchBody>
        {!filteredDrivers?.length ? (
          <NoResult
            css={S.noResult}
            contents={[LANGUAGE_LABEL.NO_RESULTS_FOUND]}
            type="search"
          />
        ) : (
          <S.Ul>
            {filteredDrivers.map((driver, i) => (
              <S.Li key={driver?.id ?? i}>
                <S.CardButton
                  type="button"
                  onClick={handleDriverIdSelect(driver?.id)}
                >
                  <S.CardInfoWrapper>
                    {renderFullName({
                      firstName: driver?.firstName,
                      lastName: driver?.lastName,
                    })}
                    <S.CardDetailInfoWrapper>
                      <CallIcon css={S.cardDetailInfoIcon} />
                      {renderPhone({
                        countryDial: driver?.countryCode,
                        mobile: driver?.phone,
                      })}
                    </S.CardDetailInfoWrapper>
                  </S.CardInfoWrapper>
                  <CheckCircleIcon
                    css={S.successIcon(selectedDriverId === driver?.id)}
                  />
                </S.CardButton>
              </S.Li>
            ))}
          </S.Ul>
        )}
      </S.SearchBody>
    </S.SearchWrapper>
  );
};

export default DispatchDriverList;
