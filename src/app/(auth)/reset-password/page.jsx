import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div>
      <h1>Reset password</h1>
      <Suspense fallback={"Loading..."}>
        <ResetPasswordForm></ResetPasswordForm>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
