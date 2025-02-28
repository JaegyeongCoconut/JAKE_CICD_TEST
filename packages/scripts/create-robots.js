import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROBOTS_FOLDER_PATH = path.join(__dirname, "../assets/robot/");

const robotsFileSource = path.join(
  ROBOTS_FOLDER_PATH,
  `robots.${process.env.VITE_TITLE_PREFIX === "dev-" ? "dev" : "prod"}.txt`,
);

const ROBOTS_FILE_DESTINATION = path.join(process.cwd(), `public/robots.txt`);

fs.copyFileSync(robotsFileSource, ROBOTS_FILE_DESTINATION);
