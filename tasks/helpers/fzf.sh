# NOTE: 실행 가능한 서비스 목록
DIR_NAMES=$(ls -d apps/*/ | sed 's|apps/||; s|/||') # NOTE: apps 폴더 내 프로젝트 폴더 목록
VALID_SERVICES=("all" "${DIR_NAMES[@]}")            # NOTE: 실행 가능한 프로젝트 목록
ENV_CHOICES=(
  "개발 환경 (development)|dev"
  "운영 환경 (production)|prod"
)
BRANCH_CHOICES=(
  "개발 브랜치 (develop)|develop"
  "운영 브랜치 (main)|main"
)

selectServiceLocal() {
  VALID_SERVICES=("all" "${DIR_NAMES[@]}") # NOTE: 실행 가능한 프로젝트 목록

  SELECTED_SERVICE=$(printf "%s\n" "${VALID_SERVICES[@]}" | fzf --prompt="💡 KOKKOK 서비스 선택: ")
}

# NOTE: fzf 실행. 배포 환경 선택.
selectEnv() {
  SELECTED_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | cut -d'|' -f1 | fzf --prompt="💡 배포 환경 선택: ")
  SELECTED_ENV=$(printf "%s\n" "${ENV_CHOICES[@]}" | grep "^${SELECTED_ENV}|" | cut -d'|' -f2)
}
