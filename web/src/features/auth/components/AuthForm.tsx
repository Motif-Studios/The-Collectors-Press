import { LoginForm } from "./LoginAuthForm";
import { SignUpForm } from "./SignUpAuthForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ChangeEmailForm } from "@/features/my_account/changeEmailForm";

export function AuthForm({ mode }: { mode: "login" | "signup" | "forgot_password" | "reset_password" | "change_email" }) {
    return (
        <div>
            {mode === "login" ? <LoginForm /> : mode === "signup" ? <SignUpForm /> : mode === "forgot_password" ? <ForgotPasswordForm /> : mode === "change_email" ? <ChangeEmailForm /> : <ResetPasswordForm />}
        </div>
    );
}