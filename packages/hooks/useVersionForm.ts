import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import type { FormVersion } from "@repo/types";
import { checkVersion } from "@repo/utils/validation";
import { SCHEMA } from "@repo/utils/yup/schema";

const TEST = {
  name: "versionValidation",
  message: COMMON_ERROR_MESSAGE.VERSION_INCORRECT,
  test: (value: string) => checkVersion(value),
};

const schema = yup.object({
  os: SCHEMA.REQUIRED_ARRAY(
    Object.keys(VERSION_OS) as (keyof typeof VERSION_OS)[],
  ),
  platform: SCHEMA.REQUIRED_ARRAY(
    Object.keys(VERSION_PLATFORM) as (keyof typeof VERSION_PLATFORM)[],
  ),
  old: SCHEMA.REQUIRED_STRING.test(TEST.name, TEST.message, TEST.test),
  new: SCHEMA.REQUIRED_STRING.test(TEST.name, TEST.message, TEST.test),
  test: SCHEMA.REQUIRED_STRING.test(TEST.name, TEST.message, TEST.test),
});

interface UseVersionFormProps {
  version: FormVersion;
}

const useVersionForm = ({ version }: UseVersionFormProps) => {
  const formMethod = useForm<FormVersion>({
    mode: "onTouched",
    values: version,
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useVersionForm;
