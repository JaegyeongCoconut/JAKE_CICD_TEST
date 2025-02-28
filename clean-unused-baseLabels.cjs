import { SERVICE_NAMES } from "./packages/assets/static/serviceName.js";

/* eslint-disable */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

/**
 * NOTE: BASE_LABEL의 키와 값을 추출하는 함수
 * @param {string} filePath - baseLabel.ts 파일의 절대 경로
 * @returns {Object} - 키-값 쌍을 포함하는 객체
 */
function getBaseLabelKeyValue(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // NOTE: BASE_LABEL 객체 부분을 추출
  const baseLabelRegex =
    /export\s+const\s+BASE_LABEL\s*(?::\s*Record<[^>]+>)?\s*=\s*{([\s\S]*?)}(?:\s*as\s*const)?;/m;
  const match = fileContent.match(baseLabelRegex);

  if (!match) {
    console.error(`BASE_LABEL 객체를 ${filePath}에서 찾을 수 없습니다.`);
    return null;
  }

  let objectContent = match[1];

  // NOTE: 주석 제거 (단일 행 주석과 블록 주석 모두 제거)
  objectContent = objectContent
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  /* NOTE: 키-값 쌍을 추출하기 위한 정규식
  예: BEFORE_CONTRACT: "Before contract", */
  const keyValueRegex =
    /^\s*["']?([^"':,\s]+)["']?\s*:\s*["']([^"']*)["'](?:\s*as\s*[^,]+)?\s*,?/gm;

  const keyValueMap = {};
  let matchKV;

  while ((matchKV = keyValueRegex.exec(objectContent)) !== null) {
    const key = matchKV[1];
    const value = matchKV[2];
    keyValueMap[key] = value;
  }

  return keyValueMap;
}

/**
 * NOTE: 모든 소스 파일을 가져오는 함수
 * @param {Array<string>} srcDirs - 소스 디렉토리 절대 경로 배열
 * @param {Array<string>} ignorePatterns - 무시할 패턴 배열
 * @returns {Array} - 소스 파일의 절대 경로 배열
 */
function getAllSourceFiles(srcDirs, ignorePatterns = []) {
  let files = [];
  srcDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      console.warn(`디렉토리를 찾을 수 없습니다: ${dir}`);
      return;
    }
    const dirFiles = glob.sync("**/*.{js,jsx,ts,tsx}", {
      cwd: dir,
      absolute: true,
      ignore: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        ...ignorePatterns,
      ],
    });
    files = files.concat(dirFiles);
  });
  return files;
}

/**
 * NOTE: 키 사용 여부를 검사하는 함수 (BASE_LABEL)
 * @param {Array} keys - BASE_LABEL의 모든 키
 * @param {Array} files - 소스 파일의 절대 경로 배열
 * @returns {Array} - 사용되지 않는 키 배열
 */
function checkKeysUsage(keys, files) {
  const unusedKeys = new Set(keys);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");

    keys.forEach((key) => {
      if (unusedKeys.has(key)) {
        /* NOTE: 키가 사용되는 패턴을 여러 가지로 체크
         예: BASE_LABEL.KEY, BASE_LABEL["KEY"] 등이 사용될 수 있음 */
        const regexPatterns = [
          new RegExp(`BASE_LABEL\\.${escapeRegExp(key)}\\b`),
          new RegExp(`BASE_LABEL\\["${escapeRegExp(key)}"\\]`),
          new RegExp(`BASE_LABEL\\['${escapeRegExp(key)}'\\]`),
        ];

        const isUsed = regexPatterns.some((regex) => regex.test(content));

        if (isUsed) {
          unusedKeys.delete(key);
        }
      }
    });
  });

  return Array.from(unusedKeys);
}

/**
 * NOTE: BASE_LABEL 파일에서 사용되지 않는 키를 포함한 행을 제거하는 함수
 * @param {string} filePath - baseLabel.ts 파일의 절대 경로
 * @param {Array} unusedKeys - 사용되지 않는 키 배열
 * @returns {number} - 삭제된 키의 수
 */
function removeUnusedKeys(filePath, unusedKeys) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const lines = fileContent.split("\n");
  const unusedKeysSet = new Set(unusedKeys);
  let deletedCount = 0;

  const filteredLines = lines.filter((line) => {
    for (let key of unusedKeysSet) {
      if (key === "") {
        const emptyKeyRegex = /^\s*["']{2}\s*:/;
        if (emptyKeyRegex.test(line)) {
          deletedCount++;
          return false;
        }
      } else {
        const regex = new RegExp(`^\\s*["']?${escapeRegExp(key)}["']?\\s*:`);

        if (regex.test(line)) {
          deletedCount++;
          return false;
        }
      }
    }
    return true;
  });

  const newFileContent = filteredLines.join("\n");

  fs.writeFileSync(filePath, newFileContent, "utf-8");
  const relativeFilePath = path.relative(__dirname, filePath);
  console.log(`사용되지 않는 키가 ${relativeFilePath} 에서 제거되었습니다.`);

  return deletedCount;
}

