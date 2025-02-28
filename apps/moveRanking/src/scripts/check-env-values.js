// NOTE: process.d.ts 와 같이 관리해야 함
const requiredEnvValues = ["VITE_BASE_URL", "VITE_TITLE_PREFIX"];

const verifyEnvVariables = () => {
  let allEnvVarsPresent = true;

  requiredEnvValues.forEach((varName) => {
    if (process.env[varName] === undefined) {
      console.error(
        `환경 변수 ${varName}가 누락되었습니다. .env 파일을 확인해주세요.`,
      );
      allEnvVarsPresent = false;
    }
  });

  if (!allEnvVarsPresent) {
    throw new Error("환경 변수가 누락되었습니다. .env 파일을 확인해주세요.");
  }

  return allEnvVarsPresent;
};

if (!verifyEnvVariables()) {
  process.exit(1);
}
