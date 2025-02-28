import fs from "fs";

export const createI18nextDeclare = (serviceInfo) => {
  const argv = process.env.npm_lifecycle_event;
  const isI18nEnabled = argv.includes("-i18n");

  if (!serviceInfo.needsTranslation) {
    console.log(
      `🚀 \x1b[34m${serviceInfo.serviceName}\x1b[0m 번역이 필요없는 서비스입니다.`,
    );
    return;
  }

  console.log(
    `🚀 \x1b[34m${serviceInfo.serviceName}\x1b[0m i18n check 모드 ${isI18nEnabled ? "\x1b[32m활성화\x1b[0m" : "\x1b[31m비활성화\x1b[0m"}합니다.`,
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
    ? `import { ${serviceInfo.serviceName}Resources } from "@repo/assets";`
    : "";
  const resources = isI18nEnabled
    ? `
        resources: {
            en: Record<keyof (typeof ${serviceInfo.serviceName}Resources)["en"]["translation"], string>;
            lo: Record<keyof (typeof ${serviceInfo.serviceName}Resources)["lo"]["translation"], string>;
        };
      `
    : "resources: {};";

  fs.writeFileSync(
    `apps/${serviceInfo.serviceName}/src/types/declare/i18next.d.ts`,
    `/* eslint-disable */
      // NOTE: 이 파일은 자동 생성되었습니다. 직접 수정하지 마세요.
      ${annotation}

    import "i18next";
    
    import { fallbackLng } from "@repo/assets";
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
