"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import type { AdminDashboardData } from "./types";
import { updateAdminArticleStatus } from "./queries";
import { AdminRejectionReasonModal } from "./AdminRejectionReasonModal";

type ArticleStatus = AdminDashboardData["allArticles"][number]["status"];

type AdminArticleStatusControlProps = {
  articleId: string;
  currentStatus: ArticleStatus;
};

export function AdminArticleStatusControl({ articleId, currentStatus }: AdminArticleStatusControlProps) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<ArticleStatus>(currentStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();

  const options = useMemo<ArticleStatus[]>(
    () => ["draft", "submitted", "rejected", "published", "archived"],
    [],
  );

  async function handleSave() {
    if (status === "rejected") {
      setIsModalOpen(true);
      return;
    }

    clearMessage();
    setPending(true);

    try {
      await updateAdminArticleStatus(articleId, status);
      showSuccess("Article status updated.");
      window.setTimeout(() => router.refresh(), 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't update the article status right now.");
    } finally {
      setPending(false);
    }
  }

  async function handleRejectWithReason(rejectionReason: string) {
    clearMessage();
    setPending(true);
    try {
      await updateAdminArticleStatus(articleId, "rejected", rejectionReason);
      showSuccess("Article status updated.");
      setIsModalOpen(false);
      window.setTimeout(() => router.refresh(), 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't update the article status right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as ArticleStatus)}
          disabled={pending}
          className="min-w-36 rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-neutral-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSave}
          disabled={pending || status === currentStatus}
          className="cursor-pointer rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {pending ? "Saving..." : "Update"}
        </button>
      </div>

      <AdminRejectionReasonModal
        open={isModalOpen}
        title="Set article status to rejected"
        description="Add a clear reason so the author knows what to improve before resubmitting."
        confirmLabel="Save rejection"
        pending={pending}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRejectWithReason}
      />
    </>
  );
}
