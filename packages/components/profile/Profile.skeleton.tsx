import React from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./Profile.styled";

const ProfileSkeleton = () => {
  return (
    <S.Profile>
      <Skeleton width="56px" height="56px" borderRadius="30px" />
    </S.Profile>
  );
};

export default ProfileSkeleton;
