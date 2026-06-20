"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { deleteArticle } from "./queries/deleteArticle";

type DeleteArticleButtonProps = {
  articleId: string;
};

export function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  async function handleDelete() {
    clearMessage();
    setPending(true);

    try {
      await deleteArticle(articleId);
      showSuccess("Article deleted successfully.");

      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't delete the article right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="cursor-pointer p-0 text-sm text-[#8d2f2f] underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
