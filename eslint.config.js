import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
// NOTE: @typescript-eslint/eslint-recommended & @typescript-eslint/parser 가 flat config 방식에서는 tseslint 하나로 불러와서 사용
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    // NOTE: eslint 9.x.x 버전부터 "parserOptions" 관련 설정은 languageOptions에서 설정
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      parser: tseslint.Parser,
      sourceType: "module",
      // NOTE: eslint가 특정 전역 변수를 이미 정의된 상태로 인식하도록 하는 옵션 , document / console ... 등
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        google: "readonly",
        __SERVICE_NAME__: "readonly",
      },
    },
    plugins: { react: reactPlugin, "@typescript-eslint": tseslint.plugin },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "react/prop-types": "off",
      "import/prefer-default-export": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "no-case-declarations": "off", // NOTE: switch 문 안에서 let, const 사용 가능
      "import/no-unresolved": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error", // NOTE: typescript의 오버로딩을 인식 하는 redeclare 설정
      "@typescript-eslint/no-unused-expressions": "off", // NOTE: 프로그램 상태에 영향을 주지 않는 로직 error 처리 off - 단축 평가 사용 가능
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // NOTE: ?의 결과에 !를 사용했을 때 error 처리 off - 옵셔널 체이닝에 타입 단언 가능
      "@typescript-eslint/no-empty-object-type": "off", // NOTE: 부모 타입을 상속 받았을 때, 선언 필드가 없어 부모 필드와 타입이 같아졌을 때 error 처리 off - extends로 같은 타입을 여러 이름으로 사용 가능
      // LINK: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      // LINK: https://www.notion.so/coconutsilo/8af40217e1214684b0b6b6050aa2a7bf#c33aa7a858014a1d95a27295e06d7cc3
      "import/order": [
        "error",
        {
          groups: [
            "external",
            "internal",
            ["parent", "sibling", "index", "unknown"],
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@repo/**/*", group: "internal", position: "before" },
            { pattern: "~**", group: "internal", position: "before" },
            { pattern: "~**/**/*", group: "internal", position: "after" }, // NOTE: 예외 처리 때문에 추가
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: [],
          alphabetize: { order: "asc" },
        },
      ],
    },
    ignores: ["node_modules", "build-*", ".turbo"],
    settings: {
      react: {
        version: "detect", // NOTE: eslint-plugin-react에 리액트 버전을 알려주어야 하기 때문에 설정
      },
      // NOTE: eslint가 typescript 모듈을 인식하게 하기 위해서 필요
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["packages/typescript-config/base.json"],
        },
      },
    },
  },
);
