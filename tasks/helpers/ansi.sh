# NOTE: ANSI 색상 코드 정의
ANSI() {
  case $1 in
  RED) echo "\x1b[31m" ;;
  GREEN) echo "\x1b[32m" ;;
  BLUE) echo "\x1b[34m" ;;
  RESET) echo "\x1b[0m" ;;
  *) echo "" ;;
  esac
}
