import React from "react";

import { ReactComponent as CheckCircleIcon } from "@repo/assets/icon/ic_check_circle.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { DispatchVehicle } from "@repo/types";
import { renderDefault } from "@repo/utils/render";
import { checkSearchValueExist } from "@repo/utils/searchFilter";

import * as S from "./DispatchVehicleList.styled";
import StateSearchInput from "../../../../input/search/state/StateSearchInput";
import NoResult from "../../../../noResult/NoResult";

interface DispatchVehicleListProps {
  searchedVehicle: string | null;
  selectedVehicleId: string | null;
  vehicleList: DispatchVehicle[];
  handleVehicleIdSelect: (vehicleId: string | undefined) => () => void;
  handleVehicleSearch: (searchedPlateNumber: string) => void;
}

const DispatchVehicleList = ({
  vehicleList,
  searchedVehicle,
  selectedVehicleId,
  handleVehicleSearch,
  handleVehicleIdSelect,
}: DispatchVehicleListProps) => {
  const filteredVehicles = vehicleList?.filter((vehicle) =>
    checkSearchValueExist({
      sourceString: vehicle?.plateNo ?? null,
      searchString: searchedVehicle,
    }),
  );

  return (
    <S.SearchWrapper>
      <S.SearchHeader>
        <StateSearchInput
          css={S.searchInput}
          accessibleInputType={undefined}
          maxLength={100} // TODO: 임시 값 설정, 확인 필요
          placeholder={LANGUAGE_LABEL.SEARCH_BY_PLATE_NUMBER}
          handleReset={() => {}}
          handleUpdate={handleVehicleSearch}
        />
      </S.SearchHeader>
      <S.SearchBody>
        {!filteredVehicles?.length ? (
          <NoResult
            css={S.noResult}
            contents={[LANGUAGE_LABEL.NO_RESULTS_FOUND]}
            type="search"
          />
        ) : (
          <S.Ul>
            {filteredVehicles.map((vehicle, i) => (
              <S.Li key={vehicle?.id ?? i}>
                <S.CardButton
                  type="button"
                  onClick={handleVehicleIdSelect(vehicle?.id)}
                >
                  <S.CardInfoWrapper>
                    {renderDefault(vehicle?.plateNo)}
                    <S.CardDetailInfoWrapper>
                      {vehicle?.icon && (
                        <vehicle.icon css={S.cardDetailInfoIcon} />
                      )}
                      {renderDefault(vehicle?.content)}
                    </S.CardDetailInfoWrapper>
                  </S.CardInfoWrapper>
                  <CheckCircleIcon
                    css={S.successIcon(selectedVehicleId === vehicle?.id)}
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

export default DispatchVehicleList;
