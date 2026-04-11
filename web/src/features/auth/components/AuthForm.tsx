import { LoginForm } from "./LoginAuthForm";
import { SignUpForm } from "./SignUpAuthForm";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
    return (
        <div>
            {mode === "login" ? <LoginForm /> : <SignUpForm />}
        </div>
    );
}