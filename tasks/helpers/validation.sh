HELPERS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "${HELPERS_DIR}/ansi.sh"

# NOTE: fzf 설치 여부 확인
checkFzfInstalled() {
  if ! command -v fzf &>/dev/null; then
    printf "❌ Error: $(ANSI RED)'fzf'가 설치되어 있지 않습니다. 설치하려면 'brew install fzf'를 실행하세요.$(ANSI RESET)\n"
    exit 1
  fi
}

# NOTE: 입력값 검증 함수
checkValidateInputs() {
  for input in "${@}"; do
    if [[ -z "${!input}" ]]; then
      printf "❌ Error: $(ANSI RED)${input} 값을 입력해야 합니다.$(ANSI RESET)\n"
      exit 1
    fi
  done
}
