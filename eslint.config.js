import js from "@eslint/js"; // DESC: JavaScript 코드의 품질 관리와 일반적인 오류 방지.
import importPlugin from "eslint-plugin-import"; // DESC: 모듈 간 의존성 정리와 잘못된 경로 감지 관리.
import perfectionist from "eslint-plugin-perfectionist"; // DESC: 코드 정렬과 일관성 유지 관리.
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // DESC: 코드 스타일 충돌 방지와 자동 포맷 관리.
import reactPlugin from "eslint-plugin-react"; // DESC: React 컴포넌트의 오류 감지와 코드 품질 유지.
import unusedImportsPlugin from "eslint-plugin-unused-imports"; // DESC: 사용되지 않는 코드 제거와 빌드 크기 최적화 관리.
import globals from "globals"; // DESC: 다양한 환경에서 전역 변수 인식 관리.
import tseslint from "typescript-eslint"; // DESC: TypeScript 코드의 오류 감지와 타입 안전성 유지.

import propsOrder from "./eslint-perfectionist-order.js";

export default tseslint.config(
  // DESC: 기본 설정 관리.
  js.configs.recommended, // DESC: JavaScript 기본 규칙 추가와 오류 방지 관리.
  reactPlugin.configs.flat.recommended, // DESC: React 기본 규칙 추가와 컴포넌트 오류 방지 관리.
  eslintPluginPrettierRecommended, // DESC: Prettier와 ESLint 통합으로 코드 스타일 관리.
  importPlugin.flatConfigs.recommended, // DESC: import 관련 규칙 추가와 의존성 관리.
  ...tseslint.configs.recommended, // DESC: TypeScript 기본 규칙 추가와 타입 안전성 유지.

  {
    // DESC: 파일 패턴 관리. 특정 파일 확장자에만 규칙 적용과 불필요한 검사 방지.
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    // DESC: 언어 옵션 관리.
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions, // DESC: JSX 문법 지원과 React 컴포넌트 개발 관리.
      parser: tseslint.parser, // DESC: TypeScript 파서를 사용하여 정적 타입 검사 관리.
      sourceType: "module", // DESC: 최신 JavaScript 모듈 시스템 지원과 모듈화 관리.
      // DESC: eslint가 특정 전역 변수를 이미 정의된 상태로 인식하도록 하는 옵션 , document / console ... 등
      globals: {
        ...globals.browser, // DESC: 브라우저 전역 객체 인식과 오류 방지 관리.
        ...globals.es2021, // DESC: 최신 JavaScript 기능 사용과 오류 방지 관리.
        ...globals.node, // DESC: Node.js 전역 객체 인식과 서버 코드 오류 방지.
        google: "readonly", // DESC: Google API 전역 객체 인식과 오류 방지 관리.
      },
    },

    // DESC: 플러그인 관리.
    plugins: {
      react: reactPlugin, // DESC: React 컴포넌트 오류 감지와 코드 품질 유지.
      "@typescript-eslint": tseslint.plugin, // DESC: TypeScript 코드 오류 감지와 타입 안전성 유지.
      "unused-imports": unusedImportsPlugin, // DESC: 사용되지 않는 코드 제거와 빌드 크기 최적화.
      perfectionist, // DESC: 코드 정렬과 일관성 유지 관리.
    },

    // DESC: 규칙 관리
    rules: {
      // DESC: 일반 규칙
      ...js.configs.recommended.rules, // DESC: JavaScript 기본 규칙 추가와 오류 방지 관리.

      // DESC: Prettier 관련 규칙
      "prettier/prettier": "error", // DESC: Prettier 규칙 강제와 코드 스타일 관리.

      // DESC: React 관련 규칙
      "react/prop-types": "off", // DESC: TypeScript를 사용하여 PropTypes 대신 정적 타입 검사 관리.
      "react/no-unescaped-entities": "off", // DESC: JSX에서 HTML 엔터티 유연성 관리.

      // DESC: TypeScript 관련 규칙
      "@typescript-eslint/no-unused-vars": "warn", // DESC: 사용되지 않는 변수 경고와 코드 품질 유지.
      "@typescript-eslint/no-explicit-any": "warn", // DESC: any 타입 최소화와 타입 안전성 유지.
      "@typescript-eslint/no-redeclare": "error", // DESC: 변수 중복 선언 방지와 코드 명확성 유지.
      "@typescript-eslint/no-unused-expressions": "off", // DESC: 단축 평가 허용과 표현식 유연성 관리.
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // DESC: 옵셔널 체이닝에서 ! 사용 허용과 유연성 관리.
      "@typescript-eslint/no-empty-object-type": "off", // DESC: 빈 객체 타입 허용과 상속 구조 관리.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: true, // DESC: 타입 주석 제한과 코드 스타일 일관성 유지.
          fixStyle: "separate-type-imports", // DESC: 타입 import 분리와 코드 명확성 유지.
          prefer: "type-imports", // DESC: 타입 import 선호와 코드 스타일 일관성 유지.
        },
      ],
      "@typescript-eslint/typedef": ["error", { variableDeclaration: false }], // DESC: 일반 변수 선언에 타입 명시를 강제하지 않음(false)
      // DESC: 단, 특정 변수에 타입 명시 강제와 코드 명확성 유지. 즉, 특정 이름을 가진 변수는 타입을 반드시 명시하도록 설정, 즉 typedef 규칙 강제 설정(true)
      "no-restricted-syntax": [
        "error",
        {
          selector: [
            "VariableDeclarator[id.name='req']:not(:has(TSTypeAnnotation))",
            "VariableDeclarator[id.name='tableRender']:not(:has(TSTypeAnnotation))",
            "VariableDeclarator[id.name=/INIT_FORM/]:not(:has(TSTypeAnnotation))",
          ].join(","),
          message: "해당 변수는 반드시 타입을 명시해야 합니다!",
        },
      ],

      // DESC: import 관련 규칙
      "import/prefer-default-export": "off", // DESC: 다양한 내보내기 방식 허용과 유연성 관리.
      "import/no-unresolved": "off", // DESC: 프로젝트 구조에 따른 import 경로 유연성 관리.
      "import/order": [
        "error",
        {
          groups: [
            "external", // DESC: 외부 모듈 관리.
            "internal", // DESC: 내부 모듈 관리.
            ["parent", "sibling", "index", "unknown"], // DESC: 상대 경로 모듈 관리.
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" }, // DESC: React 외부 모듈 관리.
            { pattern: "@repo/**/*", group: "internal", position: "before" }, // DESC: 내부 모듈 관리.
            {
              pattern: "@packages/**/*",
              group: "internal",
              position: "before",
            }, // DESC: test 내부 packages(@repo) 모듈 관리.
            { pattern: "@tests/**/*", group: "internal", position: "before" }, // DESC: test 관련 내부 모듈 관리.
            { pattern: "~**", group: "internal", position: "before" },
            { pattern: "~**/**/*", group: "internal", position: "after" },
          ],
          "newlines-between": "always", // DESC: import 간 줄바꿈 추가와 가독성 관리.
          pathGroupsExcludedImportTypes: [], // DESC: pathGroups에서 제외할 import 타입을 정의. 기본적으로 빈 배열로 설정되어 모든 타입 포함.
          alphabetize: { order: "asc" }, // DESC: import 알파벳 순서 정렬과 일관성 유지.
        },
      ],

      // DESC: 기타 규칙
      "arrow-body-style": "off", // DESC: 화살표 함수 본문 스타일 유연성 관리.
      "prefer-arrow-callback": "off", // DESC: 기존 함수 표현식 허용과 코드 작성 유연성 관리.
      "no-unused-vars": "off", // DESC: TypeScript 정적 타입 검사로 중복 검사 방지.
      "no-case-declarations": "off", // DESC: switch 문에서 블록 스코프 변수 유연성 관리.
      "no-redeclare": "off", // DESC: TypeScript 정적 타입 검사로 중복 검사 방지.
      "unused-imports/no-unused-imports": "error", // DESC: 사용되지 않는 import 제거와 코드베이스 정리.

      // DESC: Perfectionist 관련 규칙
      "perfectionist/sort-interfaces": ["error", propsOrder], // DESC: 인터페이스 정렬과 코드 일관성 유지.
      "perfectionist/sort-jsx-props": ["error", propsOrder], // DESC: JSX 속성 정렬과 코드 일관성 유지.
      "perfectionist/sort-object-types": ["error", propsOrder], // DESC: 객체 타입 정렬과 코드 일관성 유지.
    },

    // DESC: 검사에서 제외할 파일 및 폴더를 정의. 불필요한 파일 검사 제외와 ESLint 성능 최적화.
    ignores: ["node_modules", "build-*", ".turbo"],

    // DESC: ESLint 플러그인 및 모듈 해석 설정을 정의.
    settings: {
      react: {
        version: "detect", // DESC: eslint-plugin-react에 리액트 버전을 알려주어야 하기 때문에 설정
      },
      // DESC: eslint가 typescript 모듈을 인식하게 하기 위해서 필요
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true, // DESC: 타입 정의 파일 우선 확인과 모듈 해석 정확성 관리.
          project: ["packages/typescript-config/base.json"], // DESC: TypeScript 설정 파일 경로 지정과 모듈 해석 규칙 유지.
        },
      },
    },
  },
);
