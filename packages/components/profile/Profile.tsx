import type { SyntheticEvent } from "react";
import React, { useState } from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./Profile.styled";
import NoProfileImg, { ReactComponent as NoProfileIcon } from "./noProfile.svg";
import HeadlessImage from "../image/HeadlessImage";

interface ProfileProps {
  isPresignedLoading: boolean;
  imgSrc?: string | null;
}

const Profile = ({ isPresignedLoading, imgSrc }: ProfileProps) => {
  const [isImageLoad, setIsImageLoad] = useState(true);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
    const img = e.target as HTMLImageElement;
    img.src = NoProfileImg;
  };

  const handleImageLoad = (): void => {
    setIsImageLoad(false);
  };

  return (
    <S.Profile>
      {isPresignedLoading && <Skeleton css={S.skeleton} />}
      {imgSrc ? (
        <>
          {isImageLoad && <Skeleton css={S.skeleton} />}
          <HeadlessImage
            css={S.image(isImageLoad)}
            alt="Profile Image"
            src={imgSrc}
            handleImageError={handleImageError}
            handleImageLoad={handleImageLoad}
          />
        </>
      ) : (
        <NoProfileIcon css={S.clientIcon(isPresignedLoading)} />
      )}
    </S.Profile>
  );
};

export default Profile;
