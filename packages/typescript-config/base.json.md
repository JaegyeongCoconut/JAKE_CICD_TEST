# base.json 설정 설명

이 문서는 `base.json` 파일의 각 설정에 대한 설명을 제공함.

## $schema

- **역할**: tsconfig 파일의 JSON 스키마를 정의하여 유효성 검사와 자동 완성을 지원함.

## compilerOptions

- **target**: 컴파일된 JavaScript 코드의 대상 ECMAScript 버전을 설정함.
- **lib**: DOM 및 최신 JavaScript 기능을 지원하기 위해 사용할 라이브러리를 정의함.
- **allowJs**: JavaScript 파일을 TypeScript 프로젝트에 포함할 수 있도록 허용함.
- **skipLibCheck**: 라이브러리 파일의 타입 검사를 생략하여 컴파일 속도를 최적화함.
- **strictNullChecks**: null 및 undefined에 대한 엄격한 타입 검사를 활성화함.
- **esModuleInterop**: CommonJS 모듈과 ES 모듈 간의 호환성을 지원함.
- **allowSyntheticDefaultImports**: 기본 내보내기가 없는 모듈에서 기본 import를 허용함.
- **strict**: 엄격한 타입 검사 옵션을 모두 활성화함.
- **forceConsistentCasingInFileNames**: 파일 이름의 대소문자 일관성을 강제함.
- **noFallthroughCasesInSwitch**: switch 문에서 case 누락을 방지함.
- **module**: 최신 ES 모듈 시스템을 사용함.
- **moduleResolution**: 번들러 기반의 모듈 해석 방식을 사용함.
- **resolveJsonModule**: JSON 파일 import를 허용함.
- **isolatedModules**: 각 파일을 독립적인 모듈로 처리함.
- **noEmit**: 컴파일된 파일을 생성하지 않음.
- **experimentalDecorators**: 데코레이터 문법을 지원함.
- **jsx**: React JSX 변환 방식을 설정함.
- **jsxImportSource**: Emotion 라이브러리를 JSX 변환에 사용함.
- **plugins**: Typia 변환 플러그인을 사용함.

## exclude

- **node_modules**: 종속성 폴더를 제외하여 불필요한 검사를 방지함.
- **build-\***: 빌드 산출물을 제외하여 검사 시간을 단축함.
- **public**: 퍼블릭 폴더를 제외하여 불필요한 검사를 방지함.
- **scripts**: 스크립트 폴더를 제외하여 검사 범위를 축소함.
- **.config.js/.config.mjs/.config.ts**: 설정 파일을 제외하여 불필요한 검사를 방지함.
