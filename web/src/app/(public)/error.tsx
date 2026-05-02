"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ui/error_fallback/ErrorFallback";

export default function PublicError({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    useEffect(() => {
      console.error("Public route error:", error);
    }, [error]);

    return (
      <ErrorFallback
        title="Page Failed to Load"
        description="We couldn't load this page. The content might be temporarily unavailable or the page address might be incorrect. Please try again or visit our homepage."
        code="PAGE_ERROR"
        actionLabel="Go to homepage"
        actionHref="/"
      />
    );
  }

