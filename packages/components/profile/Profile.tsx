import React, { SyntheticEvent, useState } from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./Profile.styled";
import NoProfileImg, { ReactComponent as NoProfileIcon } from "./noProfile.svg";

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
          <S.ProfilImg
            isLoading={isImageLoad}
            src={imgSrc}
            alt="Profile Image"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </>
      ) : (
        <NoProfileIcon css={S.clientIcon(isPresignedLoading)} />
      )}
    </S.Profile>
  );
};

export default Profile;
