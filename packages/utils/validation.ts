/* eslint-disable no-useless-escape */

export const checkEmailValidation = (email: string): boolean => {
  // LINK: https://www.notion.so/coconutsilo/Email-2da7df0e1930497ba4f2eb83c8b5059f?pvs=4
  const checkEmail = /^[\w\.-]+@[\w-]+(\.\w{2,4}){1,2}$/;

  const [id, domain] = email.split(/[.@]/);

  if (id?.length >= 64 || domain?.length >= 63) return false;

  return checkEmail.test(email);
};

export const checkPasswordLength = (v: string): boolean => {
  const minCheck = v.length >= 8;
  const maxCheck = v.length <= 20;

  return minCheck && maxCheck;
};

export const checkPasswordType = (value: string): boolean => {
  const checkNumber = /(?=.*[0-9])/; // NOTE: 숫자 체크
  const checkBigLetter = /(?=.*[A-Z])/; // NOTE: 대문자 체크
  const checkSmallLetter = /(?=.*[a-z])/; // NOTE: 소문자 체크
  const checkSpecial = /(?=.*[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])/; // NOTE: 특수 문자 체크

  const typeChecker = {
    isNumber: false,
    isBigLetter: false,
    isSmallLetter: false,
    isSpecial: false,
  };

  typeChecker.isNumber = checkNumber.test(value);
  typeChecker.isBigLetter = checkBigLetter.test(value);
  typeChecker.isSmallLetter = checkSmallLetter.test(value);
  typeChecker.isSpecial = checkSpecial.test(value);

  return Object.values(typeChecker).filter((item) => item).length > 1;
};

export const checkVersion = (value: string): boolean => {
  const regex = /^(\d+\.)(\d+\.)(\d+)$/;

  return regex.test(value);
};

export const checkUrl = (value: string): boolean => {
  const regex = /^(https?|kkmove|kkcar):\/\/([\S]{1,})/i;

  return regex.test(value);
};

export const checkColorHexCode = (value: string): boolean => {
  const regex = /([^a-fA-F0-9])/gim;

  return regex.test(value);
};

export const checkValidCarOption = (value: string): boolean => {
  const regex =
    /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/\?~`\s]*$/;

  return regex.test(value);
};
