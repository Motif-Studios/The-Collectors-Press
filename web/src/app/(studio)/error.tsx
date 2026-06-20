"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ui/error_fallback/ErrorFallback";

export default function StudioError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("Studio route error:", error);
  }, [error]);

  return (
    <ErrorFallback
      title="Studio Unavailable"
      description="We couldn't load your studio dashboard. This might be due to a temporary server issue or a problem with your account permissions. Please try again or contact support if the problem persists."
      code="STUDIO_ERROR"
      actionLabel="Try again"
      actionHref="/studio"
    />
  );
}