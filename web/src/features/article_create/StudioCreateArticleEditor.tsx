"use client";

import { useState } from "react";

import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";

import { StudioCreateArticleForm } from "./StudioCreateArticleForm";
import { saveArticle } from "./queries/saveArticle";
import { publishArticle } from "./queries";
import type { StudioCreateArticle } from "./types";

type Props = {
  authorName: string;
  categories: string[];
  initialArticle: StudioCreateArticle;
};

export function StudioCreateArticleEditor({
  authorName,
  categories,
  initialArticle,
}: Props) {
  const [form, setForm] = useState<StudioCreateArticle>(initialArticle);

  async function handlePreview() {
    if (!form.id) {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Could not preview. Missing article id.",
      }));
      return;
    }

    try {
      await saveArticle(form.id, form);

      setForm((current) => ({
        ...current,
        lastSavedLabel: "Just now",
      }));

      window.open(`/studio/articles/${form.id}/preview`, "_blank", "noopener,noreferrer");
    } catch {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Failed to open preview. Please try again.",
      }));
    }
  }

  async function handleSaveDraft() {
    if (!form.id) {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Could not save draft. Missing article id.",
      }));
      return;
    }

    try {
      await saveArticle(form.id, form);

      setForm((current) => ({
        ...current,
        lastSavedLabel: "Just now",
      }));
    } catch {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Failed to save article. Please try again.",
      }));
    }
  }

  async function handlePublish() {
    if (!form.id) {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Could not publish. Missing article id.",
      }));
      return;
    }

    try {
      await saveArticle(form.id, form);
      const published = await publishArticle(form.id);

      setForm((current) => ({
        ...current,
        id: published?.article_id ?? current.id,
        status: "published",
        lastSavedLabel: "Published just now",
      }));
    } catch {
      setForm((current) => ({
        ...current,
        lastSavedLabel: "Failed to publish article. Please try again.",
      }));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <StudioPageHeader
        title="Create article"
        description="Draft, preview and prepare your story for publishing."
        actions={
          <>
            <ActionButton onClick={handleSaveDraft}>Save draft</ActionButton>

            <ActionButton onClick={handlePreview}>Preview</ActionButton>

            <ActionButton variant="primary" onClick={handlePublish}>
              Publish
            </ActionButton>
          </>
        }
      />

      <StudioCreateArticleForm
        authorName={authorName}
        categories={categories}
        article={form}
        onChange={setForm}
      />
    </div>
  );
}