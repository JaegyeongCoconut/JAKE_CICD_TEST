import React from "react";

import * as S from "./HideEmailPassword.styled";

const HideEmailPassword = () => {
  return (
    <>
      <S.AbsoluteInput
        type="email"
        name="user_email_randomString"
        id="email_randomString"
        tabIndex={-1}
      />
      <S.AbsoluteInput type="password" tabIndex={-1} />
    </>
  );
};

export default HideEmailPassword;
