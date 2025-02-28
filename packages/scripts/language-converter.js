import converter from "csvtojson";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const generateLanguageJsonFile = ({ serviceName, languageFolderPath }) => {
  const folderPath = `${languageFolderPath}/${serviceName}`;

  (async () => {
    const csvFiles = fs.readdirSync(folderPath);

    for await (const languageCsvFile of csvFiles) {
      try {
        const words = await converter().fromFile(
          `${folderPath}/${languageCsvFile}`,
        );

        const en = {};
        const lo = {};

        for (const word of words) {
          if (!word.key) continue;

          // NOTE: csv 언어 파일에서 개행 있는 부분 key 값 포매팅
          if (word.key.includes("\r\n")) {
            const trimmedStrings = word.key
              .split("\r\n")
              .map((str) => str.trim());
            const keyWithSlashN = trimmedStrings.join("\n");

            en[keyWithSlashN] = word.en;
            lo[keyWithSlashN] = word.lo || word.en;
          } else {
            en[word.key] = word.en;
            lo[word.key] = word.lo || word.en;
          }
        }

        if (Object.keys(en).length) {
          fs.writeFileSync(
            path.join(folderPath, `./${serviceName}-en.json`),
            JSON.stringify(en),
          );
        }

        if (Object.keys(lo).length) {
          fs.writeFileSync(
            path.join(folderPath, `./${serviceName}-lo.json`),
            JSON.stringify(lo),
          );
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }
  })();
};

const CURRENT_FILE_PATH = fileURLToPath(import.meta.url);
const LANGUAGE_DIR_PATH = path.join(
  CURRENT_FILE_PATH,
  "../../assets/language/files",
);
const EXISTING_DIRS = fs
  .readdirSync(LANGUAGE_DIR_PATH, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

EXISTING_DIRS.forEach((serviceName) => {
  if (serviceName === "unused") return;
  generateLanguageJsonFile({
    serviceName,
    languageFolderPath: LANGUAGE_DIR_PATH,
  });
});
