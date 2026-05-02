"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ui/error_fallback/ErrorFallback";

export default function AuthError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("Auth route error:", error);
  }, [error]);

  return (
    <ErrorFallback
      title="Authentication Error"
      description="We couldn't complete your authentication request. Please try again. If you're experiencing persistent issues, try clearing your browser cookies or using an incognito window."
      code="AUTH_ERROR"
      actionLabel="Try again"
      actionHref="/login"
    />
  );
}