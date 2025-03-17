#!/bin/bash
# LINK: Flow chart https://boardmix.com/app/editor/yrBD1jJ3wyfQEpDyjjGuqw?otherNodeGuid=23:2

#----------------------------------------------------------------------------------------------------------#
RED='\x1b[31m'
GREEN='\x1b[32m'
BLUE='\x1b[34m'
RESET='\x1b[0m'

GITHUB_REPO_NAME="JaegyeongCoconut/React_CICD"
SERVICE_CHOICES=(
  "KOKKOK Move Ranking WEB|moveRanking"
)

ENV_CHOICES=(
  "개발 환경 (development)|dev"
)

BRANCH_CHOICES=(
  "운영 브랜치 (main)|main"
)

# NOTE: 서비스 & 환경 선택
SERVICE_NAME=$(printf "%s\n" "${SERVICE_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 KOKKOK 서비스 선택: ")
DEPLOY_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 배포 환경 선택: ")

# NOTE: 선택한 항목에서 실제 사용할 값 추출
SERVICE_NAME=$(printf "%s\n" "${SERVICE_CHOICES[@]}" | grep "^${SERVICE_NAME}|" | cut -d'|' -f2)
DEPLOY_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | grep "^${DEPLOY_ENV}|" | cut -d'|' -f2)
#----------------------------------------------------------------------------------------------------------#

# ✅ 입력값 검증 함수
checkValidateInputs() {
  for var in "${@}"; do
    if [[ -z "${!var}" ]]; then
      printf "❌ Error: ${RED}모든 값을 선택해야 합니다.${RESET}\n"
      exit 1
    fi
  done
}

checkUserSettings() {
  # NOTE: fzf(키보드 화살표 입력하여 CLI 선택하는 라이브러리) 설치 여부 확인
  if ! command -v fzf &> /dev/null; then
    printf "❌ Error: ${RED}'fzf'가 설치되어 있지 않습니다. 설치하려면 'brew install fzf'를 실행하세요.${RESET}\n"
    exit 1
  fi

  # NOTE: Github CLI(gh) 설치 여부 확인
  if ! command -v gh &> /dev/null; then
    printf "❌ Error: ${RED}GitHub CLI(gh)가 설치되어 있지 않습니다. 설치하려면 'brew install gh'를 실행하세요.${RESET}\n"
    exit 1
  fi

  # NOTE: Github CLI(gh) 로그인 여부 확인
  if ! gh auth status &>/dev/null; then
    printf "❌ Error: ${RED}GitHub CLI(gh)에 로그인되지 않았습니다. 'gh auth login'을 실행하여 로그인하세요.${RESET}\n"
    exit 1
  fi
}

# NOTE: 최신 실행된 워크플로우 URL 가져와서 브라우저에서 열기
openGithubWorkflow() {
  sleep 3
  gh run list --repo "${GITHUB_REPO_NAME}" --limit 1 --json url --jq '.[0].url' | xargs open
}

# NOTE: 서비스 도메인 자동으로 열어줌
openServiceDomain() {
  # NOTE: 서비스별 도메인 매핑
  getServiceDomain() {
    case "${1}-${2}" in
      "carAdmin-dev") echo "dev.admin.car.laosmartmobility.com" ;;
      "carAdmin-prod") echo "admin.car.laosmartmobility.com" ;;
      "carInspection-dev") echo "dev.inspection.car.laosmartmobility.com" ;;
      "carInspection-prod") echo "inspection.car.laosmartmobility.com" ;;
      "eCommerceAdmin-dev") echo "dev.admin.ecomm.laosmartmobility.com" ;;
      "logisticsAdmin-dev") echo "dev.logistics.laosmartmobility.com" ;;
      "logisticsAdmin-prod") echo "logistics.laosmartmobility.com" ;;
      "moveAdmin-dev") echo "dev.admin.move.laosmartmobility.com" ;;
      "moveAdmin-prod") echo "admin.move.laosmartmobility.com" ;;
      "moveRanking-dev") echo "dev.hero.move.laosmartmobility.com/ranking" ;;
      "moveRanking-prod") echo "hero.move.laosmartmobility.com/ranking" ;;
      *) echo "" ;;
    esac
  }

  SERVICE_DOMAIN=$(getServiceDomain "${1}" "${2}")
  
  if [[ -n "${SERVICE_DOMAIN}" ]]; then
    printf "\n🌍 서비스 도메인 열기: ${GREEN}${SERVICE_DOMAIN}${RESET}\n"
    open "https://${SERVICE_DOMAIN}"
  else
    printf "❗ ${RED}서비스 도메인이 설정되어 있지 않습니다.${RESET}\n"
  fi
}

consoleServiceInfo() {
  printf "\n-----------------------------------------\n\n"
  printf "🚀 ${1} 코드가 정상적으로 실행되었습니다.\n"
  printf "🚀 선택된 값:\n"
  printf "🚀 KOKKOK 서비스 이름: ${BLUE}KOKKOK ${SERVICE_NAME}${RESET}\n"
  printf "🚀 배포 환경: ${BLUE}${DEPLOY_ENV}${RESET}\n"
}