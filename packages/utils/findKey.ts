export const findKeyOfPair = <
  K extends { [key: string | number]: T },
  T extends string,
>(
  pair: K,
  value: T,
): keyof K | undefined => {
  const findKey = Object.keys(pair).find((key) => pair[key] === value);

  return findKey ? (+findKey as keyof K) : undefined;
};

//NOTE: 사용하는 곳에서 value -> key로 돌릴 떄(pair와 key가 1:1 매칭이 되지 않으면) 타입에러 / 반환값 undefined로 인한 타입 오류 발생하여 추가 제작 -> 각 프로젝트에서 사용중인 건 확인 후 findKeyOfPair2 -> findKeyOfPair로 변경 필요
export const findKeyOfPair2 = <
  K extends { [key: number]: string },
  T extends K[keyof K],
>(
  pair: K,
  value: T,
): keyof K => {
  if (!Object.keys(pair).every((key) => !isNaN(+key))) {
    throw new Error("The pair object must have numeric keys only.");
  }

  const findKey = Object.keys(pair).filter(
    (key) => pair[key as keyof typeof pair] === value,
  );

  return +findKey[0] as keyof K;
};
