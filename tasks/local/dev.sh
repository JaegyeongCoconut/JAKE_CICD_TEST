#!/bin/bash

source "$(dirname "${0}")/../helpers/fzf.sh"
source "$(dirname "${0}")/../helpers/validation.sh"

VALID_LOCAL_DEV_MODES() {
  case $1 in
  all)            echo "dev" "dev-i18n" "dev-prod" ;;
  carAdmin)       echo "dev" "dev-i18n" "dev-prod" ;;
  carInspection)  echo "dev" "dev-i18n" "dev-prod" ;;
  delivery)       echo "dev" "dev-mock" "dev-i18n" "dev-prod" ;;
  logisticsAdmin) echo "dev" "dev-i18n" "dev-prod" ;;
  kokkokAdmin)    echo "dev" "dev-mock" "dev-i18n" "dev-prod" ;;
  moveAdmin)      echo "dev" "dev-i18n" "dev-prod" ;;
  moveRanking)    echo "dev" "dev-prod" ;;
  moveIot)        echo "dev" "dev-prod" ;;
  esac
}

# NOTE: 검증 실행
checkFzfInstalled

# NOTE: 프로젝트 실행 모드 선택 (fzf 사용)
selectServiceLocal

# NOTE: 실행 모드 설정 (VALID_LOCAL_DEV_MODES 함수 활용)
VALID_DEV_MODES=($(VALID_LOCAL_DEV_MODES "$SELECTED_SERVICE"))
# NOTE: 유효한 서비스인지 검증
if [[ -z "$VALID_DEV_MODES" ]]; then
  printf "❌ 잘못된 서비스 선택\n"
  exit 1
fi

SELECTED_LOCAL_DEV_MODE=$(printf "%s\n" "${VALID_DEV_MODES[@]}" | fzf --prompt="💡 실행 환경 선택: ")

# NOTE: ✅ NEW: Typia ON/OFF 선택 단계
SELECTED_TYPIA=$(printf "%s\n" "off" "on" | fzf --prompt="🧩 Typia를 사용할까요? ")
case "$SELECTED_TYPIA" in
  "on")    TYPIA_ENABLE=true ;;
  "off")   TYPIA_ENABLE=false ;;
esac

# NOTE: ✅ dev 모드명에 typia suffix 반영
if [[ "$TYPIA_ENABLE" == true ]]; then
  LOCAL_MODE_WITH_TYPIA="${SELECTED_LOCAL_DEV_MODE}-typia"
else
  LOCAL_MODE_WITH_TYPIA="$SELECTED_LOCAL_DEV_MODE"
fi

# NOTE: ✅ COMMAND 조립
if [[ "$SELECTED_SERVICE" == "all" ]]; then
  COMMAND="$LOCAL_MODE_WITH_TYPIA"
else
  COMMAND="$LOCAL_MODE_WITH_TYPIA:$SELECTED_SERVICE"
fi

# NOTE: 검증 실행
checkValidateInputs SELECTED_SERVICE SELECTED_LOCAL_DEV_MODE SELECTED_TYPIA

# NOTE: 명령어 실행
npm_lifecycle_event="$COMMAND" node ./packages/scripts/dev-scripts.js
