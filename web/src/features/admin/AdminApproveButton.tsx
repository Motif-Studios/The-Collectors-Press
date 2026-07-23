"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { approveAdminArticle } from "./queries";

type AdminApproveButtonProps = {
  articleId: string;
};

export function AdminApproveButton({ articleId }: AdminApproveButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  async function handleApprove() {
    clearMessage();
    setPending(true);

    try {
      await approveAdminArticle(articleId);
      showSuccess("Article approved and published.");
      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't approve the article right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleApprove}
      disabled={pending}
      className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Approving..." : "Approve"}
    </button>
  );
}
