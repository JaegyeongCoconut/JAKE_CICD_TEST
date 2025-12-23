import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  resetPasswordSchema,
  type ResetPasswordFormSchema,
} from "@repo/schemas/resetPasswordForm.schema";

const INIT_FORM: ResetPasswordFormSchema = {
  verify: {
    email: "",
    verificationCode: "",
    token: null,
    isAuthCodeSend: false,
    hasVerified: false,
  },
  newPassword: "",
  confirmPassword: "",
};

const useResetPasswordForm = () => {
  const formMethod = useForm<ResetPasswordFormSchema>({
    mode: "onTouched",
    defaultValues: INIT_FORM,
    shouldFocusError: false,
    resolver: zodResolver(resetPasswordSchema),
  });

  return { formMethod };
};

export default useResetPasswordForm;
