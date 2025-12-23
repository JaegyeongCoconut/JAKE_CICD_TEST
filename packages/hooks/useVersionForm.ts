import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";
import {
  versionSchema,
  type VersionFormSchema,
} from "@repo/schemas/versionForm.schema";
import type { AppVersion, RecursiveUndefined } from "@repo/types";

const INIT_FORM: VersionFormSchema = {
  old: "",
  new: "",
  test: "",
  os: null,
  platform: null,
};

interface UseVersionFormProps {
  version: RecursiveUndefined<
    Omit<AppVersion, "serviceName" | "to" | "os"> & {
      os: keyof typeof VERSION_OS | null;
      platform: keyof typeof VERSION_PLATFORM | null;
    }
  >;
}

const useVersionForm = ({ version }: UseVersionFormProps) => {
  const formMethod = useForm<VersionFormSchema>({
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
    resolver: zodResolver(versionSchema),
  });

  return { formMethod };
};

export default useVersionForm;
