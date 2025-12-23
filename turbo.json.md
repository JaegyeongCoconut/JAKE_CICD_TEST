# turbo.json 설정 설명

이 문서는 `turbo.json` 파일의 각 설정에 대한 설명을 제공합니다.

## $schema

- **역할**: TurboRepo 설정 파일의 JSON 스키마를 정의하여 유효성 검사와 자동 완성을 지원함.

## tasks

### check-types

- **설명**: 타입 검사를 수행하며, 상위 작업(`^check-types`)에 의존함.

### build

- **outputs**: `build-dev-*` 패턴에 해당하는 빌드 산출물을 생성함.
- **inputs**: 기본 입력(`$TURBO_DEFAULT$`)과 `.env.development` 파일을 사용함.
- **dependsOn**: 상위 작업(`^build`)에 의존함.

### build-prod

- **outputs**: `build-prod-*` 패턴에 해당하는 빌드 산출물을 생성함.
- **inputs**: 기본 입력(`$TURBO_DEFAULT$`)과 `.env.production` 파일을 사용함.
- **dependsOn**: 상위 작업(`^build`)에 의존함.

### dev

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.

### dev-mock

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.

### dev-prod

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.

### dev-typia

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.

### dev-mock-typia

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.

### dev-prod-typia

- **persistent**: 작업이 지속적으로 실행됨.
- **cache**: 캐싱을 비활성화함.
- **dependsOn**: 상위 작업(`^check-types`)에 의존함.
