#!/bin/bash

source "$(dirname "${0}")/../helpers/fzf.sh"
source "$(dirname "${0}")/../helpers/validation.sh"

# NOTE: 검증 실행
checkFzfInstalled

# NOTE: 프로젝트 선택 (fzf 사용)
selectServiceLocal
selectEnv

# NOTE: 프로젝트 명령어 설정
BUILD_COMMAND=$([[ "$SELECTED_ENV" == "dev" ]] && echo "build" || echo "build-prod")
COMMAND=$([[ "$SELECTED_SERVICE" == "all" ]] && echo "$BUILD_COMMAND" || echo "$BUILD_COMMAND:$SELECTED_SERVICE")

# NOTE: 검증 실행
checkValidateInputs SELECTED_SERVICE SELECTED_ENV

# NOTE: 명령어 실행
npm_lifecycle_event="$COMMAND" node ./packages/scripts/build-scripts.js
