import { SERVICE_NAMES } from "./packages/assets/static/serviceName.js";

/* eslint-disable */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

/**
 * NOTE: 번역 JSON 파일에서 키와 값을 추출하는 함수
 * @param {string} filePath - 번역 JSON 파일의 절대 경로
 * @returns {Object} - 번역 키-값 쌍을 포함하는 객체
 */
function getTranslationKeyValueMap(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`번역 파일을 찾을 수 없습니다: ${filePath}`);
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error(`번역 파일을 파싱하는 데 실패했습니다: ${filePath}`);
    return null;
  }
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
 * NOTE: 번역 키 사용 여부를 검사하는 함수
 * @param {Array} keys - 번역 JSON의 모든 키
 * @param {Array} files - 소스 파일의 절대 경로 배열
 * @returns {Array} - 사용되지 않는 번역 키 배열
 */
function checkTranslationKeysUsage(keys, files) {
  const unusedKeys = new Set(keys);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");

    keys.forEach((key) => {
      if (unusedKeys.has(key)) {
        // NOTE: 번역 키가 사용되는 패턴을 단순히 "KEY" 또는 'KEY' 형태로 체크
        const regexPatterns = [new RegExp(`["'\`]${escapeRegExp(key)}["'\`]`)];

        const isUsedInCode = regexPatterns.some((regex) => regex.test(content));

        if (isUsedInCode) {
          unusedKeys.delete(key);
        }
      }
    });
  });

  return Array.from(unusedKeys);
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
 * NOTE: 메인 함수 - 번역 키 분석
 */
async function analyzeTranslationKeys() {
  for (const appName of SERVICE_NAMES) {
    console.log(`\n=== 🚀 [${appName}] 번역 키 분석 시작 ===`);

    const appTranslationFilePath = path.join(
      __dirname,
      "packages",
      "assets",
      "language",
      "files",
      appName,
      `${appName}-en.json`,
    );
    const appOutputDir = path.join(
      __dirname,
      "packages",
      "assets",
      "language",
      "files",
      "unused",
      appName,
    );
    const appUnusedTranslationsOutputFilePath = path.join(
      appOutputDir,
      `unused-languages-${appName}-translations.json`,
    );

    let translationUnusedKeys = [];

    // NOTE: 번역 파일 존재 여부 확인
    if (fs.existsSync(appTranslationFilePath)) {
      console.log("번역 키를 추출 중...");
      const translationKeyValueMap = getTranslationKeyValueMap(
        appTranslationFilePath,
      );
      if (!translationKeyValueMap) {
        console.error(
          `[${appName}] 번역 키 추출에 실패했습니다. 다음 애플리케이션으로 넘어갑니다.`,
        );
        continue;
      }
      const translationKeys = Object.keys(translationKeyValueMap);

      console.log(`총 ${translationKeys.length}개의 번역 키를 찾았습니다.`);

      // NOTE: 번역 키 사용 여부를 검사하기 위해 src와 packages 디렉토리 모두 스캔
      console.log("번역 키 사용 여부를 검사 중...");
      const appSrcDir = path.join(__dirname, "apps", appName, "src");
      const srcFiles = getAllSourceFiles([appSrcDir]);
      const packageFiles = getAllSourceFiles(
        [path.join(__dirname, "packages")],
        [`**/assets/language/files/${appName}/**`], // NOTE: 번역 파일 자체는 제외
      );
      const allUsageFiles = srcFiles.concat(packageFiles);
      console.log(`총 ${allUsageFiles.length}개의 소스 파일을 검사합니다.`);

      translationUnusedKeys = checkTranslationKeysUsage(
        translationKeys,
        allUsageFiles,
      );

      if (translationUnusedKeys.length === 0) {
        console.log(`[${appName}] 모든 번역 키가 사용되고 있습니다.`);
      } else {
        console.log(
          `[${appName}] 사용되지 않는 번역 키의 개수: ${translationUnusedKeys.length}`,
        );

        const unusedTranslationKeyValueMap = {};
        translationUnusedKeys.forEach((key) => {
          const value = translationKeyValueMap[key];
          unusedTranslationKeyValueMap[key] = value;
        });

        // NOTE: JSON 파일을 저장할 디렉토리 생성 (없을 경우)
        if (!fs.existsSync(appOutputDir)) {
          fs.mkdirSync(appOutputDir, { recursive: true });
          const relativeOutputDir = path.relative(__dirname, appOutputDir);
          console.log(`디렉토리가 생성되었습니다: ${relativeOutputDir}`);
        }

        // NOTE: JSON 파일로 저장 (상대 경로로 출력)
        fs.writeFileSync(
          appUnusedTranslationsOutputFilePath,
          JSON.stringify(unusedTranslationKeyValueMap, null, 2),
          "utf-8",
        );
        const relativeTranslationOutputPath = path.relative(
          __dirname,
          appUnusedTranslationsOutputFilePath,
        );
        console.log(
          `\n사용되지 않는 번역 키와 값이 ${relativeTranslationOutputPath}에 저장되었습니다.`,
        );
      }
    } else {
      console.warn(
        `[${appName}] 번역 파일을 찾을 수 없습니다: ${appTranslationFilePath}`,
      );
    }

    console.log(`=== 🚀 [${appName}] 번역 키 분석 종료 ===\n`);

    // NOTE: 사용되지 않는 키가 존재하면 JSON 파일을 저장
    if (translationUnusedKeys.length > 0) {
      console.log(`[${appName}] 사용되지 않는 번역 키들이 발견되었습니다.`);
    } else {
      console.log(`[${appName}] 사용되지 않는 번역 키가 없습니다.`);
    }
  }

  console.log("모든 애플리케이션에 대한 번역 키 분석이 완료되었습니다.");
}

// NOTE: 스크립트 실행
analyzeTranslationKeys();
