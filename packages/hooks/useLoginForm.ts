import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginFormSchema,
} from "@repo/schemas/loginForm.schema";

const INIT_FORM: LoginFormSchema = { email: "", password: "" };

const useLoginForm = () => {
  const formMethod = useForm<LoginFormSchema>({
    defaultValues: INIT_FORM,
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  return { formMethod };
};

export default useLoginForm;