/**
 * NOTE: 정규식 특수문자 이스케이프 함수
 * @param {string} string - 이스케이프할 문자열
 * @returns {string} - 이스케이프된 문자열
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * NOTE: 메인 함수 - BASE_LABEL 분석
 */
async function analyzeBaseLabel() {
  for (const appName of SERVICE_NAMES) {
    console.log(`\n=== 🚀 [${appName}] BASE_LABEL 분석 시작 ===`);

    const appBaseLabelPath = path.join(
      __dirname,
      "apps",
      appName,
      "src",
      "constants",
      "baseLabel.ts",
    );
    const appSrcDir = path.join(__dirname, "apps", appName, "src");
    const appOutputDir = path.join(
      __dirname,
      "packages",
      "assets",
      "language",
      "files",
      "unused",
      appName,
    );
    const appUnusedBaseLabelOutputFilePath = path.join(
      appOutputDir,
      `unused-languages-${appName}-baseLabels.json`,
    );

    let baseLabelUnusedKeys = [];

    // NOTE: BASE_LABEL 파일 존재 여부 확인
    if (fs.existsSync(appBaseLabelPath)) {
      console.log("BASE_LABEL 키와 값을 추출 중...");
      const keyValueMap = getBaseLabelKeyValue(appBaseLabelPath);
      if (!keyValueMap) {
        console.error(
          `[${appName}] BASE_LABEL 키 추출에 실패했습니다. 다음 애플리케이션으로 넘어갑니다.`,
        );
        continue;
      }
      const keys = Object.keys(keyValueMap);

      console.log(`총 ${keys.length}개의 키를 찾았습니다.`);

      console.log("소스 파일을 검색 중...");
      const sourceFiles = getAllSourceFiles([appSrcDir]);
      console.log(`총 ${sourceFiles.length}개의 src 파일을 검사합니다.`);

      console.log("키 사용 여부를 검사 중...");
      baseLabelUnusedKeys = checkKeysUsage(keys, sourceFiles);

      console.log("\n");

      if (baseLabelUnusedKeys.length === 0) {
        console.log(`[${appName}] 모든 BASE_LABEL 키가 사용되고 있습니다.`);
      } else {
        console.log(
          `[${appName}] 사용되지 않는 BASE_LABEL 키의 개수: ${baseLabelUnusedKeys.length}`,
        );

        const unusedKeyValueMap = {};
        baseLabelUnusedKeys.forEach((key) => {
          const value = keyValueMap[key];
          unusedKeyValueMap[key] = value;
        });

        // NOTE: JSON 파일을 저장할 디렉토리 생성 (없을 경우)
        if (!fs.existsSync(appOutputDir)) {
          fs.mkdirSync(appOutputDir, { recursive: true });
          const relativeOutputDir = path.relative(__dirname, appOutputDir);
          console.log(`디렉토리가 생성되었습니다: ${relativeOutputDir}`);
        }

        // NOTE: JSON 파일로 저장 (상대 경로로 출력)
        fs.writeFileSync(
          appUnusedBaseLabelOutputFilePath,
          JSON.stringify(unusedKeyValueMap, null, 2),
          "utf-8",
        );
        const relativeOutputPath = path.relative(
          __dirname,
          appUnusedBaseLabelOutputFilePath,
        );
        console.log(
          `\n사용되지 않는 BASE_LABEL 키와 값이 ${relativeOutputPath}에 저장되었습니다.`,
        );

        console.log(
          `[${appName}] 사용되지 않는 키를 baseLabel.ts에서 제거 중...`,
        );
        const deletedCount = removeUnusedKeys(
          appBaseLabelPath,
          baseLabelUnusedKeys,
        );
        console.log(
          `삭제가 완료되었습니다. 총 ${deletedCount}개의 키가 삭제되었습니다.`,
        );
      }
    } else {
      console.warn(
        `[${appName}] BASE_LABEL 파일을 찾을 수 없습니다: ${appBaseLabelPath}`,
      );
    }

    console.log(`=== 🚀 [${appName}] BASE_LABEL 분석 종료 ===\n`);
  }

  console.log("모든 애플리케이션에 대한 BASE_LABEL 분석이 완료되었습니다.");
}

// NOTE: 스크립트 실행
analyzeBaseLabel();
