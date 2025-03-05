#!/bin/bash

# LINK: Flow chart https://boardmix.com/app/editor/yrBD1jJ3wyfQEpDyjjGuqw?otherNodeGuid=23:2

# NOTE: fzf(키보드 화살표 입력하여 CLI 선택하는 라이브러리) 설치 여부 확인
if ! command -v fzf &> /dev/null; then
  printf "❌ Error: \x1b[31m'fzf'가 설치되어 있지 않습니다. 설치하려면 'brew install fzf'를 실행하세요.\x1b[0m\n"
  exit 1
fi

# NOTE: Github CLI(gh) 설치 여부 확인
if ! command -v gh &> /dev/null; then
  printf "❌ Error: \x1b[31mGitHub CLI(gh)가 설치되어 있지 않습니다. 설치하려면 'brew install gh'를 실행하세요.\x1b[0m\n"
  exit 1
fi

# NOTE: Github CLI(gh) 로그인 여부 확인
if ! gh auth status &>/dev/null; then
  printf "❌ Error: \x1b[31mGitHub CLI(gh)에 로그인되지 않았습니다. 'gh auth login'을 실행하여 로그인하세요.\x1b[0m\n"
  exit 1
fi

# NOTE: 서비스 목록 (표시될 값 | 실제 값)
WORK_FLOW_CHOICES=(
  "배포 (deploy)|deploy.yml"
  "롤백 (rollback)|rollback.yml"
)

SERVICE_CHOICES=(
  "KOKKOK Move Ranking WEB|moveRanking"
)

ENV_CHOICES=(
  "개발 환경 (development)|dev"
)

BRANCH_CHOICES=(
  "운영 브랜치 (main)|main"
)

# NOTE: fzf에서 표시할 텍스트만 추출 후 선택
WORK_FLOW_NAME=$(printf "%s\n" "${WORK_FLOW_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 작업 선택: ")
SERVICE_NAME=$(printf "%s\n" "${SERVICE_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 KOKKOK 서비스 선택: ")
DEPLOY_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 배포 환경 선택: ")
REF=$(printf "%s\n" "${BRANCH_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 코드 브랜치 선택: ")

# NOTE: 선택한 항목에서 실제 사용할 값(뒷부분) 추출
WORK_FLOW_NAME=$(printf "%s\n" "${WORK_FLOW_CHOICES[@]}" | grep "^$WORK_FLOW_NAME|" | cut -d'|' -f2)
SERVICE_NAME=$(printf "%s\n" "${SERVICE_CHOICES[@]}" | grep "^$SERVICE_NAME|" | cut -d'|' -f2)
DEPLOY_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | grep "^$DEPLOY_ENV|" | cut -d'|' -f2)
REF=$(printf "%s\n" "${BRANCH_CHOICES[@]}" | grep "^$REF|" | cut -d'|' -f2)

# NOTE: 입력값 검증
if [[ -z "$WORK_FLOW_NAME" || -z "$SERVICE_NAME" || -z "$DEPLOY_ENV" || -z "$REF" ]]; then
  printf "❌ Error: \x1b[31m모든 값을 선택해야 합니다.\x1b[0m\n"
  exit 1
fi

# NOTE: 배포할 GitHub 레포지토리 설정 (변수화)
REPO="JaegyeongCoconut/React_CICD"

# NOTE: GitHub Workflow 실행
gh workflow run "$WORK_FLOW_NAME" --repo "$REPO" --ref "$REF" --field SERVICE_NAME="$SERVICE_NAME" --field DEPLOY_ENV="$DEPLOY_ENV" &

# NOTE: 일정 시간 대기 (3초)
sleep 3

# NOTE: 최신 실행된 워크플로우 URL 가져와서 브라우저에서 열기
gh run list --repo "$REPO" --limit 1 --json url --jq '.[0].url' | xargs open

# NOTE: 코드 실행 완료 메시지
printf "\n-----------------------------------------\n\n"
printf "🚀 script 코드가 정상적으로 실행되었습니다.\n"
printf "🚀 선택된 값:\n"
printf "🚀 작업: \x1b[34m$WORK_FLOW_NAME\x1b[0m\n"
printf "🚀 KOKKOK 서비스 이름: \x1b[34mKOKKOK $SERVICE_NAME\x1b[0m\n"
printf "🚀 배포 환경: \x1b[34m$DEPLOY_ENV\x1b[0m\n"
printf "🚀 코드 브랜치: \x1b[34m$REF\x1b[0m\n"

# NOTE: 서비스별 도메인 찾기
SERVICE_DOMAIN=""

case "${SERVICE_NAME}-${DEPLOY_ENV}" in
  "moveRanking-dev") SERVICE_DOMAIN="jakecicd.s3-website-ap-southeast-1.amazonaws.com/ranking" ;;
esac


# NOTE: 도메인 열기 (존재하면)
if [[ -n "$SERVICE_DOMAIN" ]]; then
  printf "\n🌍 서비스 도메인 열기: \x1b[32m$SERVICE_DOMAIN\x1b[0m\n"
  open "http://$SERVICE_DOMAIN"
else
  printf "❗ \x1b[31m서비스 도메인이 설정되어 있지 않습니다.\x1b[0m\n"
fi