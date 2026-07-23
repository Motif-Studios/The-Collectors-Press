"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { rejectAdminArticle } from "./queries";
import { AdminRejectionReasonModal } from "./AdminRejectionReasonModal";

type AdminRejectButtonProps = {
  articleId: string;
};

export function AdminRejectButton({ articleId }: AdminRejectButtonProps) {
  const [pending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  async function handleReject(rejectionReason: string) {
    clearMessage();
    setPending(true);

    try {
      await rejectAdminArticle(articleId, rejectionReason);
      showSuccess("Article rejected.");
      setIsModalOpen(false);
      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't reject the article right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={pending}
        className="cursor-pointer p-0 text-sm text-rose-700 underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Rejecting..." : "Reject"}
      </button>

      <AdminRejectionReasonModal
        open={isModalOpen}
        title="Reject submitted article"
        description="Explain what needs revision so the author can update and resubmit."
        confirmLabel="Reject article"
        pending={pending}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReject}
      />
    </>
  );
}
