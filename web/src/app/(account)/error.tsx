"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ui/error_fallback/ErrorFallback";

export default function AccountError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("Account route error:", error);
  }, [error]);

  return (
    <ErrorFallback
      title="Account Error"
      description="We encountered an issue loading your account. You may need to log in again. Please try refreshing the page or logging out and back in."
      code="ACCOUNT_ERROR"
      actionLabel="Go to homepage"
      actionHref="/"
    />
  );
}