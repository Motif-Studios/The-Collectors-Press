import { AuthForm } from "@/features/auth/components/AuthForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm mode="login" />
    </Suspense>
  );
}