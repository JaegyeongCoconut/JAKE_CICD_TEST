interface CheckSearchValueExistProps {
  searchString: string | null;
  sourceString: string | null | undefined;
}

// NOTE: Input 검색어가 존재하는지 확인하는 함수
export const checkSearchValueExist = ({
  sourceString,
  searchString,
}: CheckSearchValueExistProps): boolean => {
  if (!sourceString) return false;

  if (!searchString) return true;

  // NOTE: 모든 공백 제거 + 소문자로 변환 + 양쪽 공백 제거
  const normalize = (value: string): string =>
    value.replace(/\s/g, "").toLocaleLowerCase().trim();

  const normalizedTarget = normalize(sourceString);
  const normalizedSearch = normalize(searchString);

  return normalizedTarget.includes(normalizedSearch);
};
