#!/bin/bash
source "$(dirname "${0}")/common.sh" # NOTE: 공통 로직 불러오기

# NOTE: 서비스 & 환경 & 브랜치 선택
BRANCH=$(printf "%s\n" "${BRANCH_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 코드 브랜치 선택: ")
# NOTE: 선택한 항목에서 실제 사용할 값 추출
BRANCH=$(printf "%s\n" "${BRANCH_CHOICES[@]}" | grep "^${BRANCH}|" | cut -d'|' -f2)

# NOTE: 검증 실행
checkUserSettings
checkValidateInputs SERVICE_NAME DEPLOY_ENV BRANCH 

# NOTE: GitHub Workflow 실행
gh workflow run deployCopy.yml --repo "${GITHUB_REPO_NAME}" --ref "${BRANCH}" --field SERVICE_NAME="${SERVICE_NAME}" --field DEPLOY_ENV="${DEPLOY_ENV}" &

# NOTE: 함수 실행
openGithubWorkflow
openServiceDomain "${SERVICE_NAME}" "${DEPLOY_ENV}"
consoleServiceInfo

# NOTE: 코드 실행 완료 메시지
printf "🚀 코드 브랜치: ${BLUE}${BRANCH}${RESET}\n"