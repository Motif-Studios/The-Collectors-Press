"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { assignAdminArticleToPanel, removeAdminArticleFromPanel, reorderAdminArticleInPanel } from "./queries";
import type { AdminPanelName } from "./types";

type AdminPanelActionButtonProps = {
  panelName: AdminPanelName;
  articleId: string;
  mode: "assign" | "remove" | "reorder-up" | "reorder-down";
  children: ReactNode;
};

export function AdminPanelActionButton({
  panelName,
  articleId,
  mode,
  children,
}: AdminPanelActionButtonProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  async function handleClick() {
    clearMessage();
    setPending(true);

    try {
      if (mode === "assign") {
        await assignAdminArticleToPanel(panelName, articleId);
        showSuccess("Article assigned to homepage panel.");
      } else if (mode === "remove") {
        await removeAdminArticleFromPanel(panelName, articleId);
        showSuccess("Article removed from homepage panel.");
      } else if (mode === "reorder-up") {
        await reorderAdminArticleInPanel(panelName, articleId, "up");
        showSuccess("Article moved up.");
      } else if (mode === "reorder-down") {
        await reorderAdminArticleInPanel(panelName, articleId, "down");
        showSuccess("Article moved down.");
      }

      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't update the homepage panel right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Updating..." : children}
    </button>
  );
}
