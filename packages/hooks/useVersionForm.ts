import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { mixed, object } from "yup";

import type { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import type { AppVersion, FormVersion, RecursiveUndefined } from "@repo/types";
import { checkVersion } from "@repo/utils/validation";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

const TEST_VALID_VERSION = {
  name: "versionValidation",
  message: COMMON_ERROR_MESSAGE.VERSION_INCORRECT,
  test: (value: string) => checkVersion(value),
};

const schema = object({
  os: mixed<keyof typeof VERSION_OS>().nullable().defined().test(TEST.TRIM()),
  platform: mixed<keyof typeof VERSION_PLATFORM>()
    .nullable()
    .defined()
    .test(TEST.TRIM()),
  old: SCHEMA.REQUIRED_STRING().test(TEST_VALID_VERSION),
  new: SCHEMA.REQUIRED_STRING().test(TEST_VALID_VERSION),
  test: SCHEMA.REQUIRED_STRING().test(TEST_VALID_VERSION),
});

const INIT_FORM = { old: "", new: "", test: "", os: null, platform: null };

interface UseVersionFormProps {
  version: RecursiveUndefined<Omit<AppVersion, "serviceName" | "to" | "os">> & {
    os: keyof typeof VERSION_OS | null;
    platform: keyof typeof VERSION_PLATFORM | null;
  };
}

const useVersionForm = ({ version }: UseVersionFormProps) => {
  const formMethod = useForm<FormVersion>({
    mode: "onTouched",
    values: version
      ? {
          old: version.old || INIT_FORM.old,
          new: version.new || INIT_FORM.new,
          test: version.test || INIT_FORM.test,
          os: version.os ?? INIT_FORM.os,
          platform: version.platform ?? INIT_FORM.platform,
        }
      : INIT_FORM,
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useVersionForm;
