"use client";

import { useEffect } from "react";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";

type FeedbackType = "success" | "error";

type StudioRouteFeedbackProps = {
  feedback?: {
    type: FeedbackType;
    message: string;
  } | null;
};

export function StudioRouteFeedback({ feedback = null }: StudioRouteFeedbackProps) {
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  useEffect(() => {
    if (!feedback) {
      return;
    }

    clearMessage();

    if (feedback.type === "success") {
      showSuccess(feedback.message);
      return;
    }

    showError(feedback.message);
  }, [clearMessage, feedback, showError, showSuccess]);

  return null;
}