#!/bin/bash
source "$(dirname "${0}")/common.sh" # NOTE: 공통 로직 불러오기

# NOTE: 검증 실행
checkUserSettings
checkValidateInputs SERVICE_NAME DEPLOY_ENV

# NOTE: GitHub Workflow 실행
gh workflow run rollback.yml --repo "${GITHUB_REPO_NAME}" --field SERVICE_NAME="${SERVICE_NAME}" --field DEPLOY_ENV="${DEPLOY_ENV}" &

# NOTE: 함수 실행
openGithubWorkflow
openServiceDomain "${SERVICE_NAME}" "${DEPLOY_ENV}"
consoleServiceInfo