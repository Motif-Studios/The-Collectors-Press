import { LoginForm } from "./LoginAuthForm";
import { SignUpForm } from "./SignUpAuthForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

export function AuthForm({ mode }: { mode: "login" | "signup" | "forgot_password" | "reset_password" }) {
    return (
        <div>
            {mode === "login" ? <LoginForm /> : mode === "signup" ? <SignUpForm /> : mode === "forgot_password" ? <ForgotPasswordForm /> : <ResetPasswordForm />}
        </div>
    );
}