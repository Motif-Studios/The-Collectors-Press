"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { archiveAdminArticle } from "./queries";

type AdminArchiveButtonProps = {
  articleId: string;
};

export function AdminArchiveButton({ articleId }: AdminArchiveButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  async function handleArchive() {
    clearMessage();
    setPending(true);

    try {
      await archiveAdminArticle(articleId);
      showSuccess("Article archived.");
      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't archive the article right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleArchive}
      disabled={pending}
      className="cursor-pointer p-0 text-sm text-slate-700 underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Archiving..." : "Archive"}
    </button>
  );
}
