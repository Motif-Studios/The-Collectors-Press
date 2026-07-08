"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { assignAdminArticleToPanel, removeAdminArticleFromPanel } from "./queries";
import type { AdminPanelName } from "./types";

type AdminPanelActionButtonProps = {
  panelName: AdminPanelName;
  articleId: string;
  mode: "assign" | "remove";
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
      } else {
        await removeAdminArticleFromPanel(panelName, articleId);
        showSuccess("Article removed from homepage panel.");
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
