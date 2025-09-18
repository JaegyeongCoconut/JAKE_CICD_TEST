import { ANSI } from "../assets/static/ansi.js";

import fs from "fs";

export const createI18nextDeclare = ({
  serviceName,
  needsTranslation,
  command,
}) => {
  const isI18nEnabled = command.includes("-i18n");

  if (!needsTranslation) {
    console.log(
      `🚀 ${ANSI.BLUE}${serviceName}${ANSI.RESET} 번역이 필요없는 서비스입니다.`,
    );
    return;
  }

  console.log(
    `🚀 ${ANSI.BLUE}${serviceName}${ANSI.RESET} i18n check 모드 ${isI18nEnabled ? `${ANSI.GREEN}활성화${ANSI.RESET}` : `${ANSI.RED}비활성화${ANSI.RESET}`}합니다.`,
  );

  const annotation = isI18nEnabled
    ? `
      // NOTE: 누락된 번역 문구 확인이 활성화되어 있습니다.
      // NOTE: vscode intellisense 동작이 느릴 수 있습니다.
      `
    : `
      // NOTE: 누락된 번역 문구 확인이 비활성화되어 있습니다.
      `;
  const resourcesImport = isI18nEnabled
    ? `import { type resources } from "~assets";`
    : "";
  const resources = isI18nEnabled
    ? `
        resources: {
            en: Record<keyof (typeof resources)["en"]["translation"], string>;
            lo: Record<keyof (typeof resources)["lo"]["translation"], string>;
        };
      `
    : "resources: {};";

  fs.writeFileSync(
    `apps/${serviceName}/src/types/declare/i18next.d.ts`,
    `/* eslint-disable */
      // IMPORTANT: 이 파일은 로컬환경에서 실행시 자동 생성됩니다. 직접 수정하지 마세요.
      ${annotation}

    import "i18next";
    
    /*
      IMPORTANT: 반드시, packages > assets > language > translation.ts 파일을 참조해야합니다.
      IMPORTANT: translation.ts 파일의 위치가 변경되면 코드를 수정해야합니다. 
    */
    
    import { fallbackLng } from "@repo/assets/language/i18n";
    ${resourcesImport}

    declare module "i18next" {
        interface CustomTypeOptions {
            defaultNS: typeof fallbackLng;
            returnNull: false; // NOTE: null을 반환하지 않도록 설정
            ${resources}
        }
    }
    `,
  );
};
