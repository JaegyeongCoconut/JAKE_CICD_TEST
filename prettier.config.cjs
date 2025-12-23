/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2, // DESC: 들여쓰기 폭을 2칸으로 설정하여 코드 가독성 유지.
  semi: true, // DESC: 명령문 끝에 세미콜론을 추가하여 명확성 유지.
  singleQuote: false, // DESC: 문자열에 큰따옴표를 사용하여 일관성 유지.
  bracketSpacing: true, // DESC: 객체 리터럴의 중괄호 안에 공백 추가로 가독성 향상.
  endOfLine: "auto", // DESC: 운영 체제에 따라 줄바꿈 방식 자동 설정.
  printWidth: 80, // DESC: 한 줄의 최대 길이를 80자로 제한하여 코드 가독성 유지.
  arrowParens: "always", // DESC: 화살표 함수의 매개변수에 항상 괄호를 추가하여 명확성 유지.
  trailingComma: "all", // DESC: 여러 줄로 나열된 항목에 항상 쉼표를 추가하여 Git diff 최소화.
  useTabs: false, // DESC: 탭 대신 공백을 사용하여 들여쓰기 일관성 유지.
  overrides: [
    {
      files: ["**/languageLabel.ts", "**/constants/error/*.ts"],
      options: { printWidth: 500 },
    },
    { files: "**/constants/toast.ts", options: { printWidth: 40 } },
    {
      files: [
        "**/assets/**/tableHeaderInfos.ts",
        "**/assets/**/labelContent.ts",
      ],
      options: { printWidth: 120 },
    },
  ],
};
