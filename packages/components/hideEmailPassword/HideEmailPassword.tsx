import React from "react";

import * as S from "./HideEmailPassword.styled";

const HideEmailPassword = () => {
  return (
    <>
      <S.AbsoluteInput
        id="email_randomString"
        name="user_email_randomString"
        tabIndex={-1}
        type="email"
      />
      <S.AbsoluteInput tabIndex={-1} type="password" />
    </>
  );
};

export default HideEmailPassword;
