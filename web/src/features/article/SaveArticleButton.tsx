"use client";

import { useEffect, useState } from "react";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/ui/icon/Icon";
import { saveArticleForUser, isArticleSavedForUser } from "@/lib/api/article_save";

type SaveArticleButtonProps = {
  userId: string;
  articleId: string;
};

export function SaveArticleButton({ userId, articleId }: SaveArticleButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSaved() {
      try {
        const saved = await isArticleSavedForUser(userId, articleId);
        if (mounted) setIsSaved(Boolean(saved));
      } catch (err) {
        console.error("isArticleSaved check failed:", err);
      }
    }

    checkSaved();

    return () => {
      mounted = false;
    };
  }, [userId, articleId]);

  async function handleSave() {
    if (isSaving || isSaved) {
      return;
    }

    try {
      setIsSaving(true);
      await saveArticleForUser(userId, articleId);
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to save article:", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isSaving || isSaved}
      className="inline-flex items-center gap-1.75 font-sans text-[12px] font-bold uppercase tracking-[1.2px] text-[#111] hover:opacity-70 transition disabled:opacity-60"
    >
      <span>{isSaved ? "Saved" : isSaving ? "Saving..." : "Save"}</span>
      <Icon icon={faBookBookmark} />
    </button>
  );
}
