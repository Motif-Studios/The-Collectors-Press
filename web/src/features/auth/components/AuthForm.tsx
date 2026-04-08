import { Footer } from "../../../components/ui/footer/Footer";
import { AuthHeader } from "../../../components/ui/header/AuthHeader";
import { LoginForm } from "./LoginAuthForm";
import { SignUpForm } from "./SignUpAuthForm";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
    return (
        <div>
            <AuthHeader />
            {mode === "login" ? <LoginForm /> : <SignUpForm />}
            <Footer />
        </div>
    );
}